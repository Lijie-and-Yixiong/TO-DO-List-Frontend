'use client';

import Navbar from "@/components/navbar";
import LoginForm from "@/components/loginForm";
import { FormEvent, useState } from "react";
import { UserLoginInfo } from "../../api/login/route";

export default function Login(){
    const [email,setEmail]=useState<string>('');
    const [userName,setUserName]=useState<string>('');
    const [password,setPassword]=useState<string>('');


    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const data:UserLoginInfo={
            email:email,
            userName:userName,
            password:password
        }
        const response=await fetch('/api/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        }).catch((e)=>console.log(e));
        setEmail('');
        setUserName('');
        setPassword('');
    }

    return (
        <div className="min-h-screen flex flex-col bg-orange-200">
            <Navbar/>
            <div className="flex flex-grow justify-center items-center">
                <div className="w-1/3 bg-gray-100 p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl mb-6 text-center">Login Page</h1>
                    <form onSubmit={handleSubmit}>
                        
                        <LoginForm 
                            email={email} userName={userName} password={password}
                            setEmail={setEmail} setUserName={setUserName} setPassword={setPassword}/>
                        <div className="flex justify-evenly my-2">
                            <button className="btn btn-active btn-ghost hover:bg-slate-500 hover:text-stone-300">Login</button>
                            <button className="btn btn-active btn-ghost hover:bg-slate-500 text-center">Need help?</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}