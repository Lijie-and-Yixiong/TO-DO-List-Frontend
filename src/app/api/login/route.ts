import { NextResponse,NextRequest } from "next/server";
import { auth } from "@/utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import jwt from 'jsonwebtoken';
import { getUserDocWithUid } from '@/utils/firebaseConfig';
import { SECRET_KEY } from "@/utils/types";
import { setSessionCookieWithResponse } from "@/utils/cookieConfig";

export async function POST(req:NextRequest){
    const data=await req.json();
    console.log(JSON.stringify(data));
    let accessToken:string="";
    try{
        const fireBaseRes=await signInWithEmailAndPassword(auth,data.email,data.password);
        const userCred:any=fireBaseRes.user
        accessToken=userCred.toJSON().stsTokenManager.accessToken;
        let response:NextResponse=NextResponse.json({"message":"Login success"
                                        ,status:200});

        const userName= await getUserDocWithUid(userCred.uid);
        const token=await jwt.sign({uid:userCred.uid,
                                    userName:userName
        },SECRET_KEY);
        return setSessionCookieWithResponse(token,response);
    }catch(err:any){
        console.log(err.message);
        return NextResponse.json({"message":"Login failed",status:400});
    }
}

