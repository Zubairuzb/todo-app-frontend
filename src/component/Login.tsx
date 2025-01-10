import React, { useState } from "react";
import {AxiosError} from "axios";
import api, { setAuthToken } from "../api";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setAuthToken(data.token);
      console.log(data)
      if(data.token){
        toast.success("Login successful!", {
          position: "top-right",
        });
      } else{
        toast.error("Login failed!", {
          position: "top-right",
        });
      }
     
      navigate("/dashboard");
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error("Login failed:", error.response?.data);
           toast.error("Login failed, please try again", {
                    position: "top-right",
                  });
        } else {
          console.error("Unexpected error:", error);
        }
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

    <form onSubmit={handleLogin} className="space-y-4 mt-4">
    <p className="text-left">Email</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-left">Password</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <button 
      type="submit" 
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">Login 
      </button>
    </form>
    <p className="mt-4 text-sm text-center text-gray-600">
    Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
