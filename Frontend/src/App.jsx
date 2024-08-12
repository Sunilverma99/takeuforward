import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Card from './pages/Card';
import About from './pages/About';
import Contact from './pages/Contact';
import Create_FlashCards from './pages/Create_FlashCards';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import Update_FlashCards from './Update_FlashCards';
function App() {
  return (
    <BrowserRouter>
    <Navbar/> 
    <Routes>
       <Route  path="/" element={<Home/>}/>
       <Route  path="/sign-in" element={<SignIn/>}/>
       <Route  path="/sign-up" element={<SignUp/>}/>
       <Route path="/question/:id" element={<Card />} />
       <Route  path="/about" element={<About/>}/>
        <Route  path="/contact" element={<Contact/>}/>
       <Route  element={<OnlyAdminPrivateRoute/>}>
       <Route  path="/create-flashCards" element={<Create_FlashCards/>}/>
       <Route path ="/question/update/:id" element={<Update_FlashCards/>}/>
       </Route>
    </Routes>
    {/* <FooterCom/> */}
    <Toaster/>
    </BrowserRouter>
  );
}

export default App;
