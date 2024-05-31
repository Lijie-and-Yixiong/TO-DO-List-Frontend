'use client';

import Navbar from "@/components/navbar";
import SignupForm from "@/components/signupForm";
import { FormEvent, useState } from "react";
import { UserLoginInfo } from "../../api/login/route";

export default function Signup(){
    const [email,setEmail]=useState<string>('');
    const [userName,setUserName]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [confirmedPassword, setConfirmedPassword]=useState<string>('');
    const [signupRes,setSignupRes]=useState<string>('');
    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const data:UserLoginInfo={
            email:email,
            userName:userName,
            password:password
        }
        //TODO check the user is exist or not
        try{
            const response=await fetch('/api/signup',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data)
            });
            const responseData=await response.json();
            setSignupRes(responseData.message);
            //setup message recived from server to check success or not

        }catch(error){
            console.log(error);
        }
            
        

        //TODO redirect to dashboard
    }

    return (
        <div className="min-h-screen flex flex-col bg-orange-200"> 
            <Navbar/>
            <div className="flex flex-grow justify-center items-center">
                <div className="w-1/3 bg-gray-100 p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl mb-6 text-center">Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <SignupForm 
                            email={email} userName={userName} password={password} confirmedPassword={confirmedPassword}
                            setEmail={setEmail} setUserName={setUserName} setPassword={setPassword} setConfirmedPassword={setConfirmedPassword}/>
                        <div className="flex justify-evenly my-2">
                            <button className="btn btn-active btn-ghost hover:bg-slate-500 hover:text-stone-300">Sign up</button>
                            <button className="btn btn-active btn-ghost hover:bg-slate-500 text-center">Need help?</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}