import { NextResponse,NextRequest } from 'next/server';
import {  jwtVerify } from 'jose';

interface Payload{
    uid:string,
    // username:string,
}

const secret = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);
export async function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname;
    const isPublicPath=path==='/login'||path==='/signup'||path==='/main';
    const sessionToken= request.cookies.get('session')?.value||'';
    let currUser:string="";
    try{
        const payload=(await jwtVerify(sessionToken,secret)).payload;
        currUser=payload.username as string;
    }catch(err){
        console.log("jwt verify err "+err);
    }
    if(path.startsWith('/dashboard')){
        const userNameInPath=path.split('/')[1];
    }
    if(isPublicPath&&sessionToken){
        return NextResponse.redirect(new URL(`/dashboard/${currUser}`,request.nextUrl));
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