import { NextResponse,NextRequest } from "next/server";

export type UserLoginInfo={
    email:string
    userName:string
    password:string
}


export async function GET(){
    const response={};
    console.log("in get request");
    return NextResponse.json({"data":response,"message":"todolist retrieved",status:200});
} 


export async function POST(req:NextRequest){
    const data=await req.json();
    console.log("Post received");
    console.log(JSON.stringify(data));
    fetch('',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    }).catch(error=>console.log(error));

    
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