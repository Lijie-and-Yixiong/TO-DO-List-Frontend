import Cookies from 'js-cookie';


const EXPIRES_IN_SECONDS:number=10;
export const setSessionCookie = (token: string) => {
  console.log(token);
  if(token!=undefined){
    const expireTime=new Date(new Date().getTime()+10*1000);
    console.log(expireTime.toTimeString());
    Cookies.set('sessionToken', token, { expires:expireTime}); 
  }
  return;
};

export const getSessionCookie = (): string | undefined => {
  return Cookies.get('sessionToken');
};

export const clearSessionCookie = () => {
  Cookies.remove('sessionToken');
};