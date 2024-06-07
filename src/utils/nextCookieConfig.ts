import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { EXPIRES_IN_SECONDS, SECRET_KEY } from "./types";
import jwt from 'jsonwebtoken';

export const setSessionCookieWithResponse = (token: string,response:NextResponse):NextResponse => {
  if(token!=undefined){
    const expireTime=new Date(new Date().getTime()+EXPIRES_IN_SECONDS*1000);
    response.cookies.set('session',token,{httpOnly:true,expires:expireTime});
    return response;
  }
  return response;
};

export const getSessionCookie = (): string | undefined => {
    const session=cookies().get('session')?.value;
    if(!session)
        return undefined;
    return session.toString();
};

export const getCookiePayload=()=>{
    const session=getSessionCookie();
    if(session!=undefined){
      return jwt.verify(session,SECRET_KEY)
    }
    return undefined;
}

export const clearSessionCookie = (cookieName:string) => {
    cookies().delete(cookieName);
};