import React, { useState } from "react";
import axios from "axios";
import api from "../api";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", formData);
      if (response.data?.user === "Email already exist") {
        
        toast.error("Email already exist, try with different email.", {
          position: "top-right",
        });
        setIsError(true);
      } else {
        toast.success("Registration successful! Please log in.", {
          position: "top-right",
        });
        setIsError(false);
        setFormData({ username: "", email: "", password: "" }); 
        navigate("/login")
        
      }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setMessage(
            error.response?.data?.user || "Registration failed. Please try again."
          );
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      }
  };

  return (
    <>
    <ToastContainer
    
    />
    {message && <p className={`text-green-400 ${isError ? "bg-red-100 text-red-700": "bg-green-100 text-green-700"}`}>{message}</p>}
    <div className="flex items-center justify-center min-h-screen bg-purple-400">
        
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg bg-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
      <form className="space-y-4 mt-4" onSubmit={handleRegister}>
      <p className="text-left">Username</p>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-left">Email</p>
          <input
            type="email"
            name="email"
          
            value={formData.email}
            onChange={handleChange}
            required
             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
     
          <p className="text-left">Password</p>
          <input
            type="password"
            name="password"
         
            value={formData.password}
            onChange={handleChange}
            required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
       
        <button 
        type="submit"
         className="w-full px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
        >Register
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
    </>
  );
};

export default Register;
