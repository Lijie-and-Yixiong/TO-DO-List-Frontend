
export default function Main(){
    return(
        // hero component from daisy    
        <div className="hero min-h-screen bg-base-200"> 
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">To Do now!</h1>
            <p className="py-6">Welcome to TodoList website, the ultimate solution for staying organized and productive! With our intuitive todo list platform, managing your tasks has never been easier. 
                    Whether you are a busy professional, a student with deadlines, or simply someone looking to keep track of daily errands, our user-friendly interface and powerful features are designed to streamline your workflow and help you achieve your goals efficiently. 
                    Say goodbye to forgotten tasks and hello to productivity with TodoList website.</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
                <h2> Create user</h2>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Create!</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    )

}