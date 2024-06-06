import { getSessionCookie } from "@/utils/nextCookieConfig";
import { NextResponse } from "next/server";


export async function GET(){
    const cookiesContent=getSessionCookie();
    return NextResponse.json({"data":cookiesContent,"message":"Session cookie get",status:200});
}