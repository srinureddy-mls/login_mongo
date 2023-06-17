import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import Data from "./ex";
import Register from "./upload";
import Edit from "./edit";
import Login from "./login";
import Sigin_Up from "./Register";
import Home from "./Home";
import View from "./view";




function App(){
  return(
    <BrowserRouter>
      <Routes>
      
       <Route path="/upload"element={<Register/>}></Route>  
       <Route path="/edit/:id" element={<Edit/>}></Route>
       <Route path="/ex" element={<Data/>}></Route>
       <Route path="/"element={<Login/>}></Route>
        <Route path="/register" element={<Sigin_Up/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/view/:id' element={<View/>}></Route>
      
       </Routes>
    </BrowserRouter>
  )
}

export default App
