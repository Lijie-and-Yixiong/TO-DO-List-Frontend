'use client';
import Navbar from "@/components/navbar";
import TodoCard from "@/components/todoCard";

import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { TodoItem } from "@/app/api/todolists/route";
import AddTodoModal from "@/components/dashboardCompo/addTodoModal";

export default function Dashboard({params}:any){
    useEffect(()=>{
        //TODO check login session
        
    },[])
    //TODO Logout button
    const router=useRouter();
    // router.push('/main');
    const [todoItems,setTodoItems]=useState<TodoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isShowing,setIsShowing] =useState(true);
    useEffect(()=>{
        const fetchData = async () => {
                try {
                const fetchedData = await fetch('/api/todolists')
                    .then(response=>response.json());
                setTodoItems(fetchedData.data);
                setIsLoading(false);
                } catch (error) {
                console.error('Error fetching data:', error);
                }
            };
            fetchData(); 
    },[])

    function handleAddTodo(): void {
        if (document) {
            (document.getElementById('my_modal_4') as HTMLFormElement).showModal();
        }
        // TODO POST card data
    }

    function handleClick() {
        setIsShowing((prev:boolean)=>!prev);
    }

    return(
        <div className="">
            <Navbar/>
            <h1>{params.id}</h1>
            <div className="bg-primary text-primary-content flex ">
                <button className="btn btn-ghost text-xl" onClick={handleClick}>Todo List </button>
                {isShowing?(<p>-</p>):(<p>+</p>)}
            </div>
            {isShowing&&
            (<div className="flex flex-wrap gap-4 justify-items-start mx-10 mb-5 mt-3">
                {isLoading?(<h1>Loading...</h1>):(
                    <>
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
                        <AddTodoModal/>
                    </>
                )}
            </div>)}


            <div className="bg-primary text-primary-content my-2">
                <button className="btn btn-ghost text-xl"> Completed </button>
            </div>
            {/* TODO add compleeted card, and mark as different color */}

        </div>
    )
}