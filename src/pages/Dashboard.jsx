import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useRoute } from "../context/RouteContext";

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState()
  const { navigate } = useRoute();

  //     useEffect(()=>{
  //         axios.get('http://localhost:5000/api/users/check-session')  // Endpoint to check if the session exists and retrieve user data
  //       .then(response => {
  //         // setUser(response.data);
  //         console.log(response.data)
  //       })
  //       .catch(error => {
  //         console.error('Not authenticated:', error);
  //         // navigate('/login');  // Redirect to login if no session
  //       }); 
  //   }, []);

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    const id =user.id;
    setUserId(id);
    getUserById(id)
  },[]);

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/get-user/${id}`);
      console.log("User fetched successfully:", response.data);
      setUser(response.data)
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <header className="bg-mint-green p-6 shadow-md">
        <h1 className="text-3xl font-bold text-deep-teal text-center">
          Dashboard
        </h1>
        <h1 className="text-xl font-bold text-deep-teal text-center">
          {/* Welcome {user?.name} */}
        </h1>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Customers Card */}
          <div className="bg-white flex flex-col shadow-lg rounded-lg p-6 text-center items-center hover:shadow-xl transition relative">
            <h2 className="text-xl font-semibold text-deep-teal mb-4">
              Audience Sets
            </h2>
            <p className="text-gray-600 mb-6">
              Manage your customers, view their details, and update their
              information.
            </p>
            <div className="mt-auto w-full flex justify-center">
              <button className="bg-mint-green text-black px-4 py-2 w-3/4 rounded-md hover:bg-light-sky-blue transition"
              onClick={()=>navigate("/dashboard/audience")}>
                View Audiences
              </button>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white flex flex-col shadow-lg rounded-lg p-6 text-center items-center hover:shadow-xl transition relative">
            <h2 className="text-xl font-semibold text-deep-teal mb-4">
              Orders
            </h2>
            <p className="text-gray-600 mb-6">
              Track and manage all customer orders efficiently.
            </p>
            <div className="mt-auto w-full flex justify-center">
              <button className="bg-mint-green text-black px-4 py-2 w-3/4 rounded-md hover:bg-light-sky-blue transition"
               onClick={()=>navigate("/dashboard/orders")}>
                Manage Orders
              </button>
            </div>
          </div>

          {/* Campaigns Card */}
          <div className="bg-white flex flex-col shadow-lg rounded-lg p-6 text-center items-center hover:shadow-xl transition relative">
            <h2 className="text-xl font-semibold text-deep-teal mb-4">
              Campaigns
            </h2>
            <p className="text-gray-600 mb-6">
              Create and monitor marketing campaigns.
            </p>
            <div className="mt-auto w-full flex justify-center">
              <button className="bg-mint-green text-black px-4 py-2 w-3/4 rounded-md hover:bg-light-sky-blue transition">
                View Campaigns
              </button>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-white flex flex-col shadow-lg rounded-lg p-6 text-center items-center hover:shadow-xl transition relative">
            <h2 className="text-xl font-semibold text-deep-teal mb-4">
              Analytics
            </h2>
            <p className="text-gray-600 mb-6">
              Analyze customer and campaign data to drive decisions.
            </p>
            <div className="mt-auto w-full flex justify-center">
              <button className="bg-mint-green text-black px-4 py-2 w-3/4 rounded-md hover:bg-light-sky-blue transition">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
