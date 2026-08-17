import { useState } from "react"



function AuthPage() {

    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [showPassword, setShowPassword] = useState(false)

    return(
        <div className="w-screen h-screen flex flex-col dark:text-white  items-center justify-center bg-lighthover-1 dark:bg-darktheme-4">
            <div className="dark:bg-darktheme-3 bg-lighttheme-1 flex flex-col gap-5 items-center p-5 rounded-2xl text-xl">
                <h1 className="font-semibold text-2xl">{mode == 'login' ? 'Log In' : 'Register'}</h1>
                {    mode == "register" &&
                <div className="flex flex-col gap-2">
                    <h2> Username </h2>
                    <input 
                        className="outline-none dark:bg-darktheme-4 p-2" 
                        placeholder="username..."
                    />
                </div>
                }
                <div className="flex flex-col gap-2">
                    <h2> Email </h2>
                    <input
                        className="outline-none dark:bg-darktheme-4 p-2" 
                        placeholder="youremail@gmail.com..."
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h2> Password </h2>
                    <input 
                        className="outline-none dark:bg-darktheme-4 p-2"
                        placeholder="password..."
                        type={showPassword ? 'text' : 'password'}
                    />
                    <div className="flex gap-2 items-center">
                        <input
                            className="cursor-pointer"
                            onChange={() => setShowPassword(!showPassword)}
                            type="checkbox"
                        />
                        <p className="text-base">Show password</p>
                    </div>
                </div>
                <button 
                    className="text-blue-400 hover:text-blue-300 cursor-pointer text-base self-start"
                    onClick={() => setMode(mode == 'login' ? 'register' : 'login')}
                >
                    {mode == 'login' ? "Don't have an account? Register" : 'Already have an account? Log in'}
                </button>

                <button className="bg-app-1 w-full py-1 rounded-xl cursor-pointer hover:bg-apphover-1">
                    {mode == 'login' ? 'Log in' : 'Register'}
                </button>
            </div>
        </div>
    )
}

export default AuthPage