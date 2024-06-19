'use client'
import { UserBasicInfo } from "@/utils/types";
import { FormEvent, useState } from "react";


export default function CreateUserCard(){
    const [userName,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data:UserBasicInfo={
            "email":email,
            "userName":userName,
            "password":password
        }
        const response=await fetch('/api/signup',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
        })
        //TODO check server response
    }

    return(
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
            <h2> Create user</h2>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">User name</span>
                </label>
                <input type="text" placeholder="User name" 
                    value={userName} onChange={(e)=>setUserName(e.target.value)}  className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email"
                value={email} onChange={(e)=>setEmail(e.target.value)} 
                className="input input-bordered" required />
            </div>
            <div className="form-control">
            <label className="label">
                <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="password"
            value={password} onChange={(e)=>setPassword(e.target.value)} 
            className="input input-bordered" required />
            <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                {/* TODO setup the link to recover password */}
            </label>
            </div>
            <div className="form-control mt-6">
            <button className="btn btn-primary">Create!</button>
            </div>
        </form>
        </div>
    )
}

