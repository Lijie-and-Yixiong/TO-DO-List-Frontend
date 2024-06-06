import { NextResponse,NextRequest } from "next/server";
import { firebaseConfig ,auth} from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

export async function POST(req:NextRequest){
    initializeApp(firebaseConfig);
    const data=await req.json();
    console.log("Post received");
    console.log(JSON.stringify(data));
    try{
        const backendResponse=await createUserWithEmailAndPassword(auth,data.email,data.password);
        console.log(backendResponse.user.uid);
    }catch(err:any){
        console.log(err.message);
        return NextResponse.json({"message":"signup failed",status:500});
    }
    //TODO create a user doc in users collection in firebase to match each todos
    return NextResponse.json({"message":"signup success",status:200});
}

