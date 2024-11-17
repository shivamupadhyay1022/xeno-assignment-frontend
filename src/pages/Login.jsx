import React, { useState } from "react";
import { useRoute } from "../context/RouteContext";
import { GoogleLogin } from "react-google-login";
import Link from "../context/Link";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { navigate } = useRoute();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Login successful
        console.log('Login successful:', data.message); 
        localStorage.setItem('user', JSON.stringify(data.user));// Store user session data
        // Navigate to the next page or perform further actions
        navigate("/dashboard");
      } else {
        // Login failed
        console.error('Login failed:', data.message);
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  // const GoogleLoginButton = () => {
  //   const handleSuccess = async (response) => {
  //     console.log("Google Login Success:", response);
  
  //     const { tokenId } = response;
  
  //     try {
  //       // Send token to the backend for verification
  //       const res = await fetch("http://localhost:5000/api/auth/google", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ token: tokenId }),
  //       });
  
  //       if (res.ok) {
  //         const data = await res.json();
  //         // Save userId and email to local storage
  //         localStorage.setItem("user", data.user.id, data.user.email);
  
  //         alert("Login successful");
  //       } else {
  //         alert("Login failed");
  //       }
  //     } catch (error) {
  //       console.error("Error during login:", error);
  //     }
  //   };
  
  //   const handleFailure = (response) => {
  //     console.error("Google Login Failed:", response);
  //     alert("Google Login Failed. Please try again.");
  //   };
  // }

  const handleSuccess = async (response) => {
    console.log("Google Login Success:", response);

    const { tokenId } = response;

    try {
      // Send token to the backend for verification
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenId }),
      });

      const data = await res.json();

      if (res.ok) {
        // const data = await res.json();
        // Save userId and email to local storage
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleFailure = (response) => {
    console.error("Google Login Failed:", response);
    // alert("Google Login Failed. Please try again.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-gray">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-deep-teal mb-6">
          Welcome Back
        </h2>

        {/* Email Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
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
            Log In
          </button>
        </form>
{/* 
        <button
            className="w-full my-2 bg-mint-green text-black py-3 rounded-lg font-semibold hover:bg-light-sky-blue transition"
            type="submit"
            onClick={GoogleLoginButton}
          >
            Sign in With Google
          </button> */}

          <GoogleLogin
        clientId="913341075053-co9s1p7ti482seh6p886dg6imucj1f7m.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
        scope="profile email"
        isSignedIn={true}
      />

        {/* Additional Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
          <Link to={"/signup"}>
          <a  className="hover:underline">
            Sign Up
          </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
