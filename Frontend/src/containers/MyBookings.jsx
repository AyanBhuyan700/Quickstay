import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from '../assets/assets.js';
import { useApp } from "../context/AppContext";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";
import axios from "axios";
import toast from "react-hot-toast";

const MyBookings = () => {
    const { backendUrl, userBookings, loadingBookings, fetchUserBookings, getAuthHeaders } = useApp();
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();
    const navigate = useNavigate();

    const [actionLoadingId, setActionLoadingId] = useState(null);
    const [paymentModalData, setPaymentModalData] = useState(null); // { bookingId, amount, hotelName, roomType }
    const [cancelModalData, setCancelModalData] = useState(null); // item to cancel

    useEffect(() => {
        if (isSignedIn) {
            fetchUserBookings();
        }
        document.title = "My Bookings - QuickStay";
    }, [isSignedIn]);

    const handleOpenPaymentModal = (item) => {
        setPaymentModalData({
            bookingId: item._id,
            amount: item.totalPrice,
            hotelName: item.hotel?.name,
            roomType: item.room?.roomType,
        });
    };

    const handleExecutePayment = async ({ paymentMethod, transactionId }) => {
        if (!paymentModalData) return;
        const bookingId = paymentModalData.bookingId;
        setActionLoadingId(bookingId);

        try {
            const headers = await getAuthHeaders();
            const res = await axios.patch(
                `${backendUrl}/api/booking/pay/${bookingId}`,
                { paymentMethod, transactionId },
                { headers }
            );

            if (res.data.success) {
                toast.success("Online payment successful! Booking marked as Paid.");
                setPaymentModalData(null);
                await fetchUserBookings();
            } else {
                toast.error(res.data.message || "Payment failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to process payment");
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleConfirmCancel = async () => {
        if (!cancelModalData) return;
        const bookingId = cancelModalData._id;
        setActionLoadingId(bookingId);

        try {
            const headers = await getAuthHeaders();
            const res = await axios.patch(`${backendUrl}/api/booking/cancel/${bookingId}`, {}, { headers });
            if (res.data.success) {
                toast.success("Reservation cancelled. Refund has been initiated.");
                setCancelModalData(null);
                await fetchUserBookings();
            } else {
                toast.error(res.data.message || "Failed to cancel");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to cancel booking");
        } finally {
            setActionLoadingId(null);
        }
    };

    if (!isSignedIn) {
        return (
            <div className="py-36 px-4 text-center max-w-md mx-auto">
                <h2 className="text-2xl font-playfair mb-3">Sign in to view your bookings</h2>
                <p className="text-gray-500 text-sm mb-6">Manage all your travel itineraries, reservations, and invoices in one place.</p>
                <button
                    onClick={openSignIn}
                    className="bg-primary hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition cursor-pointer"
                >
                    Log In / Sign Up
                </button>
            </div>
        );
    }

    return (
        <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
            <Title
                title="My Bookings"
                subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
                align='left'
            />

            {loadingBookings ? (
                <div className="py-20 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading your reservations...</p>
                </div>
            ) : userBookings.length === 0 ? (
                <div className="py-20 text-center bg-gray-50 rounded-2xl mt-8 p-10 border border-gray-200">
                    <p className="text-xl font-medium text-gray-700">No reservations found</p>
                    <p className="text-gray-500 text-sm mt-2">You don't have any hotel bookings yet. Explore our premier destinations to book your next getaway.</p>
                    <button
                        onClick={() => navigate("/rooms")}
                        className="mt-6 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Explore Stays
                    </button>
                </div>
            ) : (
                <div className="max-w-6xl mt-8 w-full text-gray-800">
                    <div className="hidden md:grid md:grid-cols-[3fr_2fr_1.5fr] w-full border-b border-gray-300 font-medium text-base py-3 text-gray-600">
                        <div>Hotels</div>
                        <div>Dates & Timings</div>
                        <div>Status & Actions</div>
                    </div>

                    {userBookings.map((item) => {
                        const roomImg = item.room?.images?.[0] || assets.roomImg1;
                        const isCancelled = item.status === 'cancelled';

                        return (
                            <div key={item._id} className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1.5fr] w-full border-b border-gray-200 py-6 items-center gap-4">
                                <div className="flex flex-col md:flex-row items-start gap-4">
                                    <img
                                        src={roomImg}
                                        alt="room"
                                        className="w-full md:w-44 h-32 rounded-xl shadow-xs object-cover"
                                    />
                                    <div className="flex flex-col gap-1.5">
                                        <p className="font-playfair text-xl md:text-2xl text-gray-900">
                                            {item.hotel?.name || "Hotel Stay"}
                                            <span className="font-sans text-xs text-gray-500 block sm:inline sm:ml-2">({item.room?.roomType || "Standard Room"})</span>
                                        </p>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <img src={assets.locationIcon} alt="location" className="w-3.5 h-3.5 opacity-70" />
                                            <span>{item.hotel?.address || item.hotel?.city || "Destination"}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <img src={assets.guestsIcon} alt="guest" className="w-3.5 h-3.5 opacity-70" />
                                            <span>Guests: {item.guests || 1}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-base font-bold text-gray-800">Total: ${item.totalPrice}</p>
                                            <span className="text-[11px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">
                                                {item.paymentMethod || 'Pay At Hotel'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col lg:flex-row md:gap-8 gap-6 text-sm">
                                    <div>
                                        <p className="font-medium text-gray-700">Check-In:</p>
                                        <p className="text-gray-500 text-xs mt-0.5">{new Date(item.checkInDate).toDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700">Check-Out:</p>
                                        <p className="text-gray-500 text-xs mt-0.5">{new Date(item.checkOutDate).toDateString()}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-block h-2.5 w-2.5 rounded-full ${isCancelled ? "bg-gray-400" : item.isPaid ? "bg-green-500" : "bg-amber-500"}`}></span>
                                        <span className={`text-xs font-semibold uppercase tracking-wider ${isCancelled ? "text-gray-500" : item.isPaid ? "text-green-600" : "text-amber-600"}`}>
                                            {isCancelled ? "Cancelled" : item.isPaid ? "Paid (Confirmed)" : "Pay at Hotel"}
                                        </span>
                                    </div>

                                    {!item.isPaid && !isCancelled && (
                                        <button
                                            onClick={() => handleOpenPaymentModal(item)}
                                            disabled={actionLoadingId === item._id}
                                            className="px-4 py-2 mt-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-xs transition cursor-pointer"
                                        >
                                            {actionLoadingId === item._id ? "Processing..." : "Pay Now (Online)"}
                                        </button>
                                    )}

                                    {!isCancelled && (
                                        <button
                                            onClick={() => setCancelModalData(item)}
                                            disabled={actionLoadingId === item._id}
                                            className="text-xs text-red-500 hover:text-red-700 font-medium transition cursor-pointer mt-1"
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Custom Interactive Cancel Confirmation Modal */}
            {cancelModalData && (
                <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden p-6">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900">Cancel Reservation?</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Are you sure you want to cancel your stay at <strong className="text-gray-900">{cancelModalData.hotel?.name || 'Hotel'}</strong> ({cancelModalData.room?.roomType})?
                        </p>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 my-4 text-xs text-gray-600 space-y-1">
                            <div className="flex justify-between">
                                <span>Total Price:</span>
                                <strong className="text-gray-900">${cancelModalData.totalPrice}</strong>
                            </div>
                            <div className="flex justify-between">
                                <span>Payment Status:</span>
                                <span className={cancelModalData.isPaid ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>
                                    {cancelModalData.isPaid ? "Paid (Full Refund Eligible)" : "Pay at Hotel"}
                                </span>
                            </div>
                            {cancelModalData.isPaid && (
                                <p className="text-[11px] text-green-700 pt-1 border-t border-gray-200 mt-1">
                                    Refund of ${cancelModalData.totalPrice} will be returned to your original payment method in 3–5 business days.
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setCancelModalData(null)}
                                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-sm transition cursor-pointer"
                            >
                                Keep Booking
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmCancel}
                                disabled={actionLoadingId === cancelModalData._id}
                                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition cursor-pointer shadow-sm disabled:opacity-50"
                            >
                                {actionLoadingId === cancelModalData._id ? "Cancelling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal for Paying Unpaid Bookings */}
            <PaymentModal
                isOpen={Boolean(paymentModalData)}
                onClose={() => setPaymentModalData(null)}
                amount={paymentModalData?.amount}
                bookingDetails={paymentModalData}
                onPaymentSuccess={handleExecutePayment}
            />
        </div>
    );
};

export default MyBookings;
