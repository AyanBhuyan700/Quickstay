import React, { useEffect } from "react";
import Title from "../components/Title";
import { assets, experiences } from "../assets/assets";

const Experience = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Experience - QuickStay";
    }, []);
    return (
        <>
            <div className="flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
                <div className="text-center lg:text-left">
                    <Title
                        title="Pathways to Adventure"
                        subTitle="From Japan’s ancient cities to Indonesia’s Spice Islands, Aman’s multi-destination journeys uncover the world at its most awe-inspiring. As new landscapes unfold, so too does self-discovery, deepening the self along the way."
                    />
                </div>

                {experiences.map((item) => {
                    return (
                        <div key={item._id} className={`flex flex-col items-center justify-center gap-12  ${item.style}`}>
                            <div className="flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt="Experience"
                                    loading="lazy"
                                    className={`object-cover rounded-lg shadow-lg ${item.imageHeight}`}
                                />
                            </div>

                            <div className="max-w-xl">
                                <p className="text-lg text-gray-600">
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    )
                })}

            </div>

        </>
    )
};

export default Experience;
