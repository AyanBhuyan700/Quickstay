import React, { useEffect } from "react";
import Title from "../components/Title";
import { terms } from "../assets/assets";

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Terms & Conditions - QuickStay";
    }, []);
    
    return (
        <>
            <div className="flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
                <Title title="Terms & Conditions" subTitle="Please find the Terms & Conditions for The QuickStay Hotel below:" />
                <div className="my-16 text-gray-600">
                    {terms.map((item) => {
                        return (
                            <div key={item._id} >
                                <h1 className="text-3xl font-playfair text-black">{item.header}</h1>
                                <p className="my-6">{item.title}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
};

export default Terms;
