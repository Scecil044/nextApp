import {Routes, Route} from "react-router-dom"
import AppLayout from "./pages/AppLayout"
import GuestLayout from "./pages/GuestLayout"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<AppLayout/>}/>
        <Route path="/auth/*" element={<GuestLayout/>}/>
      </Routes>
    </>
  )
}
