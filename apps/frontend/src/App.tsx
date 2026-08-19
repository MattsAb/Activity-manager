import { Route, Routes } from "react-router-dom"
import MainPage from "./pages/MainPage"
import ActivityPage from "./pages/ActivityPage"
import SettingsPage from "./pages/SettingsPage"
import AuthPage from "./pages/AuthPage"
import ProtectedRoutes from "./utils/protectedRoutes"
import AppLayout from "./utils/AppLayout"
import SearchPage from "./pages/SearchPage"
import RequestPage from "./pages/RequestPage"

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<AuthPage/>}/>

      <Route element={<ProtectedRoutes/>}>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/activity/:id" element={<ActivityPage/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/requests" element={<RequestPage/>}/>
        </Route>
      </Route>
      
    </Routes>
  )
}

export default App
