import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { backendUrl, getAuthHeaders, fetchRooms } = useApp();
  const navigate = useNavigate();

  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      'Free WiFi': false,
      'Free Breakfast': false,
      'Mountain View': false,
      'Room Service': false,
      'Pool Access': false,
    },
  });

  useEffect(() => {
    document.title = "Add Room - QuickStay";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.roomType) {
      toast.error("Please select a room type");
      return;
    }

    if (!input.pricePerNight || Number(input.pricePerNight) <= 0) {
      toast.error("Please enter a valid price per night");
      return;
    }

    const selectedFiles = Object.values(images).filter(Boolean);
    if (selectedFiles.length === 0) {
      toast.error("Please upload at least one room photo");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", input.roomType);
      formData.append("pricePerNight", input.pricePerNight);

      // Filter active amenities
      const activeAmenities = Object.keys(input.amenities).filter((k) => input.amenities[k]);
      formData.append("amenities", JSON.stringify(activeAmenities));

      // Append image files
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const headers = await getAuthHeaders();
      // Let axios automatically set multipart/form-data boundary with token
      const res = await axios.post(`${backendUrl}/api/room/add`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Room listed successfully!");
        await fetchRooms();
        navigate("/owner/list-room");
      } else {
        toast.error(res.data.message || "Failed to add room");
      }
    } catch (error) {
      console.error("Add room error:", error);
      toast.error(error.response?.data?.message || "Failed to add room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 max-w-4xl">
      <form onSubmit={handleSubmit}>
        <Title
          align="left"
          font="outfit"
          title="Add Room"
          subTitle="Fill in accurate room details, pricing, and amenities to enhance the booking experience for travelers."
        />

        <p className="text-gray-800 font-medium text-sm mt-6">Upload Room Photos (1-4 images)</p>
        <div className="grid grid-cols-2 sm:flex gap-4 my-3 flex-wrap">
          {Object.keys(images).map((key) => (
            <label htmlFor={`roomImage${key}`} key={key} className="cursor-pointer group">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 flex items-center justify-center overflow-hidden bg-gray-50 transition">
                {images[key] ? (
                  <img src={URL.createObjectURL(images[key])} alt="Room Preview" className="w-full h-full object-cover" />
                ) : (
                  <img src={assets.uploadArea} alt="Upload" className="h-8 w-8 opacity-60 group-hover:scale-110 transition-transform" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                id={`roomImage${key}`}
                hidden
                onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
              />
            </label>
          ))}
        </div>

        <div className="w-full flex max-sm:flex-col sm:gap-6 mt-4">
          <div className="flex-1 max-w-xs">
            <label htmlFor="roomTypeSelect" className="text-gray-800 font-medium text-sm block">Room Type</label>
            <select
              id="roomTypeSelect"
              value={input.roomType}
              onChange={(e) => setInput({ ...input, roomType: e.target.value })}
              className="border border-gray-300 mt-1 rounded-lg p-2.5 w-full text-sm outline-blue-500 bg-white"
              required
            >
              <option value="">Select Room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Luxury Room">Luxury Room</option>
              <option value="Family Suite">Family Suite</option>
            </select>
          </div>

          <div>
            <label htmlFor="roomPriceInput" className="text-gray-800 font-medium text-sm block">
              Price <span className="text-xs text-gray-500 font-normal">($ / night)</span>
            </label>
            <input
              id="roomPriceInput"
              placeholder="e.g. 199"
              className="border border-gray-300 mt-1 rounded-lg p-2.5 w-36 text-sm outline-blue-500"
              type="number"
              value={input.pricePerNight}
              onChange={(e) => setInput({ ...input, pricePerNight: e.target.value })}
              min="1"
              required
            />
          </div>
        </div>

        <p className="text-gray-800 font-medium text-sm mt-6">Included Amenities</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2 max-w-md">
          {Object.keys(input.amenities).map((amenity, index) => {
            return (
              <label key={index} className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  id={`amenity${index + 1}`}
                  checked={input.amenities[amenity]}
                  onChange={() =>
                    setInput({
                      ...input,
                      amenities: { ...input.amenities, [amenity]: !input.amenities[amenity] },
                    })
                  }
                  className="rounded accent-blue-600 cursor-pointer"
                />
                <span className="text-gray-700 text-xs font-medium select-none">{amenity}</span>
              </label>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-blue-700 active:scale-98 transition-all text-white px-8 py-3 rounded-xl mt-8 cursor-pointer font-medium shadow-md disabled:opacity-50"
        >
          {loading ? "Adding Room..." : "Add Room to Listings"}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
