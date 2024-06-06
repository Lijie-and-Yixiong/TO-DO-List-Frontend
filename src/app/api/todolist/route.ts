import { NextResponse,NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { addTodoItem, getTodoDocsWithUserId, getUserDocWithUid } from "@/utils/firebaseConfig";
import { getCookiePayload, getSessionCookie } from "@/utils/nextCookieConfig";
import { CookiePayload } from "@/utils/modal";



const SECRET_KEY = process.env.TOKEN_SECRET_KEY as string;

export async function GET(){
    //TODO get user id from session;
    const cookiePayload=getCookiePayload() as CookiePayload;
    if(cookiePayload==undefined){
        return NextResponse.json({"message":"No session cookie founded",status:401})
    }
    const userId=cookiePayload.uid;
    const response=await getTodoDocsWithUserId(userId);
    console.log(response);
    return NextResponse.json({"data":response,"message":"todolist retrieved",status:200});
} 


export async function POST(req:NextRequest){ //add new todo
    const receivedData=await req.json();
    console.log("Post received");
    console.log(JSON.stringify(receivedData));
    const sessionToken= req.cookies.get('session')?.value||'';
    try{
        const payload=jwt.verify(sessionToken,SECRET_KEY) as jwt.JwtPayload;
        const data={
            ...receivedData,
            user_id:payload.uid,
        }
        console.log(data);
        addTodoItem(data);
        return NextResponse.json({"message":"Success to add todo",status:200});
    }catch(err){
        console.log("Api Err Add todo "+ err);
        return NextResponse.json({"message":"Fail to add todo",status:500});
    }
}

export async function PUT(req:NextRequest){
    const data=await req.json();
    fetch('http://localhost:8080/api/v1/student',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    }).catch(error=>console.log(error));

    return NextResponse.json({"message":"Student updated",status:200});
}

export async function DELETE(req:NextRequest){
    const data=await req.json();
    fetch('http://localhost:8080/api/v1/student',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    }).catch(error=>console.log(error));

    return NextResponse.json({"message":"Student deleted",status:200});
}