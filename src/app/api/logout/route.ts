import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";
import { NextRequest, NextResponse } from "next/server";
import { deleteCookie } from "@/utils/cookieConfig";

export async function POST(req:NextRequest){
    const data=await req.json();
    console.log(JSON.stringify(data));
    try{
        signOut(auth);
        deleteCookie('session');
        const response=NextResponse.json({"message":"Log out",status:200});
        return response;
    }catch(err){
        console.log(err);
        return NextResponse.json({"message":"log out failed"});
    }
}

