import {Route, Routes} from "react-router-dom"
import { defaultAppRoutes } from "../routes"

export default function AppLayout({children}) {
  return (
    <>
     <Routes>
        {defaultAppRoutes.map((route, index)=> (
          <Route key={index} path={route.path} element={<route.element/>} />
        ))}
      </Routes> 
    </>
  )
}
