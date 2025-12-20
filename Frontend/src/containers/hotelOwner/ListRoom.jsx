import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { roomsDummyData } from "../../assets/assets";

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData)
  useEffect(() => {
    document.title = "List Room - QuickStay";
  }, []);
  return (
    <>
      <div className="flex-1 p-4 pt-10 md:px-10 h-full">
        <Title align="left" font="outfit" title="Room Listings" subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users." />
        <p className="text-gray-500 mt-8">Total Hotels</p>
        <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
                <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Facility</th>
                <th className="py-3 px-4 text-gray-800 font-medium text-center">Price / night</th>
                <th className="py-3 px-4 text-gray-800 font-medium text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {rooms.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300">{item.roomType}</td>
                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">{item.amenities.join(", ")}</td>
                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">$ {item.pricePerNight}</td>
                    <td className="py-3 px-4 border-t border-gray-300 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={item.isAvailable} readOnly />
                        <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
                        <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-sm"></span>
                      </label>
                    </td>
                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>
      </div>
    </>
  )
};

export default ListRoom;
