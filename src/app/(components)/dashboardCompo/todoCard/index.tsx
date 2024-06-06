import ButtonList from "./buttonList";
import { TodoItem } from "@/app/api/todolist/route";

type TodoCardProps = {
    todoItem: TodoItem;
};
export default function TodoCard({todoItem}:TodoCardProps){

    return(
            <div className="card w-96 h-80 bg-lime-500 rounded-lg shadow-lg hover:shadow-2xl">
                <div className="bg-lime-600 text-white p-4 rounded-lg">
                <h2 className="text-xl font-bold">{todoItem.title}</h2>
                </div>
                <div className="card-body items-center text-center p-4 overflow-hidden">
                    <h2 className="card-title">{todoItem.subTitle}</h2>
                    <p>We are using cookies for no reason. We 1212are using cookies for no reasonWe are using cookies for no reasonWe are using cookies for 
                        no reasonWe are using cookies for no reasonWe are using cookies for no reasonWe are using cookies for no reason</p>
                </div>
                <ButtonList/>
        </div>
    )
}