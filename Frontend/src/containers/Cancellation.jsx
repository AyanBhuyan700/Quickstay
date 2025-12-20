import React, { useEffect } from "react";
import Title from "../components/Title";
import { cancellation } from "../assets/assets";

const Cancellation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Cancellation Policy - QuickStay";
    }, []);
    return (
        <>
            <div className="flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 mb-20">
                <Title title="Refund & Cancellation" />
                <div>
                    {cancellation.map((item) => {
                        return (
                            <div key={item._id} className={`flex flex-col items-start justify-center gap-12`}>
                                <div>
                                    <h2 className="font-playfair text-4xl my-4">{item.header}</h2>
                                    <p className="text-gray-600">
                                        {item.title1}
                                    </p>
                                    <p className="text-gray-600">
                                        {item.title2}
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

export default Cancellation;
