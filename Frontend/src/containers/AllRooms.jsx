import React, { useEffect, useState, useMemo } from "react";
import StarRatings from "../components/StarRatings";
import { assets, facilityIcons } from "../assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

const CheckBox = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm text-gray-700 hover:text-black">
            <input
                type="checkbox"
                checked={selected}
                onChange={(e) => {
                    onChange(e.target.checked, label);
                }}
                className="rounded accent-blue-600 cursor-pointer"
            />
            <span className="font-light select-none">{label}</span>
        </label>
    );
};

const RadioButton = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm text-gray-700 hover:text-black">
            <input
                type="radio"
                name="sortOption"
                checked={selected}
                onChange={() => {
                    onChange(label);
                }}
                className="accent-blue-600 cursor-pointer"
            />
            <span className="font-light select-none">{label}</span>
        </label>
    );
};

const AllRooms = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { rooms, loadingRooms } = useApp();

    const cityParam = searchParams.get("city") || "";
    const discountParam = searchParams.get("discount");
    const offerCode = searchParams.get("offerCode");
    const [openFilters, setOpenFilters] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedRanges, setSelectedRanges] = useState([]);
    const [selectedSort, setSelectedSort] = useState("Newest First");

    const roomTypes = [
        "Single Bed",
        "Double Bed",
        "Luxury Room",
        "Family Suite",
    ];

    const priceRanges = [
        { label: "$ 0 to 500", min: 0, max: 500 },
        { label: "$ 500 to 1000", min: 500, max: 1000 },
        { label: "$ 1000 to 2000", min: 1000, max: 2000 },
        { label: "$ 2000 to 3000", min: 2000, max: 3000 },
    ];

    const sortOptions = [
        "Price Low to High",
        "Price High to Low",
        "Newest First",
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = cityParam ? `Rooms in ${cityParam} - QuickStay` : "All Rooms - QuickStay";
    }, [cityParam]);

    const handleTypeChange = (isChecked, type) => {
        if (isChecked) {
            setSelectedTypes((prev) => [...prev, type]);
        } else {
            setSelectedTypes((prev) => prev.filter((t) => t !== type));
        }
    };

    const handleRangeChange = (isChecked, rangeLabel) => {
        if (isChecked) {
            setSelectedRanges((prev) => [...prev, rangeLabel]);
        } else {
            setSelectedRanges((prev) => prev.filter((r) => r !== rangeLabel));
        }
    };

    const handleClearFilters = () => {
        setSelectedTypes([]);
        setSelectedRanges([]);
        setSelectedSort("Newest First");
        setSearchParams({});
    };

    // Filter and sort the rooms
    const filteredRooms = useMemo(() => {
        let result = [...rooms];

        // Filter by city param if present
        if (cityParam) {
            result = result.filter(
                (item) => item.hotel && item.hotel.city && item.hotel.city.toLowerCase().includes(cityParam.toLowerCase())
            );
        }

        // Filter by room types
        if (selectedTypes.length > 0) {
            result = result.filter((item) => selectedTypes.includes(item.roomType));
        }

        // Filter by price ranges
        if (selectedRanges.length > 0) {
            result = result.filter((item) => {
                return selectedRanges.some((rangeLabel) => {
                    const foundRange = priceRanges.find((p) => p.label === rangeLabel);
                    if (!foundRange) return false;
                    return item.pricePerNight >= foundRange.min && item.pricePerNight <= foundRange.max;
                });
            });
        }

        // Sort results
        if (selectedSort === "Price Low to High") {
            result.sort((a, b) => a.pricePerNight - b.pricePerNight);
        } else if (selectedSort === "Price High to Low") {
            result.sort((a, b) => b.pricePerNight - a.pricePerNight);
        } else if (selectedSort === "Newest First") {
            result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        }

        return result;
    }, [rooms, cityParam, selectedTypes, selectedRanges, selectedSort]);

    return (
        <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 gap-10">
            <div className="flex-1 w-full">
                <div className="flex flex-col items-start text-left">
                    <h1 className="font-playfair text-4xl md:text-[40px]">
                        {cityParam ? `Stays in ${cityParam}` : "Hotel Rooms"}
                    </h1>
                    <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
                        Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                    </p>

                    {cityParam && (
                        <div className="flex items-center gap-2 mt-4 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                            <span>Showing results for: <strong>{cityParam}</strong></span>
                            <button onClick={() => setSearchParams({})} className="hover:text-blue-900 cursor-pointer ml-1 font-bold">×</button>
                        </div>
                    )}

                    {offerCode && (
                        <div className="flex items-center justify-between gap-3 mt-4 p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 text-xs rounded-xl border border-amber-200 w-full shadow-xs">
                            <div className="flex items-center gap-2">
                                <span className="text-base">🎉</span>
                                <span><strong>Exclusive Offer Applied:</strong> Promo code <strong>{offerCode}</strong> unlocked a {discountParam}% discount on all rooms!</span>
                            </div>
                            <button onClick={() => setSearchParams({})} className="hover:text-black font-bold text-xs cursor-pointer text-amber-700 underline">Remove Offer</button>
                        </div>
                    )}
                </div>

                {loadingRooms ? (
                    <div className="py-20 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
                        <p>Loading available rooms...</p>
                    </div>
                ) : filteredRooms.length === 0 ? (
                    <div className="py-20 text-center bg-gray-50 rounded-2xl mt-8 p-10 border border-gray-200">
                        <p className="text-xl font-medium text-gray-700">No rooms found matching your criteria</p>
                        <p className="text-gray-500 text-sm mt-2">Try adjusting or clearing your filters to see more results.</p>
                        <button
                            onClick={handleClearFilters}
                            className="mt-6 px-6 py-2 bg-primary text-white text-sm rounded-lg hover:bg-blue-700 transition cursor-pointer"
                        >
                            Reset All Filters
                        </button>
                    </div>
                ) : (
                    filteredRooms.map((item) => {
                        const roomImg = item.images && item.images.length > 0 ? item.images[0] : assets.roomImg1;
                        return (
                            <div key={item._id} className="flex flex-col md:flex-row items-start py-8 gap-6 border-b border-gray-200 last:border-0 hover:bg-gray-50/50 p-3 rounded-xl transition">
                                <img
                                    src={roomImg}
                                    alt="rooms"
                                    className="max-h-60 md:w-1/2 w-full rounded-xl shadow-md object-cover cursor-pointer hover:scale-[1.01] transition-transform"
                                    onClick={() => {
                                        navigate(`/rooms/${item._id}`);
                                        window.scrollTo(0, 0);
                                    }}
                                />
                                <div className="md:w-1/2 flex flex-col gap-2 w-full">
                                    <p className="text-xs uppercase tracking-wider text-blue-600 font-semibold">{item.hotel?.city || "Destination"}</p>
                                    <p
                                        className="text-gray-800 text-2xl md:text-3xl font-playfair cursor-pointer hover:text-primary transition"
                                        onClick={() => {
                                            navigate(`/rooms/${item._id}`);
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        {item.hotel?.name || "Luxury Stay"} <span className="text-base text-gray-500 font-sans font-normal">({item.roomType})</span>
                                    </p>
                                    <div className="flex items-center">
                                        <StarRatings />
                                        <p className="ml-2 text-xs text-gray-500">200+ reviews</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500 mt-1 text-sm">
                                        <img src={assets.locationIcon} alt="location" className="w-4 h-4 opacity-70" />
                                        <span>{item.hotel?.address || "Prime Location"}</span>
                                    </div>

                                    <div className="flex flex-wrap items-center mt-3 mb-4 gap-2">
                                        {item.amenities && item.amenities.map((feature, index) => {
                                            return (
                                                <div key={index} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F5F5FF] text-gray-700">
                                                    {facilityIcons[feature] && <img src={facilityIcons[feature]} alt={feature} className="w-4 h-4" />}
                                                    <p className="text-xs font-light">{feature}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-2">
                                        <div>
                                            {discountParam ? (
                                                <div>
                                                    <span className="line-through text-xs text-gray-400 mr-2">${item.pricePerNight}</span>
                                                    <span className="text-xl font-bold text-emerald-600">
                                                        ${Math.round(item.pricePerNight * (1 - Number(discountParam) / 100))}
                                                    </span>
                                                    <span className="text-xs text-gray-500 font-normal"> /night</span>
                                                </div>
                                            ) : (
                                                <p className="text-xl font-medium text-gray-800">${item.pricePerNight} <span className="text-xs text-gray-500 font-normal">/night</span></p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => {
                                                const params = new URLSearchParams();
                                                if (discountParam) params.append("discount", discountParam);
                                                if (offerCode) params.append("offerCode", offerCode);
                                                navigate(`/rooms/${item._id}?${params.toString()}`);
                                                window.scrollTo(0, 0);
                                            }}
                                            className="px-5 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
                                        >
                                            View Room
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Filter Sidebar */}
            <div className="bg-white w-full lg:w-80 border border-gray-200 rounded-xl shadow-xs text-gray-600 shrink-0 sticky top-28">
                <div className={`flex items-center justify-between px-5 py-3.5 border-b border-gray-200`}>
                    <p className="font-semibold text-sm tracking-wider text-gray-800">FILTERS</p>
                    <div className="text-xs cursor-pointer">
                        <span className="lg:hidden text-blue-600 font-medium" onClick={() => { setOpenFilters(!openFilters); }}>
                            {openFilters ? "HIDE" : "SHOW"}
                        </span>
                        <span className="hidden lg:block text-blue-600 hover:underline font-medium" onClick={handleClearFilters}>
                            CLEAR ALL
                        </span>
                    </div>
                </div>

                <div className={`${openFilters ? "block" : "hidden lg:block"} transition-all duration-300`}>
                    <div className="px-5 pt-4">
                        <p className="font-medium text-sm text-gray-800 pb-1">Room Types</p>
                        {roomTypes.map((room, index) => (
                            <CheckBox
                                key={index}
                                label={room}
                                selected={selectedTypes.includes(room)}
                                onChange={handleTypeChange}
                            />
                        ))}
                    </div>

                    <div className="px-5 pt-5">
                        <p className="font-medium text-sm text-gray-800 pb-1">Price Range</p>
                        {priceRanges.map((range, index) => (
                            <CheckBox
                                key={index}
                                label={range.label}
                                selected={selectedRanges.includes(range.label)}
                                onChange={handleRangeChange}
                            />
                        ))}
                    </div>

                    <div className="px-5 pt-5 pb-6">
                        <p className="font-medium text-sm text-gray-800 pb-1">Sort By</p>
                        {sortOptions.map((option, index) => (
                            <RadioButton
                                key={index}
                                label={option}
                                selected={selectedSort === option}
                                onChange={setSelectedSort}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllRooms;
