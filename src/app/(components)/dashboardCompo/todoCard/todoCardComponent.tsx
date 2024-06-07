import { useState } from "react";
import ButtonList from "./buttonList/btnListComponent";
import { TodoItem } from "@/utils/types";
export interface TodoCardProps {
    todoItem: TodoItem
};
export default function TodoCard({todoItem}:TodoCardProps){
    const [isMouseDown,setIsMouseDown] = useState(false);
    function handleCardClick(): void {
        console.log("Card Clicked");
    }

    function handleButtonClick(event: any): void {
        event.stopPropagation();
    }

    return(
            <div  className="card w-96 h-80 rounded-lg shadow-lg hover:shadow-2xl
                bg-lime-400 active:bg-lime-600">
                <div onClick={handleCardClick}>
                    <div className="bg-lime-600 text-white p-4 rounded-lg">
                    <h2 className="text-xl font-bold truncate">{todoItem.title}</h2>
                    {/* TODO add tooltips for title */}
                    </div>
                    <div className="card-body items-center text-left p-4 overflow">
                        <p className="max-h-44 min-h-44 overflow-y-scroll text-ellipsis">We are using cookies for no reason. We 1212are using cookies for no reasonWe are using cookies for no reasonWe are using cookies for 
                        no reasonWe are using cookies for no reasonWe are using cookies for no reasonWe are using cookies for no reason
                            no reasonWe are using cookies for no reasonWe are using cookies for no reasonWe are using cookies for no reason</p>
                    </div>
                </div>
                <ButtonList  todoItem={todoItem}/>
            </div>
    )
}