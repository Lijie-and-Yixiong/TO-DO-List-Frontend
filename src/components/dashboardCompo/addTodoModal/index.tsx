
export default function AddTodoModal(){
    return(
        <div>
            <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl h-5/6">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Click the button below to close</p>
                        <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Username" required />
                            </label>
                            <button className="btn">Close</button>
                        </form>
                        </div>
                    </div>
            </dialog>
        </div>
    )

}