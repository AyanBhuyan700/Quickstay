import React, { useEffect } from "react";
import Title from "../components/Title";
import { partner } from "../assets/assets";

const Partner = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Partners - QuickStay";
      }, []);
    return (
        <>
            <div className="flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 mb-28">
                <Title title="Partners" subTitle="Secure access to all of quickstay intermediary partner progrems" />
                <div className="mt-20 relative">
                    <img className="object-cover rounded-lg shadow-lg" loading="lazy" src="https://d1pe873sdaunfo.cloudfront.net/www.thechediandermatt.com-1165907230/cms/cache/v2/61fbd151ab6d2.jpg/1920x1080/fit;c:0,86,1920,1166/80/3280b0c86ac1be026e6a7b180d4ae332.webp" />
                    <h1 className="absolute bottom-30 left-20 text-5xl text-white">QuickStay Group Partners</h1>
                </div>
                <div>
                    {partner.map((item) => {
                        return (
                            <div key={item._id} className={`flex flex-col items-center justify-center gap-12  ${item.style}`}>
                                <div className="flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt="Partner"
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

export default Partner;
