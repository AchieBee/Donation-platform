import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Sighnup";
import Donorhomepage from "./components/Donorhomepage";
import Charityhomepage from "./components/Charityhomepage";
import Aboutus from "./components/Aboutus";
import Vision from "./components/Vision";
import News from "./components/News";
import Charitydetails from "./components/Charitydetails"

function App() {
  return (
    <>
      {/* <Navbar/> */}
      <Routes>
        <Route exact path="/donorh" element={<Donorhomepage />} />
        <Route exact path="/charityh" element={<Charityhomepage />} />
        <Route path="/donorh/:id" element={<Charitydetails />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
}

export default App;
