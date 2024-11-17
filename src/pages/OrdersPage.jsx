import React, { useState, useLayoutEffect } from "react";
import OrderSegmentModal from "../components/OrderSegmentModal";
import axios from "axios";

const OrdersPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [seed, setSeed] = useState("123");
  const [userId, setUserId] = useState();
  const [orderSets, setOrderSets] = useState([]);
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [orders, setOrders] = useState([
    // Sample order data
    {
      id: 1,
      customerName: "John Doe",
      orderDetails: "3 items - Electronics",
      orderDate: "2024-11-12",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      orderDetails: "2 items - Clothing",
      orderDate: "2024-11-11",
    },
  ]);

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const email = user.email;
    setUserId(user.id);
    console.log(email);
    getOrdersSet(email);
  }, [seed]);

  async function getOrdersSet(email) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/campaigns/${email}`
      );
      console.log("Orders/Campaigns fetched successfully:", response.data);
      setOrderSets(response.data); // Audience data
    } catch (error) {
      console.error(
        "Error fetching Orders/Campaigns:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  const handleSendMessages = async (audienceId) => {
    const messageTemplate = "Hi [Name], here’s 10% off on your next order!";
    console.log("Audience ID:", audienceId); // Debug
  if (!audienceId) {
    alert("Audience ID is not defined!");
    return;
  }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/send-messages",
        {
          userId:userId,
          audienceId : audienceId,
          messageTemplate: messageTemplate,
        }
      );
      alert(`Messages sent successfully. Log ID: ${response.data.logId}`);
      console.log("Messages sent:", response.data);
    } catch (error) {
      console.error(
        "Error sending messages:",
        error.response?.data || error.message
      );
      // alert("Failed to send messages. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-light-gray p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-deep-teal">Orders</h1>
        <button
          className="bg-mint-green text-black px-4 py-2 rounded-lg hover:bg-light-sky-blue transition"
          onClick={() => setShowModal(true)}
        >
          Add New Order
        </button>
      </header>

      <div className="space-y-4">
        {orderSets.length === 0 ? (
          <div>No orders yet</div>
        ) : (
          <div>
            {orderSets.map((order, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center hover:shadow-xl transition gap-y-2"
              >
                <div>
                  <h2 className="text-lg font-semibold text-deep-teal">
                    {order.name}
                  </h2>
                  <p className="text-gray-500">Budget: ${order.budget}</p>
                  <p className="text-sm text-gray-500">
                    Start date: {order.startDate} End date: {order.endDate}
                  </p>
                </div>
                <button
                  className="bg-light-sky-blue text-black px-4 py-2 rounded-lg hover:bg-deep-teal transition"
                  onClick={() => {
                    console.log(order.audienceId);
                    handleSendMessages(order.audienceId);
                  }}
                >
                  Send Messages
                </button>
                <button
                  className="bg-light-sky-blue text-black px-4 py-2 rounded-lg hover:bg-deep-teal transition"
                  onClick={() => {
                    setActiveModalIndex(index);
                  }}
                >
                  View Details
                </button>
                {activeModalIndex === index && ( // Check if this card's modal should be open
                  <OrderSegmentModal
                    showModal={true}
                    onClose={() => setActiveModalIndex(null)} // Close modal
                    order={order}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Adding New Order */}

      <OrderSegmentModal
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
          setSeed(Math.random())
        }}
      />
    </div>
  );
};

export default OrdersPage;
