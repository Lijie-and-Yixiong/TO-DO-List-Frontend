import Image from 'next/image';
import ViewTodoModal from './viewTodoModal/viewTodoModalComponent';
import { TodoCardProps } from '../todoCardComponent';
import EditTodoModal from './editTodoModal/editTodoModalComponent';
import DeleteTodoModal from './deleteTodoModal/deleteTodoModalComponent';
export default function ButtonList({todoItem}:TodoCardProps){
    function handleShowViewTodoModal(): void {
        if (document) {
            (document.getElementById('view_modal') as HTMLFormElement).showModal();
        }
    }

    function handleShowDeleteTodoModal():void{
        if (document) {
            (document.getElementById('delete_todo_modal') as HTMLFormElement).showModal();
        }
    }

    function handleShowEditTodoModal(): void {
        if (document) {
            (document.getElementById('edit_todo_modal') as HTMLFormElement).showModal();
        }
    }
    return(
        <div className="card-actions justify-end mr-5 mb-2 p-2">
        <button className="hover:bg-gray-200 p-2 rounded-full">
                <Image
                src="/add.png"
                width={20}
                height={20}
                alt="Add pic"
                />
            </button>
            <button onClick={handleShowDeleteTodoModal} className="hover:bg-gray-200 p-2 rounded-full">
                <Image
                src="/bin.png"
                width={20}
                height={20}
                alt="Bin pic"
                />
            </button>
            <button onClick={handleShowEditTodoModal} className="hover:bg-gray-200 p-2 rounded-full">
                <Image
                src="/pen.png"
                width={20}
                height={20}
                alt="Pen pic"
                />
            </button>
            <button onClick={handleShowViewTodoModal} className="hover:bg-gray-200 p-2 rounded-full">
                <Image
                src="/viewFile.png"
                width={20}
                height={20}
                alt="View pic"
                />
            </button>
            <ViewTodoModal todoItem={todoItem}/>
            <EditTodoModal todoItem={todoItem}/>
            <DeleteTodoModal todoItem={todoItem}/>
        </div>
    )
}