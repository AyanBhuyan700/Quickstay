import React, { useEffect } from "react";
import Title from "../components/Title";
import { about } from "../assets/assets";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "About Us - QuickStay";
    }, []);
    return (
        <>
            <div className="flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
                <div>
                    <Title title="About Us" subTitle="Arrive as a guest, leave as a friend, and return as family. We go above and beyond to exceed expectations and personalize every encounter, allowing our cherished guests to make the most of their precious time here." />
                </div>
                <div>
                    {about.map((item) => {
                        return (
                            <div key={item._id} className={`flex flex-col items-center justify-center gap-12 ${item.style}`}>
                                <div className="flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt="About"
                                        loading="lazy"
                                        className={`object-cover rounded-lg shadow-lg mt-24 ${item.imageHeight}`}
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

export default About;
