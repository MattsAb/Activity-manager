import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


const ProtectedRoutes = () => {
    const {user, isLoading} = useAuth()
    if (isLoading) return null
    console.log(user)
    return user ? <Outlet/> : <Navigate to='/signin'/>
}

export default ProtectedRoutes