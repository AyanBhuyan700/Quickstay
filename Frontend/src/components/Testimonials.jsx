import React from "react";
import Title from "./Title";
import { assets, testimonials } from "../assets/assets";
import StarRatings from "./StarRatings";

const Testimonials = () => {
    return (
        <>
            <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">

                <Title title="What Our Guests Say" subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world." />
                <div className="flex flex-wrap items-center gap-6 mt-20 justify-center">
                    {testimonials.map((item) => {
                        return (
                            <div key={item.id} className="bg-white p-6 rounded-xl shadow">
                                <div className="flex items-center gap-3">
                                    <img src={item.image} loading="lazy" className="w-12 h-12 rounded-full" />
                                    <div>
                                        <p className="font-playfair text-xl">{item.name}</p>
                                        <p className="text-gray-500">Rating {item.rating}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-4">
                                    <StarRatings />
                                </div>
                                <p className="text-gray-500 max-w-90 mt-4">{item.review}</p>
                            </div>
                        )
                    })}

                </div>
            </div>

        </>
    )
};

export default Testimonials;
