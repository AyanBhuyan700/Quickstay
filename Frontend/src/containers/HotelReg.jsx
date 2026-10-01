import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useApp } from "../context/AppContext";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const HotelReg = () => {
    const { backendUrl, setIsHotelRegOpen, setUserRole, setOwnerHotel, getAuthHeaders } = useApp();
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        address: "",
        city: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isSignedIn) {
            toast.error("Please login first to register your hotel");
            openSignIn();
            return;
        }

        if (!formData.name || !formData.contact || !formData.address || !formData.city) {
            toast.error("Please fill in all required fields");
            return;
        }

        setSubmitting(true);
        try {
            const headers = await getAuthHeaders();
            const res = await axios.post(`${backendUrl}/api/hotel/register`, formData, { headers });

            if (res.data.success) {
                toast.success("Hotel registered successfully! Welcome to your dashboard.");
                setUserRole("hotelOwner");
                setOwnerHotel(res.data.hotel);
                setIsHotelRegOpen(false);
                navigate("/owner");
            } else {
                toast.error(res.data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Hotel registration error:", error);
            toast.error(error.response?.data?.message || "Failed to register hotel. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
            <form onSubmit={handleSubmit} className="relative flex bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <img src={assets.regImage} alt="register" className="w-1/2 rounded-l-2xl hidden md:block object-cover" />
                <div className="relative flex flex-col items-center md:w-1/2 p-6 md:p-10 w-full">
                    <button
                        type="button"
                        onClick={() => setIsHotelRegOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        <img src={assets.closeIcon} alt="close" className="h-4 w-4" />
                    </button>
                    <p className="text-2xl font-semibold mt-4 text-gray-800">Register Your Hotel</p>
                    <p className="text-xs text-gray-500 mt-1 text-center">List your property with QuickStay and reach travelers worldwide</p>

                    <div className="w-full mt-5">
                        <label htmlFor="hotelName" className="font-medium text-sm text-gray-700">Hotel Name</label>
                        <input
                            id="hotelName"
                            placeholder="e.g. Grand Horizon Hotel"
                            className="border border-gray-200 rounded-lg w-full px-3 py-2 mt-1 text-sm outline-blue-500 transition-all font-light"
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="w-full mt-3">
                        <label htmlFor="hotelContact" className="font-medium text-sm text-gray-700">Phone</label>
                        <input
                            id="hotelContact"
                            placeholder="e.g. +1 234 567 8900"
                            className="border border-gray-200 rounded-lg w-full px-3 py-2 mt-1 text-sm outline-blue-500 transition-all font-light"
                            required
                            type="text"
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        />
                    </div>

                    <div className="w-full mt-3">
                        <label htmlFor="hotelAddress" className="font-medium text-sm text-gray-700">Address</label>
                        <input
                            id="hotelAddress"
                            placeholder="Street, locality, landmark"
                            className="border border-gray-200 rounded-lg w-full px-3 py-2 mt-1 text-sm outline-blue-500 transition-all font-light"
                            required
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    <div className="w-full mt-3">
                        <label htmlFor="hotelCity" className="font-medium text-sm text-gray-700">City</label>
                        <select
                            id="hotelCity"
                            className="border border-gray-200 rounded-lg w-full px-3 py-2 mt-1 text-sm outline-blue-500 transition-all font-light"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary hover:bg-blue-700 transition-all text-white w-full py-2.5 rounded-lg cursor-pointer mt-6 font-medium shadow-md hover:shadow-lg disabled:opacity-50"
                    >
                        {submitting ? "Registering Property..." : "Register Hotel"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HotelReg;
