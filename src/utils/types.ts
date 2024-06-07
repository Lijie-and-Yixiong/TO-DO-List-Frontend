import {Secret} from 'jsonwebtoken';
interface TodoItem{
    user_id:string,
    title:string,
    create_date:string,
    descriptions?:string,
    doc_uid?:string, //Doc uid created by firebase automatically
    due_date?:string,
}

interface UserBasicInfo{
    email:string,
    userName:string,
    password:string
    uid?:string,
}

interface CookiePayload{
    uid: string,
    username: string,
    iat: number
}

const EXPIRES_IN_SECONDS:number=parseInt(process.env.SESSION_TIME_IN_SECOND as string) ;
const SECRET_KEY:Secret = process.env.TOKEN_SECRET_KEY as string;

export {EXPIRES_IN_SECONDS,SECRET_KEY}
export type {TodoItem,UserBasicInfo,CookiePayload}