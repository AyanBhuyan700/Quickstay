import React, { useEffect } from "react";
import Title from "../components/Title";
import { career } from "../assets/assets";

const Career = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Careers - QuickStay";
    }, []);
    return (
        <>
            <div className="flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 mb-28">
                <Title title="Careers" subTitle="Our goal is to exceed our guests’ imaginations and to help them reconnect with the soul of the land which meets the sea." />
                <div>
                    {career.map((item) => {
                        return (
                            <div key={item._id} className={`flex flex-col items-center justify-center gap-12  ${item.style}`}>
                                <div className="flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt="Career"
                                        loading="lazy"
                                        className={`object-cover rounded-lg shadow-lg ${item.imageHeight}`}
                                    />
                                </div>

                                <div className="max-w-xl">
                                    <h2 className="font-playfair text-4xl mb-3">{item.header}</h2>
                                    <p className="text-lg text-gray-600">
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
};

export default Career;
