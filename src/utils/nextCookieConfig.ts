import { cookies } from "next/headers";


const EXPIRES_IN_SECONDS:number=10;
export const setSessionCookie = (token: string) => {
  console.log(token);
  if(token!=undefined){
    const expireTime=new Date(new Date().getTime()+10*1000);
    cookies().set('session',token,{expires:expireTime});
  }
  return;
};

export const getSessionCookie = (): string | undefined => {
    const session=cookies().get('session')?.value;
    if(!session)
        return undefined;
    return session.toString();

};

export const clearSessionCookie = (cookieName:string) => {
    cookies().delete(cookieName);
};