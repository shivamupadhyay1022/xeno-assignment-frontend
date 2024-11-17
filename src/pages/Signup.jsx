import React, { useState } from 'react'
import axios from "axios";

function Signup() {
  const [name, setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const api = axios.create({
    baseURL: "http://localhost:5000", // Backend server URL
  });

  const registerUser = async (userData) => {
    try {
      const response = await api.post("/api/users/register", userData);
      console.log("User registered:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error.message);
      throw error;
    }
  };

  const handleRegister = async () => {
    const userData = {
      name: name, // Replace with actual input values
      email: email,
      password: password,
    };
  console.log("inside")
    try {
      const result = await registerUser(userData);
      console.log("Registration successful:", result);
      alert("User registered successfully!");
    } catch (error) {
      alert("Failed to register user. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-gray">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-deep-teal mb-6">
          Welcome to Xeno CRM
        </h2>

        {/* Email Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister(e);
          }}
        >
          {/* name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-light-sky-blue"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-light-sky-blue"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-light-sky-blue"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-mint-green text-black py-3 rounded-lg font-semibold hover:bg-light-sky-blue transition"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <button
            className="w-full bg-mint-green my-2 text-black py-3 rounded-lg font-semibold hover:bg-light-sky-blue transition"
            type="submit"
            onClick={()=>{window.open("http://localhost:5000/auth/google", "_blank");}}
          >
            Sign In With Google
          </button>

        {/* Additional Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-600">
        
          <a href="#" className="hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  )
}

export default Signup