import React, { useState } from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const offerDetails = {
    1: {
        code: "SUMMER25",
        perks: [
            "Complimentary daily gourmet buffet breakfast for two",
            "Guaranteed late check-out up to 4:00 PM",
            "Welcome tropical cocktails & chilled fruit platter upon arrival",
            "25% discount applied automatically at reservation",
            "Complimentary pool and fitness lounge access",
        ],
        terms: "Valid for stays of 2 nights or more. Subject to availability at participating resorts.",
    },
    2: {
        code: "ROMANCE20",
        perks: [
            "Complimentary bottle of chilled French Champagne on arrival",
            "$150 Luxury Spa & Wellness credit per stay",
            "Private lantern-lit beach or balcony dining setup",
            "20% discount on all suites and luxury rooms",
            "Complimentary room service breakfast in bed",
        ],
        terms: "Designed for couples. Must be booked at least 48 hours prior to arrival.",
    },
    3: {
        code: "LUXURY30",
        perks: [
            "30% savings on premier suites worldwide when booked 30+ days in advance",
            "Complimentary round-trip VIP airport limousine transfer",
            "Dedicated 24-hour private butler and concierge service",
            "Access to exclusive executive club lounge & afternoon tea",
            "Complimentary high-speed satellite Wi-Fi",
        ],
        terms: "Advance purchase rate. Non-refundable. Blackout dates may apply.",
    },
};

const ExclusiveOffers = () => {
    const navigate = useNavigate();
    const [selectedOffer, setSelectedOffer] = useState(null);

    const handleClaimOffer = (offer) => {
        setSelectedOffer(null);
        navigate(`/rooms?discount=${offer.priceOff}&offerCode=${offerDetails[offer._id]?.code || 'OFFER'}&offer=${encodeURIComponent(offer.title)}`);
        window.scrollTo(0, 0);
    };

    return (
        <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-4">
                <Title
                    align="left"
                    title="Exclusive Offers"
                    subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
                />
                <button
                    onClick={() => {
                        navigate("/offers");
                        window.scrollTo(0, 0);
                    }}
                    className="group flex items-center gap-2 font-semibold text-sm text-gray-800 hover:text-blue-600 transition cursor-pointer self-start md:self-auto shrink-0 mb-2"
                >
                    <span>View All Offers</span>
                    <img
                        src={assets.arrowIcon}
                        alt="arrow"
                        className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform"
                    />
                </button>
            </div>

            {/* Offers Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full">
                {exclusiveOffers.map((item) => {
                    const extra = offerDetails[item._id] || {};
                    const expiryDate = new Date(Date.now() + 10 * 86400000).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    });

                    return (
                        <div
                            key={item._id}
                            onClick={() => setSelectedOffer(item)}
                            className="group relative flex flex-col justify-end h-96 p-6 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            {/* Background Image with Zoom */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                            />

                            {/* Dark Gradient Overlay for optimal text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15 group-hover:from-black/98 transition-colors duration-500"></div>

                            {/* Discount Badge */}
                            <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
                                <span className="px-3.5 py-1.5 text-xs font-semibold bg-white text-gray-900 rounded-full shadow-md tracking-wide">
                                    {item.priceOff}% Off
                                </span>
                                {extra.code && (
                                    <span className="px-3 py-1 text-[11px] font-mono font-semibold bg-blue-600 text-white rounded-full shadow-xs uppercase tracking-wider">
                                        {extra.code}
                                    </span>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="relative z-10 text-white">
                                <h3 className="text-2xl font-playfair font-semibold leading-tight text-white group-hover:text-blue-200 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-200 mt-2 line-clamp-2 leading-relaxed">
                                    {item.description}
                                </p>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                                    <span className="text-xs text-white/70">
                                        Expires {expiryDate}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClaimOffer(item);
                                        }}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-blue-300 transition-colors cursor-pointer"
                                    >
                                        <span>View Offers</span>
                                        <img
                                            src={assets.arrowIcon}
                                            alt="arrow"
                                            className="w-3 h-3 invert group-hover:translate-x-1 transition-transform"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Interactive Offer Details Modal */}
            {selectedOffer && (
                <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
                        {/* Modal Header Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src={selectedOffer.image}
                                alt={selectedOffer.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <button
                                onClick={() => setSelectedOffer(null)}
                                className="absolute top-4 right-4 h-9 w-9 bg-black/40 hover:bg-black/70 backdrop-blur-md rounded-full text-white text-lg flex items-center justify-center transition cursor-pointer"
                            >
                                ✕
                            </button>
                            <div className="absolute bottom-4 left-6 text-white">
                                <span className="px-3 py-1 text-xs font-bold bg-amber-400 text-black rounded-full uppercase tracking-wider">
                                    Save {selectedOffer.priceOff}%
                                </span>
                                <h3 className="text-2xl font-playfair font-bold mt-2 text-white">
                                    {selectedOffer.title}
                                </h3>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {selectedOffer.description}
                            </p>

                            <div className="mt-5">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Package Inclusions & Perks
                                </h4>
                                <ul className="mt-3 space-y-2">
                                    {(offerDetails[selectedOffer._id]?.perks || []).map((perk, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                                            <span className="text-emerald-500 font-bold">✓</span>
                                            <span>{perk}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Promo Code Box */}
                            <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
                                <div>
                                    <p className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider">Promo Code</p>
                                    <p className="text-lg font-mono font-bold text-blue-900 tracking-wider">
                                        {offerDetails[selectedOffer._id]?.code || "SAVE25"}
                                    </p>
                                </div>
                                <span className="text-xs text-blue-700 font-medium">Applied automatically</span>
                            </div>

                            <p className="text-[11px] text-gray-400 mt-4 leading-normal">
                                {offerDetails[selectedOffer._id]?.terms}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setSelectedOffer(null)}
                                    className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 text-sm font-medium transition cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleClaimOffer(selectedOffer)}
                                    className="flex-1 py-3 bg-primary hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md active:scale-98 transition cursor-pointer"
                                >
                                    Claim & Book Stays
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ExclusiveOffers;
