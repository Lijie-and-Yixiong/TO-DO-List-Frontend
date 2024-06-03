import { NextResponse,NextRequest } from 'next/server';
import jwt, {Secret} from 'jsonwebtoken';
import {  jwtVerify, importJWK } from 'jose';

interface Payload{
    uid:string,
    // username:string,
}

const secret = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);
export async function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname;
    const isPublicPath=path==='/login'||path==='/signup'||path==='/main';
    const sessionToken= request.cookies.get('session')?.value||'';
    if(isPublicPath&&sessionToken){
        const payload=(await jwtVerify(sessionToken,secret)).payload;
        console.log(payload.uid);
        return NextResponse.redirect(new URL('/dashboard/tmpDashboard',request.nextUrl));
    }
    if(!isPublicPath&&!sessionToken){
        return NextResponse.redirect(new URL('/main',request.nextUrl));
    }

}

export const config = {
    matcher:[ 
        '/login',
        '/signup',
        '/dashboard',
        '/main'
    ]
}