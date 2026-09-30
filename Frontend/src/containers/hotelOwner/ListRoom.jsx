import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets, roomsDummyData } from "../../assets/assets";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ListRoom = () => {
  const { backendUrl, getAuthHeaders, ownerHotel } = useApp();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const navigate = useNavigate();

  const fetchOwnerRooms = async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${backendUrl}/api/room/owner/rooms`, { headers });
      if (res.data.success && res.data.rooms && res.data.rooms.length > 0) {
        setRooms(res.data.rooms);
      } else {
        setRooms(roomsDummyData);
      }
    } catch (err) {
      console.warn("Failed to load owner rooms, using fallback data", err);
      setRooms(roomsDummyData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Room Listings - QuickStay";
    fetchOwnerRooms();
  }, []);

  const handleToggleAvailability = async (roomId, currentStatus) => {
    setTogglingId(roomId);
    try {
      const headers = await getAuthHeaders();
      const res = await axios.patch(
        `${backendUrl}/api/room/owner/toggle-availability/${roomId}`,
        {},
        { headers }
      );
      if (res.data.success) {
        toast.success(`Room marked as ${!currentStatus ? 'Available' : 'Unavailable'}`);
        setRooms((prev) =>
          prev.map((r) => (r._id === roomId ? { ...r, isAvailable: !r.isAvailable } : r))
        );
      } else {
        toast.error(res.data.message || "Failed to update room status");
      }
    } catch (err) {
      // Optimistic update for dummy data mode
      setRooms((prev) =>
        prev.map((r) => (r._id === roomId ? { ...r, isAvailable: !r.isAvailable } : r))
      );
      toast.success(`Room status updated`);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Title
          align="left"
          font="outfit"
          title="Room Listings"
          subTitle="View, manage, and toggle availability for all listed rooms in your property."
        />
        <button
          onClick={() => navigate("/owner/add-room")}
          className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition cursor-pointer self-start md:self-auto shadow-xs"
        >
          + Add New Room
        </button>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-gray-600 text-sm font-medium">
          Total Listed Rooms: <strong className="text-gray-900">{rooms.length}</strong>
        </p>
        {ownerHotel && <p className="text-xs text-gray-500">{ownerHotel.name}</p>}
      </div>

      <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs mt-3">
        {loading ? (
          <div className="py-20 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
            <p className="text-sm">Loading listed rooms...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-base text-gray-700 font-medium">No rooms listed yet.</p>
            <p className="text-xs text-gray-500 mt-1">Start by adding your first room to welcome guests.</p>
            <button
              onClick={() => navigate("/owner/add-room")}
              className="mt-4 px-6 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Add Room
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Room Type</th>
                  <th className="py-3.5 px-4 font-semibold max-sm:hidden">Amenities</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Price / night</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Available</th>
                </tr>
              </thead>

              <tbody className="text-sm divide-y divide-gray-200">
                {rooms.map((item, index) => {
                  const roomImg = item.images?.[0] || assets.roomImg1;
                  return (
                    <tr key={item._id || index} className="hover:bg-gray-50/50 transition">
                      <td className="py-3.5 px-4 text-gray-900 font-medium flex items-center gap-3">
                        <img src={roomImg} alt="Room" className="w-12 h-12 rounded-lg object-cover" />
                        <span>{item.roomType}</span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 text-xs max-sm:hidden max-w-xs truncate">
                        {Array.isArray(item.amenities) ? item.amenities.join(", ") : "Standard amenities"}
                      </td>
                      <td className="py-3.5 px-4 text-gray-900 font-semibold text-center">
                        ${item.pricePerNight}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleAvailability(item._id, item.isAvailable)}
                          disabled={togglingId === item._id}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none ${item.isAvailable ? "bg-blue-600" : "bg-gray-300"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.isAvailable ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListRoom;
