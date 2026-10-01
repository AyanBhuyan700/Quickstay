import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const Hero = () => {
  const navigate = useNavigate();
  const { backendUrl, getAuthHeaders } = useApp();
  const { isSignedIn } = useUser();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();

    // If destination entered and user is signed in, save recent city in backend
    if (destination && isSignedIn) {
      try {
        const headers = await getAuthHeaders();
        await axios.post(`${backendUrl}/api/user/storecities`, { recentSearchedCity: destination }, { headers });
      } catch (err) {
        // Non-blocking
      }
    }

    const queryParams = new URLSearchParams();
    if (destination) queryParams.append("city", destination);
    if (checkIn) queryParams.append("checkIn", checkIn);
    if (checkOut) queryParams.append("checkOut", checkOut);
    if (guests) queryParams.append("guests", guests);

    navigate(`/rooms?${queryParams.toString()}`);
  };

  return (
    <div rel="preload" className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20 text-sm font-medium backdrop-blur-xs">The Ultimate Hotel Experience</p>
      <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4" rel="preload">
        Discover Your Perfect Gateway Destination
      </h1>
      <p className="max-w-130 mt-2 text-sm md:text-base text-white/90">
        Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
      </p>

      <form onSubmit={handleSearch} className='bg-white text-gray-700 rounded-xl shadow-2xl px-6 py-5 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto max-w-4xl w-full'>
        <div className="flex-1">
          <div className='flex items-center gap-2'>
            <img src={assets.locationIcon} alt="destination" className="h-4 opacity-70" />
            <label htmlFor="destinationInput" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Destination</label>
          </div>
          <input
            list='destinations'
            id="destinationInput"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-blue-500 font-light"
            placeholder="Where are you going?"
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>

        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="calendar" className="h-4 opacity-70" />
            <label htmlFor="checkIn" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Check In</label>
          </div>
          <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-blue-500 font-light"
          />
        </div>

        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="calendar" className="h-4 opacity-70" />
            <label htmlFor="checkOut" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Check Out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-blue-500 font-light"
          />
        </div>

        <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
          <label htmlFor="guests" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Guests</label>
          <input
            min={1}
            max={10}
            id="guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-blue-500 font-light max-w-16"
          />
        </div>

        <button type="submit" className='flex items-center justify-center gap-2 rounded-lg bg-black hover:bg-neutral-800 active:scale-95 py-3 px-6 text-white my-auto cursor-pointer max-md:w-full transition-all' >
          <img src={assets.searchIcon} alt="search" className="h-5 invert" />
          <span className="font-medium text-sm">Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
