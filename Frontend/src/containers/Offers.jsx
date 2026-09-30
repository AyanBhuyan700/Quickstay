import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets, exclusiveOffers } from "../assets/assets";
import Title from "../components/Title";
import toast from "react-hot-toast";

const ALL_OFFERS = [
    {
        id: "offer-1",
        title: "Summer Escape Package",
        tagline: "Enjoy complimentary daily breakfast, pool access & late check-out",
        code: "SUMMER25",
        discount: 25,
        expiry: "Oct 15",
        badge: "Most Popular",
        image: exclusiveOffers[0]?.image || "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800",
        perks: [
            "Complimentary daily gourmet buffet breakfast for two",
            "Guaranteed late check-out up to 3:00 PM",
            "Welcome tropical cocktails & chilled fruit platter upon arrival",
            "Free access to resort pool, sauna & fitness center",
        ],
        terms: "Minimum 2 nights stay required. Valid for all room types.",
    },
    {
        id: "offer-2",
        title: "Romantic Couples Getaway",
        tagline: "Candlelight ambience, champagne on arrival & luxury spa credit",
        code: "ROMANCE20",
        discount: 20,
        expiry: "Oct 20",
        badge: "Best for Couples",
        image: exclusiveOffers[1]?.image || "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800",
        perks: [
            "Chilled bottle of French Champagne on arrival",
            "$100 Luxury Spa & Wellness credit per stay",
            "Romantic candlelit balcony dining setup",
            "Complimentary room service breakfast in bed",
        ],
        terms: "Book at least 48 hours prior to arrival. Non-refundable.",
    },
    {
        id: "offer-3",
        title: "Luxury Retreat & Early Bird",
        tagline: "Book 30+ days in advance and unlock VIP perks at premier properties",
        code: "LUXURY30",
        discount: 30,
        expiry: "Oct 31",
        badge: "Biggest Savings",
        image: exclusiveOffers[2]?.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
        perks: [
            "30% off luxury suites and beachfront villas",
            "Complimentary VIP airport transfer in private luxury vehicle",
            "24-hour dedicated concierge & personalized butler service",
            "Exclusive executive lounge access with evening hors d'oeuvres",
        ],
        terms: "Requires advance purchase 30 days prior. Blackout dates apply.",
    },
    {
        id: "offer-4",
        title: "Weekend Staycation Deal",
        tagline: "Quick weekend recharge with flexible check-in & complimentary valet",
        code: "QUICK15",
        discount: 15,
        expiry: "Nov 05",
        badge: "Weekend Special",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800",
        perks: [
            "15% off Friday to Sunday weekend stays",
            "Complimentary valet parking throughout your stay",
            "10% discount on all on-site fine dining and bar menus",
            "Complimentary high-speed premium Wi-Fi",
        ],
        terms: "Valid for Friday, Saturday, and Sunday bookings only.",
    },
];

const FAQS = [
    {
        q: "How do I apply an offer to my reservation?",
        a: "Simply click 'Book With This Offer' on any offer card, and the promo code and discount percentage will be automatically applied to your room selection and checkout. You can also manually enter the promo code on the Room Details page.",
    },
    {
        q: "Can I combine promotional codes with other deals?",
        a: "Only one promotional code can be applied per reservation to guarantee the lowest guaranteed rate.",
    },
    {
        q: "What is the cancellation policy on discounted packages?",
        a: "Standard cancellation policies apply to most packages. You can cancel your reservation for free up to 24 hours prior to check-in through your My Bookings dashboard.",
    },
    {
        q: "Do I pay online or at the hotel?",
        a: "You can choose either option at checkout! Pay immediately online via Credit Card / UPI, or select 'Pay At Hotel' to pay upon check-in while retaining your promotional discount.",
    },
];

const Offers = () => {
    const navigate = useNavigate();
    const [copiedCode, setCopiedCode] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Exclusive Offers & Packages - QuickStay";
    }, []);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        toast.success(`Coupon code ${code} copied to clipboard!`);
        setTimeout(() => setCopiedCode(null), 3000);
    };

    const handleBookWithOffer = (offer) => {
        toast.success(`Offer ${offer.code} applied! Showing discounted stays.`);
        navigate(`/rooms?discount=${offer.discount}&offerCode=${offer.code}&offer=${encodeURIComponent(offer.title)}`);
        window.scrollTo(0, 0);
    };

    return (
        <div className="pt-28 md:pt-36 pb-24 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
                <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full border border-blue-200">
                    Limited Time Travel Promotions
                </span>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-4">
                    Exclusive Offers & Seasonal Packages
                </h1>
                <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed">
                    Take advantage of our handpicked holiday packages, couple retreats, and early bird discounts designed to make your luxury getaway unforgettable.
                </p>
            </div>

            {/* Offers Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
                {ALL_OFFERS.map((offer) => (
                    <div
                        key={offer.id}
                        className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                        {/* Image & Badges */}
                        <div className="relative h-64 w-full overflow-hidden">
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                <span className="px-3 py-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full shadow-xs uppercase tracking-wider">
                                    {offer.discount}% OFF
                                </span>
                                {offer.badge && (
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-semibold rounded-full shadow-xs">
                                        {offer.badge}
                                    </span>
                                )}
                            </div>

                            <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white/90 text-xs rounded-full">
                                    Valid till {offer.expiry}
                                </span>
                            </div>

                            <div className="absolute bottom-4 left-6 right-6 text-white">
                                <h2 className="text-2xl font-playfair font-bold">{offer.title}</h2>
                                <p className="text-xs text-gray-200 mt-1 line-clamp-1">{offer.tagline}</p>
                            </div>
                        </div>

                        {/* Content & Inclusions */}
                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                                    What's Included
                                </h3>
                                <ul className="space-y-2 mb-6">
                                    {offer.perks.map((perk, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                                            <span className="text-emerald-500 font-bold">✓</span>
                                            <span>{perk}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-xs text-gray-400 italic mb-6">
                                    * {offer.terms}
                                </p>
                            </div>

                            {/* Promo Code & Action Box */}
                            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <div className="bg-gray-100 border border-gray-300 rounded-xl px-3.5 py-2 font-mono font-bold text-sm text-gray-800">
                                        {offer.code}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(offer.code)}
                                        className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer underline"
                                    >
                                        {copiedCode === offer.code ? "Copied! ✓" : "Copy Code"}
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleBookWithOffer(offer)}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
                                >
                                    Book With This Offer →
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-24 pt-16 border-t border-gray-200">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <Title title="Frequently Asked Questions" subTitle="Everything you need to know about our exclusive offers and reservations." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {FAQS.map((faq, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80">
                            <h4 className="font-semibold text-gray-900 text-base">{faq.q}</h4>
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Offers;
