import Navbar from "../components/navbar"
import LoginForm from "../components/loginForm"
export default function Login(){
    return (
        <div className="min-h-screen flex flex-col bg-orange-200">
            <Navbar/>
            <div className="flex flex-grow justify-center items-center">
                <div className="w-1/3 bg-gray-100 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl mb-6 text-center">Login Page</h1>
                <LoginForm />
            </div>
            </div>
        </div>
    );
}