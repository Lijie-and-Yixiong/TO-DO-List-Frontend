import { initialize } from "next/dist/server/lib/render-server";
import { firebaseConfig} from "../firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";
import { NextResponse } from "next/server";

export async function POST(){
    try{
        signOut(auth);
        //TODO clear cookie sessoin
        return NextResponse.json({"message":"log out"});
    }catch(err){
        console.log(err);
        return NextResponse.json({"message":"log out failed"});
    }
}