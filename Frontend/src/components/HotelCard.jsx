import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
    const roomImg = room?.images?.[0] || assets.roomImg1;
    const hotelName = room?.hotel?.name || "Premier Stay";
    const hotelAddress = room?.hotel?.address || room?.hotel?.city || "Luxury Destination";

    return (
        <Link
            to={`/rooms/${room._id}`}
            className="relative max-w-72 w-full rounded-2xl overflow-hidden bg-white text-gray-500 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
            onClick={() => window.scrollTo(0, 0)}
            key={room._id}
        >
            <div className="relative overflow-hidden h-48 w-full">
                <img
                    src={roomImg}
                    alt={hotelName}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {index % 2 === 0 && (
                    <span className="px-3 py-1 absolute top-3 left-3 text-xs bg-white/95 backdrop-blur-xs text-gray-800 font-semibold rounded-full shadow-xs">
                        Best Seller
                    </span>
                )}
                <span className="px-2.5 py-0.5 absolute bottom-3 right-3 text-xs bg-black/60 backdrop-blur-xs text-white rounded-md">
                    {room.roomType}
                </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start gap-2">
                        <p className="font-playfair text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {hotelName}
                        </p>
                        <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 shrink-0">
                            <img src={assets.starIconFilled} alt="Rating" className="w-3.5 h-3.5" />
                            <span>4.8</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 line-clamp-1">
                        <img src={assets.locationIcon} alt="Location" className="w-3.5 h-3.5 opacity-60 shrink-0" />
                        <span className="truncate">{hotelAddress}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">
                    <p className="text-gray-900 font-bold text-lg">
                        ${room.pricePerNight} <span className="text-xs text-gray-500 font-normal">/night</span>
                    </p>
                    <button className="px-4 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg group-hover:bg-primary group-hover:text-white transition-all cursor-pointer">
                        Book Now
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default HotelCard;
