import React from "react";
import { usePage } from "../context/PageContext";
import Link from "../context/Link";

function Home() {


  return (
    <div>
      {/* Hero Section */}
      <section className="bg-mint-green text-deep-teal py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Mini CRM & Campaign Management
          </h1>
          <p className="text-lg mb-8">
            A streamlined solution for managing customer data, creating audience
            segments, and launching campaigns effectively.
          </p>
          <button className="bg-deep-teal text-white font-semibold py-2 px-6 rounded-xl hover:bg-teal-800 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-64 mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-8 text-deep-teal">Login</h2>

          <div className="bg-white shadow-lg rounded-lg p-8 text-center flex flex-col justify-between h-full hover:shadow-xl transition">
            <div>
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#19747E"
                  stroke-width="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-login"
                >
                  <circle cx="12" cy="7" r="4"></circle>

                  <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-deep-teal">
                Welcome Back!
              </h3>
              <p className="text-gray-600 mb-4">
                Access the CRM and campaign management tools.
              </p>
            </div>
            
            <Link  to="/login"><button
              className="bg-mint-green text-black py-2 px-4 min-w-32 rounded-xl hover:bg-light-sky-blue transition mt-4"
            >
              Login
            </button></Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-light-sky-blue py-16">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-2xl font-semibold text-deep-teal mb-6">
            Features
          </h2>
          <p className="text-gray-700 mb-8">
            Streamline your campaigns and manage your customer relationships
            effortlessly with Xeno.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-deep-teal mb-4">
                Data Ingestion
              </h3>
              <p className="text-gray-600">
                Easily load and store customer and order data in a scalable way.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-deep-teal mb-4">
                Audience Segmentation
              </h3>
              <p className="text-gray-600">
                Create personalized audience segments to enhance campaign
                effectiveness.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-deep-teal mb-4">
                Campaign Tracking
              </h3>
              <p className="text-gray-600">
                Track campaign engagement and manage communication logs.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

export default Home;
