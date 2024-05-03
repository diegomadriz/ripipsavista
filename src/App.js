import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {ARpage} from "./menuAR";
import {useState} from "react";
import "./style.css"




function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/menuAR" element={<ARpage />} />
        </Routes>
      </Router>

  );
}

export default App;
