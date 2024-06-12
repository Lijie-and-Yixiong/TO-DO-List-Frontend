'use client';
import Navbar from "@/app/(components)/navbar";
import { useRouter } from "next/navigation";
import { useState,useEffect, useRef } from "react";

import { TodoItem } from "@/utils/types";
import TodoCard from "@/app/(components)/dashboardCompo/todoCard/todoCardComponent";
import AddTodoModal from "@/app/(components)/dashboardCompo/addTodoModal/addTodoModalComponent";

export default function Dashboard({params}:any){
    //TODO Logout button
    const router=useRouter();
    const isLogin=useRef(false);
    const [todoItems,setTodoItems]=useState<TodoItem[]>([]);
    const [completedItems,setCompletedItems]=useState<TodoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isShowing,setIsShowing] =useState(true);
    useEffect(()=>{
        const fetchData = async () => {
                try {
                    const fetchedData = await fetch('/api/todolist')
                        .then(response=>response.json());
                    if(fetchedData.status!="200"){
                        //login failed or session expired
                        //TODO show error page
                    }
                    else{
                        setTodoItems(fetchedData.data);
                        isLogin.current=true;
                    }
                    setIsLoading(false);
                } catch (error) {
                console.error('Error fetching data:', error);
                }
            };
            fetchData(); 
            if(!isLogin.current)
                router.push('/main');
    },[router])

    function handleShowAddTodoModal(): void {
        if (document) {
            (document.getElementById('add_todo_modal') as HTMLFormElement).showModal();
        }
    }

    function handleTodoFolding() {
        setIsShowing((prev:boolean)=>!prev);
    }

    return(
        <div className="">
            <Navbar/>
            <h1>{params.id}</h1>
            <div className="bg-primary text-primary-content flex "> 
                <button className="btn btn-ghost text-xl" onClick={handleTodoFolding}>Todo List </button>
                {isShowing?(<p>-</p>):(<p>+</p>)}
            </div>
            {isShowing&& //Folding todo cards 
            (<div className="flex flex-wrap gap-4 justify-items-start mx-10 mb-5 mt-3">
                {isLoading?(<h1>Loading...</h1>):(
                    <>
                        {todoItems.map((item:TodoItem,index:number)=>
                            <TodoCard key={index} todoItem={item}/>
                        )}
                        <div className="flex justify-center items-center bg-slate-800 w-96">
                            <button onClick={handleShowAddTodoModal} className="hover:bg-gray-200 
                                                border-double border-4 border-stone-500 
                                                bg-gray-100 shadow-lg rounded-lg w-40 h-40">
                                +
                            </button>
                        </div>
                        <AddTodoModal/>
                    </>
                )}
            </div>)}





            <div className="bg-primary text-primary-content my-2">
                <button className="btn btn-ghost text-xl"> Completed </button>
            </div>
            {/* TODO add completed card, and mark as different color */}
        </div>
    )
}