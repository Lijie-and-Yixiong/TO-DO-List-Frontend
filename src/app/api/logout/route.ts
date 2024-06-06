import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";
import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie } from "@/utils/nextCookieConfig";

export async function POST(req:NextRequest){
    const data=await req.json();
    console.log(JSON.stringify(data));
    try{
        signOut(auth);
        clearSessionCookie('session');
        const response=NextResponse.json({"message":"Log out",status:200});
        return response;
    }catch(err){
        console.log(err);
        return NextResponse.json({"message":"log out failed"});
    }
}

