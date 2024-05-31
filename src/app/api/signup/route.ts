import { NextResponse,NextRequest } from "next/server";
import { UserLoginInfo } from "../login/route";

interface ApiResponse{
    message:string,
}

export async function POST(req:NextRequest){
    const data=await req.json();
    console.log("Post received");
    console.log(JSON.stringify(data));
    let responseMessage:ApiResponse={message:"Empty message"};
    try{

        const response=await fetch('http://localhost:8080/api/v1/student',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data),
        })

        //set up response message
        responseMessage.message= await response.json();

    }catch(err){
        console.log(err);
    }


    return NextResponse.json({"message":responseMessage.message,status:200});
}

