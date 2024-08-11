import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Chat from "../pages/Chat"
import Home from "../pages/Home"

const defaultAppRoutes = [
  
    {
        path:"/",
        element:Home,
        exact:true,
    }
]

const GuestRoutes = [
    {
        path:"/login",
        element:Login,
        exact:true,
    },
    {
        path:"/register",
        element:Register,
        exact:true,
    },
    {
        path:"/chat",
        element:Chat,
        exact:true,
    },
]
const adminRoutes = [

]


export { defaultAppRoutes, adminRoutes, GuestRoutes}