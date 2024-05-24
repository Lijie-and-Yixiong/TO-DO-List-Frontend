'use client';
import Navbar from "../components/navbar";
import TodoCard from "../components/todoCard";
import { useState,useEffect } from "react";
import { TodoItem } from "../api/todolists/route";


export default function Dashboard(){
    const [todoItems,setTodoItems]=useState<TodoItem[]>([]);
    useEffect(()=>{
        const fetchData = async () => {
                try {
                const fetchedData = await fetch('/api/todolists')
                    .then(response=>response.json());
                console.log("Data fetched");
                console.log(fetchedData.data)
                setTodoItems(fetchedData.data);
                } catch (error) {
                console.error('Error fetching data:', error);
                }
            };
            fetchData(); 
    },[])

    function handleAddTodo(): void {
        
    }

    return(
        <div className="">
            <Navbar/>
            <h1>Dashboard Page</h1>
            <div className="flex flex-wrap gap-4 justify-items-start mx-10 mb-5">
                {todoItems.map((item:TodoItem,index:number)=>
                        <TodoCard key={index} todoItem={item}/>
                )}
                <div className="flex justify-center items-center bg-slate-800 w-96">
                    <button onClick={handleAddTodo} className="hover:bg-gray-200 
                                        border-double border-4 border-stone-500 
                                        bg-gray-100 shadow-lg rounded-lg w-40 h-40">
                        +
                    </button>
                </div>

            </div>

        </div>
    )
}