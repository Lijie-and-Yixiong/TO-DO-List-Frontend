import Link from 'next/link'
import { useState } from 'react'

interface NavbarProps{
    isLogin:boolean
}
export default function Navbar({isLogin}:NavbarProps){
    const [userName,setUserName]=useState('');
    return(
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Todo Lists</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                <li><Link href="/main">Main</Link></li>
                <li>
                    <details>
                    <summary>
                        My Dashboard
                    </summary>
                    <ul className="p-2 bg-base-100 rounded-t-none">
                        <li><Link href={`/dashboard/${userName}`}>To my dashboard</Link></li> 
                        {/* TODO get username from server */}
                        <li></li>
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
        </div>
    )
}