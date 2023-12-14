import React from "react";
import { Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Donorhomepage from "./components/Donorhomepage";
import Charityhomepage from "./components/Charityhomepage";
import Aboutus from "./components/Aboutus";
import Vision from "./components/Vision";
import News from "./components/News";
import Charitydetails from "./components/Charitydetails"
import Admin from "./components/Admin";
import Adminlogin from "./components/Adminlogin"
import Gallery from "./components/Gallery"

function App() {
  return (
    <>
      {/* <Navbar/> */}
      <Routes>
        <Route exact path="/" element={<Donorhomepage />} />
        <Route exact path="/charityh" element={<Charityhomepage />} />
        <Route path="/donorh/:id" element={<Charitydetails />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/news" element={<News />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;
