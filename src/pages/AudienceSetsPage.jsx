import React, { useState, useLayoutEffect } from "react";
import AudienceSegmentModal from "../components/AudienceSegmentModal";
import axios from "axios";

const AudienceSetsPage = () => {
  const [audienceSets, setAudienceSets] = useState([]); // This would be populated with actual data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [seed, setSeed] = useState("123");
  const [userId, setUserId] = useState();
  const [activeModalIndex, setActiveModalIndex] = useState(null); 
  // Handle adding a new audience set
  const handleAddAudienceSet = (newAudienceSet) => {
    setSeed(Math.random());
  };

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const email = user.email;
    // setUserId(id);
    console.log(email);
    getAudienceSet(email);
  }, [seed]);

  async function getAudienceSet(email) {
    console.log(email)
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

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <div className="bg-mint-green p-4 text-center text-white">
        <h1 className="text-3xl font-semibold text-deep-teal">Audience Sets</h1>
      </div>

      {/* Add New Audience Set Button */}
      <div className="text-center my-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-mint-green text-black px-6 py-3 rounded-md hover:bg-light-sky-blue transition"
        >
          Add New Audience Set
        </button>
      </div>

      {/* Audience Sets Cards */}
      <div className="max-w-6xl mx-auto px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {audienceSets.length === 0 ? (
          <p className="text-center text-gray-500">
            No audience sets added yet.
          </p>
        ) : (
          audienceSets.map((audience, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-deep-teal mb-2">
                {audience.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {audience.description}
              </p>
              <button
                onClick={() => {
                    setActiveModalIndex(index)
                //   alert(`Viewing details for ${audience.name}`);
                }}
                className="bg-light-sky-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                View Details
              </button>
              {activeModalIndex === index && ( // Check if this card's modal should be open
            <AudienceSegmentModal
              isOpen={true}
              onClose={() => setActiveModalIndex(null)} // Close modal
              audience={audience}
            />
          )}
            </div>
          ))
        )}
      </div>

      {/* Modal to Add Audience Set */}
      <AudienceSegmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          handleAddAudienceSet();
        }}
        // onSubmit={handleAddAudienceSet}
      />
    </div>
  );
};

export default AudienceSetsPage;
