import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";
import { useApp } from "../../context/AppContext";
import axios from "axios";

const Dashboard = () => {
  const { backendUrl, getAuthHeaders, ownerHotel } = useApp();
  const [dashboardData, setDashboardData] = useState(dashboardDummyData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard - QuickStay";

    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const headers = await getAuthHeaders();
        const res = await axios.get(`${backendUrl}/api/booking/owner-dashboard`, { headers });
        if (res.data.success) {
          setDashboardData(res.data);
        }
      } catch (err) {
        console.warn("Could not load real dashboard data, using dummy preview", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-6 md:p-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Title
          align="left"
          font="outfit"
          title="Dashboard"
          subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place."
        />
        {ownerHotel && (
          <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800">
            <span className="font-semibold block">{ownerHotel.name}</span>
            <span>{ownerHotel.city} • {ownerHotel.contact}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 my-8">
        <div className="bg-blue-50/60 border border-blue-100 rounded-2xl flex items-center p-5 pr-10 min-w-56">
          <img src={assets.totalBookingIcon} alt="Total Bookings" className="h-12 w-12" />
          <div className="flex flex-col ml-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Total Bookings</p>
            <p className="text-gray-900 text-2xl font-bold mt-0.5">{dashboardData.totalBookings}</p>
          </div>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl flex items-center p-5 pr-10 min-w-56">
          <img src={assets.totalRevenueIcon} alt="Total Revenue" className="h-12 w-12" />
          <div className="flex flex-col ml-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Total Revenue</p>
            <p className="text-gray-900 text-2xl font-bold mt-0.5">$ {dashboardData.totalRevenue}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl text-gray-800 font-semibold mb-4">Recent Bookings</h2>
      <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/80 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Guest</th>
                <th className="py-3.5 px-4 font-semibold max-sm:hidden">Room Type</th>
                <th className="py-3.5 px-4 font-semibold text-center">Dates</th>
                <th className="py-3.5 px-4 font-semibold text-center">Amount</th>
                <th className="py-3.5 px-4 font-semibold text-center">Status</th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-200">
              {dashboardData.bookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500 text-sm">
                    No reservations recorded yet.
                  </td>
                </tr>
              ) : (
                dashboardData.bookings.map((item, index) => {
                  return (
                    <tr key={item._id || index} className="hover:bg-gray-50/60 transition">
                      <td className="py-3.5 px-4 text-gray-800 font-medium">
                        {item.user?.username || "Guest User"}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 max-sm:hidden">
                        {item.room?.roomType || "Room"}
                      </td>
                      <td className="py-3.5 px-4 text-center text-xs text-gray-500">
                        {item.checkInDate ? new Date(item.checkInDate).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-3.5 px-4 text-gray-900 font-semibold text-center">
                        ${item.totalPrice}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block py-1 px-3 text-xs font-semibold rounded-full ${item.isPaid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                          {item.isPaid ? "Paid" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
