import React from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useUser, useClerk } from "@clerk/clerk-react";

const Layout = () => {
  const { isOwner, setIsHotelRegOpen } = useApp();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h2 className="text-3xl font-playfair mb-3">Hotel Owner Portal</h2>
        <p className="text-gray-500 max-w-md mb-6">Please log in to your hotel owner account to access your property dashboard.</p>
        <button
          onClick={openSignIn}
          className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition cursor-pointer font-medium"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h2 className="text-3xl font-playfair mb-3">Register Your Property</h2>
        <p className="text-gray-500 max-w-md mb-6">You haven't registered a hotel yet. Register your property to list rooms and manage bookings.</p>
        <div className="flex gap-4">
          <button
            onClick={() => setIsHotelRegOpen(true)}
            className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition cursor-pointer font-medium"
          >
            Register Hotel Now
          </button>
          <button
            onClick={() => navigate("/")}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl transition cursor-pointer font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50/50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
