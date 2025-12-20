import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";

const AddRoom = () => {
  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: 0,
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

  return (
    <>
      <form className="flex-1 p-4 pt-10 md:px-10 h-full">
        <Title align="left" font="outfit" title="Add Room" subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience." />
        <p className="text-gray-800 mt-4">Images</p>
        <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
          {Object.keys(images).map((key) => (
            <label htmlFor={`roomImage${key}`} key={key}>
              <img src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="Room Image" className="max-h-13 cursor-pointer opacity-80" />
              <input type="file" accept="image/*" id={`roomImage${key}`} hidden onChange={e => setImages({ ...images, [key]: e.target.files[0] })} />
            </label>
          ))}
        </div>
        <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
          <div className="flex-1 max-w-48">
            <p className="text-gray-800 mt-4">Room Type</p>
            <select value={input.roomType} onChange={e => setInput({ ...input, roomType: e.target.value })} className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full">
              <option value="">Select Room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Luxury Room">Luxury Room</option>
              <option value="Family Suite">Family Suite</option>
            </select>
          </div>
          <div>
            <p className="mt-4 text-gray-800">Price <span className="text-xs">/night</span></p>
            <input placeholder="0" class="border border-gray-300 mt-1 rounded p-2 w-24" type="number" value={input.pricePerNight} onChange={e => setInput({ ...input, pricePerNight: e.target.value })} min="0" />
          </div>
        </div>
        <p className="text-gray-800 mt-4">Amenities</p>
        <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
          {Object.keys(input.amenities).map((amenity, index) => {
            return (
              <div key={index}>
                <input type="checkbox" id={`amenity${index + 1}`} checked={input.amenities[amenity]} onChange={e => setInput({ ...input, amenities: { ...input.amenities, [amenity]: !input.amenities[amenity] } })} />
                <label htmlFor={`amenity${index + 1}`} className="ml-2">{amenity}</label>
              </div>
            )
          })}
        </div>
        <button className="bg-primary text-white px-8 py-2 rounded mt-6 cursor-pointer">Add Room</button>
      </form>
    </>
  )
};

export default AddRoom;
