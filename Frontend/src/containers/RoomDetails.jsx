import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { assets, facilityIcons, roomCommonData, roomsDummyData } from "../assets/assets";
import StarRatings from "../components/StarRatings";
import { useApp } from "../context/AppContext";
import { useUser, useClerk } from "@clerk/clerk-react";
import PaymentModal from "../components/PaymentModal";
import axios from "axios";
import toast from "react-hot-toast";

const PROMO_CODES = {
  SUMMER25: 25,
  ROMANCE20: 20,
  LUXURY30: 30,
  QUICK15: 15,
};

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { backendUrl, rooms, getAuthHeaders, fetchUserBookings } = useApp();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Promo / Offer state
  const initialDiscount = Number(searchParams.get("discount")) || 0;
  const initialCode = searchParams.get("offerCode") || "";
  const [appliedPromo, setAppliedPromo] = useState(initialCode);
  const [discountPercent, setDiscountPercent] = useState(initialDiscount);
  const [promoInput, setPromoInput] = useState("");

  // Booking form state
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [guests, setGuests] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [isBooking, setIsBooking] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backendUrl}/api/room/${id}`);
        if (res.data.success && res.data.room) {
          setRoom(res.data.room);
          setMainImage(res.data.room.images?.[0] || assets.roomImg1);
          document.title = `${res.data.room.hotel?.name || 'Hotel'} - ${res.data.room.roomType}`;
          return;
        }
      } catch (err) {
        // Fallback to local rooms or dummy data
      }

      const foundRoom = (rooms.length > 0 ? rooms : roomsDummyData).find(r => r._id === id);
      if (foundRoom) {
        setRoom(foundRoom);
        setMainImage(foundRoom.images?.[0] || assets.roomImg1);
        document.title = `${foundRoom.hotel?.name || 'Hotel'} - ${foundRoom.roomType}`;
      }
      setLoading(false);
    };

    fetchRoomDetail();
  }, [id, backendUrl, rooms]);

  const handleApplyPromo = (e) => {
    e?.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setDiscountPercent(PROMO_CODES[code]);
      toast.success(`Promo code ${code} applied! Saved ${PROMO_CODES[code]}%`);
      setPromoInput("");
    } else {
      toast.error("Invalid promo code. Try SUMMER25, ROMANCE20, or LUXURY30");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo("");
    setDiscountPercent(0);
    toast.success("Promo code removed");
  };

  // Calculate nights and total price
  const calculateTotal = () => {
    if (!room || !checkInDate || !checkOutDate) {
      return { nights: 1, originalTotal: room?.pricePerNight || 0, discountAmount: 0, total: room?.pricePerNight || 0 };
    }
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
    const originalTotal = nights * (room.pricePerNight || 0);
    const discountAmount = discountPercent > 0 ? Math.round(originalTotal * (discountPercent / 100)) : 0;
    const total = originalTotal - discountAmount;
    return {
      nights,
      originalTotal,
      discountAmount,
      total,
    };
  };

  const { nights, originalTotal, discountAmount, total } = calculateTotal();

  // Primary submit action
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error("Please login to complete your reservation");
      openSignIn();
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    // If Online payment is chosen, open the secure payment modal
    if (paymentMethod === "Online") {
      setIsPaymentModalOpen(true);
      return;
    }

    // Otherwise proceed with Pay At Hotel
    await executeBooking({ paymentMethod: "Pay At Hotel", isPaid: false });
  };

  const executeBooking = async ({ paymentMethod: selectedMethod, isPaid: paidStatus, transactionId }) => {
    setIsBooking(true);
    try {
      const headers = await getAuthHeaders();
      const res = await axios.post(`${backendUrl}/api/booking/book`, {
        roomId: room._id,
        checkInDate,
        checkOutDate,
        guests: Number(guests),
        paymentMethod: selectedMethod || paymentMethod,
        isPaid: paidStatus !== undefined ? paidStatus : false,
        transactionId,
        discount: discountPercent,
        offerCode: appliedPromo,
      }, { headers });

      if (res.data.success) {
        toast.success(res.data.message || "Reservation confirmed successfully! Have a great stay!");
        setIsPaymentModalOpen(false);
        await fetchUserBookings();
        navigate("/my-bookings");
      } else {
        toast.error(res.data.message || "Failed to make reservation");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  if (loading && !room) {
    return (
      <div className="py-40 text-center text-gray-500">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading room details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="py-40 text-center">
        <p className="text-xl text-gray-700">Room not found.</p>
        <button onClick={() => navigate("/rooms")} className="mt-4 px-6 py-2 bg-primary text-white rounded-lg cursor-pointer">
          Browse All Rooms
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
        {/* Title & Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-playfair">{room.hotel?.name}</h1>
              <span className="text-sm font-sans font-medium px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                {room.roomType}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
              <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
              <span>{room.hotel?.address}, {room.hotel?.city}</span>
            </div>
          </div>

          <div className="text-right max-md:text-left">
            <p className="text-3xl font-semibold text-gray-900">${room.pricePerNight} <span className="text-sm text-gray-500 font-normal">/ night</span></p>
            <div className="flex items-center gap-1 mt-1 justify-end max-md:justify-start">
              <StarRatings />
              <span className="text-xs text-gray-500 ml-1">200+ reviews</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row mt-8 gap-6">
          <div className="lg:w-7/12 w-full">
            <img
              src={mainImage || room.images?.[0]}
              alt="Main Room"
              className="w-full h-80 md:h-[460px] rounded-2xl shadow-md object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-5/12 w-full">
            {room.images && room.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Room Preview ${index + 1}`}
                onClick={() => setMainImage(image)}
                className={`w-full h-38 md:h-[220px] rounded-xl shadow-xs object-cover cursor-pointer hover:opacity-90 transition-all ${mainImage === image ? 'ring-3 ring-blue-600' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Amenities & Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Left Column: Description & Amenities */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-playfair text-gray-900">Experience Luxury & Comfort</h2>
            <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed">
              Relax in elegance with top-tier hospitality. Guests enjoy an exceptionally maintained space featuring modern furnishings, tranquil city or scenic views, and seamless concierge support.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Popular Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {room.amenities && room.amenities.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  {facilityIcons[item] ? (
                    <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  )}
                  <span className="text-xs md:text-sm font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 space-y-5 border-t border-gray-200 pt-8">
              {roomCommonData.map((item, index) => (
                <div key={index} className="flex items-start gap-3.5">
                  <img src={item.icon} className="w-6 h-6 shrink-0 mt-0.5" alt="icon" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Host Info */}
            <div className="flex items-center gap-4 mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-200">
              <img
                src={room.hotel?.owner?.image || assets.userIcon}
                alt="owner"
                className="h-14 w-14 rounded-full object-cover border border-gray-300"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Hosted by {room.hotel?.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">Contact: {room.hotel?.contact || "Available upon reservation"}</p>
              </div>
              <a
                href={`tel:${room.hotel?.contact || "+1234567890"}`}
                className="px-4 py-2 text-xs font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                Contact Host
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleBookingSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sticky top-28">
              <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">${room.pricePerNight}</span>
                  <span className="text-xs text-gray-500"> / night</span>
                </div>
                <span className="text-xs px-2.5 py-1 bg-green-50 text-green-700 font-medium rounded-full">
                  Available Now
                </span>
              </div>

              <div className="space-y-4 mt-5">
                <div>
                  <label htmlFor="checkInDate" className="block text-xs font-semibold text-gray-600 mb-1">CHECK-IN</label>
                  <input
                    id="checkInDate"
                    type="date"
                    min={today}
                    value={checkInDate}
                    onChange={(e) => {
                      setCheckInDate(e.target.value);
                      if (new Date(e.target.value) >= new Date(checkOutDate)) {
                        const nextDay = new Date(new Date(e.target.value).getTime() + 86400000).toISOString().split("T")[0];
                        setCheckOutDate(nextDay);
                      }
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="checkOutDate" className="block text-xs font-semibold text-gray-600 mb-1">CHECK-OUT</label>
                  <input
                    id="checkOutDate"
                    type="date"
                    min={checkInDate}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="guests" className="block text-xs font-semibold text-gray-600 mb-1">GUESTS</label>
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-blue-500"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">PAYMENT METHOD</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Pay At Hotel")}
                      className={`py-2 px-2 rounded-lg border text-center font-medium cursor-pointer transition ${paymentMethod === 'Pay At Hotel' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-200 text-gray-600'}`}
                    >
                      Pay At Hotel
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Online")}
                      className={`py-2 px-2 rounded-lg border text-center font-medium cursor-pointer transition ${paymentMethod === 'Online' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-200 text-gray-600'}`}
                    >
                      Pay Online
                    </button>
                  </div>
                </div>
                {/* Promo Code Input / Active Banner */}
                <div className="pt-2">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                      <div className="flex items-center gap-1.5 font-medium">
                        <span>🏷️</span>
                        <span>Promo <strong>{appliedPromo}</strong> ({discountPercent}% OFF applied!)</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="text-emerald-700 hover:text-black font-bold text-xs underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code (e.g. SUMMER25)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs uppercase font-mono rounded-lg border border-gray-300 focus:outline-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-black text-white rounded-lg font-medium transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Price breakdown */}
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>${room.pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  <span>${originalTotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Special Offer Savings ({discountPercent}%)</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Service Fees</span>
                  <span className="text-green-600 font-medium">Included</span>
                </div>

                <div className="flex justify-between items-baseline text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <div className="text-right">
                    {discountAmount > 0 && (
                      <span className="line-through text-xs font-normal text-gray-400 mr-2">${originalTotal}</span>
                    )}
                    <span className={discountAmount > 0 ? "text-emerald-600 text-lg" : "text-gray-900"}>${total}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isBooking}
                className="w-full bg-primary hover:bg-blue-700 active:scale-98 transition-all text-white font-medium py-3.5 rounded-xl mt-6 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isBooking ? "Confirming..." : paymentMethod === "Online" ? `Pay $${total} & Reserve` : `Reserve Now ($${total})`}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                {paymentMethod === "Online" ? "Secure 256-bit SSL encrypted checkout" : "Instant confirmation, pay when you arrive"}
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Online Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={total}
        bookingDetails={{
          hotelName: room.hotel?.name,
          roomType: room.roomType,
        }}
        onPaymentSuccess={({ paymentMethod: paidMethod, transactionId }) => {
          executeBooking({
            paymentMethod: paidMethod,
            isPaid: true,
            transactionId,
          });
        }}
      />
    </>
  );
};

export default RoomDetails;
