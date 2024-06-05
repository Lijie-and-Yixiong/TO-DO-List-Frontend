import { NextResponse,NextRequest } from "next/server";
import jwt, { Secret } from 'jsonwebtoken';
import { addTodoItem } from "@/utils/firebaseConfig";

export type TodoItem={
    title:string;
    subTitle:string|null;
    content:string;
    date:string;
}

interface CookiePayload{
    uid: string,
    username: string,
    iat: number
}

const SECRET_KEY = process.env.TOKEN_SECRET_KEY as string;

export async function GET(){
    const response:TodoItem[]=[
        // {title:"first" ,subTitle:"first subTitle" ,content:"first content" ,date:'1990-05-15T00:00:00Z' },
        // {title:"first" ,subTitle:"first subTitle" ,content:"first content" ,date:'1990-05-15T00:00:00Z' },

    ]
    return NextResponse.json({"data":response,"message":"todolist retrieved",status:200});
} 


export async function POST(req:NextRequest){
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
    }catch(err){
        console.log("Api Err Add todo "+ err);
    }



    // fetch('http://localhost:8080/api/v1/student',{
    //     method:'POST',
    //     headers:{
    //         'Content-Type':'application/json',
    //     },
    //     body:JSON.stringify(data),
    // }).catch(error=>console.log(error));
    return NextResponse.json({"message":"Student added",status:200});
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