import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const FeaturedDestination = () => {    
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
                <Title title='Featured Destination' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.' />
                <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
                    {roomsDummyData.slice(0, 4).map((room, index) => (
                        <HotelCard key={room._id} room={room} index={index} />
                    ))}
                </div>
                <button
                    className="relative my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white text-black 
             overflow-hidden cursor-pointer transition-colors duration-500 
             before:absolute before:inset-0 before:bg-black before:origin-bottom before:scale-y-0 
             before:transition-transform before:duration-500 
             hover:before:scale-y-100 hover:text-white"
                    onClick={() => {
                        navigate("/rooms");
                    }}
                >
                    <span className="relative z-10">View All Destinations</span>
                </button>

            </div>
        </>
    )
};

export default FeaturedDestination;
