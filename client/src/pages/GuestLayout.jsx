import {Route, Routes} from "react-router-dom"
import { GuestRoutes } from "../routes"

export default function GuestLayout({children}) {
  return (
    <>
       <Routes>
        {GuestRoutes.map((route, index)=> (
          <Route key={index} path={route.path} element={<route.element/>} />
        ))}
      </Routes> 
    </>
  )
}
