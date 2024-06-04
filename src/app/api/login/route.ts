import { NextResponse,NextRequest } from "next/server";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import jwt, {Secret} from 'jsonwebtoken';
import { getDocWithUid } from '@/utils/firebaseConfig';

const EXPIRES_IN_SECONDS:number=10;
const SECRET_KEY:Secret = process.env.TOKEN_SECRET_KEY as string;
export async function POST(req:NextRequest){
    const data=await req.json();
    console.log(JSON.stringify(data));
    let accessToken:string="";
    try{
        const backendRes=await signInWithEmailAndPassword(auth,data.email,data.password);
        const userCred:any=backendRes.user
        accessToken=userCred.toJSON().stsTokenManager.accessToken;
        
        const response=NextResponse.json({"message":"Login success"
                                        ,status:200});

        const userName= await getDocWithUid(userCred.uid);
        const token=await jwt.sign({uid:userCred.uid,
                                    username:userName
        },SECRET_KEY);
        const expireTime=new Date(new Date().getTime()+EXPIRES_IN_SECONDS*1000); //create expire date time
        response.cookies.set("session",token,{httpOnly:true,expires:expireTime}); //set cookie with jwt token
        return response;
    }catch(err:any){
        console.log(err.message);
        return NextResponse.json({"message":"login failed"});
    }
}

