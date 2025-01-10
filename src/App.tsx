import './App.css'

import React from "react";
import ReactDOM from "react-dom/client";
import {ToastContainer} from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import Home from './component/Home';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
     <ToastContainer />
     </>
  );
}

export default App
