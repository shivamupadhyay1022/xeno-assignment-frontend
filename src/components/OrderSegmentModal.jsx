import React, { useLayoutEffect, useState } from "react";
import axios from "axios";

function OrderSegmentModal({ showModal, onClose, order }) {
  const [name, setName] = useState();
  const [userId, setUserId] = useState();
  const [audienceSets, setAudienceSets] = useState([]);
  const [audienceId, setAudienceId] = useState();
  const [audienceData, setAudienceData] = useState();
  const [budget, setBudget] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [seed, setSeed] = useState("123");

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const email = user.email;
    setUserId(user.id);
    getAudienceSet(email);
  }, [seed]);

  async function getAudienceSet(email) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/audiences/${email}`
      );
      console.log("Audiences fetched successfully:", response.data);
      setAudienceSets(response.data); // Audience data
    } catch (error) {
      console.error(
        "Error fetching audiences:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  const handleCreateCampaign = async (event) => {
    try {
      const campaign = {
        name: name,
        audienceId: audienceId,
        budget: budget,
        startDate: startDate,
        endDate: endDate,
      };
      console.log(campaign);
      const response = await axios.post("http://localhost:5000/api/campaigns", {
        userId: userId,
        campaign: campaign,
      });
      //   setSuccessMessage("Campaign created successfully!");
      console.log("Campaign created:", response.data);
    } catch (err) {
      //   setError(err.response?.data?.message || "Error creating campaign.");
      console.error("Error creating campaign:", err);
    }
    onClose();
  };

  const handleAudienceChange = async (event) => {
    console.log(event.target.value);
    console.log(userId);
    setAudienceId(event.target.value);

    // try {
    //     // setError(""); // Clear previous errors
    //     const response = await axios.get("http://localhost:5000/api/audiences-id", {
    //       params: { userId:userId, audienceId:event.target.value }, // Use params for GET requests
    //     });
    //     setAudienceData(response.data.audienceSet); // Update state with the fetched data
    //     console.log("Audience fetched:", response.data);
    //   } catch (err) {
    //     // setError(err.response?.data?.message || "Error fetching audience");
    //     console.log("Error fetching audience:", err);
    //   }
  }; // Update audience state with the selected value


  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => onClose()}
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold text-deep-teal mb-4">
              Add New Order
            </h2>

            {/* New Order Form - Facebook Style */}
            <form>
              {/* Campaign Name */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={order ? order.name : name}
                  placeholder="Enter campaign name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-sky-blue"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Audience */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Audience
                </label>
                {order && <div>{order.audienceId}</div>}
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-sky-blue"
                  onChange={handleAudienceChange}
                >
                  <option>Select Audience Set</option>
                  {audienceSets.length === 0 ? (
                    <p className="text-center text-gray-500">
                      No audience sets added yet.
                    </p>
                  ) : (
                    audienceSets.map((audience, index) => (
                      <option key={index} value={audience._id}>
                        {audience.name}
                      </option>
                    ))
                  )}
                </select>
                {/* <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-sky-blue">
                  <option>Select Audience</option>
                  <option>Existing Customers</option>
                  <option>New Leads</option>
                </select> */}
              </div>

              {/* Budget */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Budget (in USD)
                </label>
                <input
                  type="number"
                  placeholder="Enter budget"
                  value={order ? order.budget : budget}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-sky-blue"
                  onChange={(e) => {
                    setBudget(e.target.value);
                  }}
                />
              </div>

              {/* Date Range */}
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Start Date
                  </label>
                  {order && <p>{order?.startDate}</p>}
                  <input
                    type="date"
                    value={order ? order.startDate : startDate}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-sky-blue"
                    onChange={(e) => {
                      setStartDate(e.target.value);
                    }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    End Date
                  </label>
                  {order && <p>{order?.endDate}</p>}
                  <input
                    type="date"
                    value={endDate}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-sky-blue"
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="mr-4 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-mint-green text-black px-4 py-2 rounded-lg hover:bg-light-sky-blue transition"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCreateCampaign(e);
                  }}
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSegmentModal;
