import React, { useState } from 'react';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';

const PaymentModal = ({ isOpen, onClose, amount, bookingDetails, onPaymentSuccess }) => {
    if (!isOpen) return null;

    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'upi'
    const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
    const [cardHolder, setCardHolder] = useState('Alex Morgan');
    const [expiry, setExpiry] = useState('12/28');
    const [cvv, setCvv] = useState('888');
    const [upiId, setUpiId] = useState('alex@okaxis');
    const [processing, setProcessing] = useState(false);

    // Format card number with spaces
    const handleCardNumberChange = (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardNumber(val);
    };

    // Format expiry date
    const handleExpiryChange = (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) {
            val = val.substring(0, 2) + '/' + val.substring(2);
        }
        setExpiry(val);
    };

    const handlePay = () => {
        if (paymentMethod === 'card') {
            if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
                toast.error('Please enter a valid 16-digit card number');
                return;
            }
            if (!expiry || expiry.length < 5) {
                toast.error('Please enter a valid expiry date (MM/YY)');
                return;
            }
            if (!cvv || cvv.length < 3) {
                toast.error('Please enter a valid 3-digit CVV');
                return;
            }
        } else {
            if (!upiId || !upiId.includes('@')) {
                toast.error('Please enter a valid UPI ID (e.g. user@bank)');
                return;
            }
        }

        setProcessing(true);
        // Simulate gateway verification
        setTimeout(() => {
            const transactionId = 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase();
            setProcessing(false);
            onPaymentSuccess({
                paymentMethod: paymentMethod === 'card' ? 'Online (Credit Card)' : 'Online (UPI)',
                transactionId,
            });
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden relative">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
                    <button
                        onClick={onClose}
                        disabled={processing}
                        className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-light cursor-pointer"
                    >
                        ✕
                    </button>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-200 font-semibold">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clipRule="evenodd" />
                        </svg>
                        <span>256-bit SSL Encrypted Payment</span>
                    </div>
                    <div className="flex justify-between items-baseline mt-4">
                        <div>
                            <h3 className="text-xl font-semibold">QuickStay Secure Checkout</h3>
                            <p className="text-xs text-blue-100 mt-0.5">{bookingDetails?.hotelName || 'Hotel Reservation'} • {bookingDetails?.roomType || 'Room'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-blue-200">Amount Due</p>
                            <p className="text-2xl font-bold">${amount}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="p-6">
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`flex-1 py-2.5 text-center text-sm font-medium border-b-2 cursor-pointer transition ${paymentMethod === 'card' ? 'border-primary text-primary font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            Credit / Debit Card
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('upi')}
                            className={`flex-1 py-2.5 text-center text-sm font-medium border-b-2 cursor-pointer transition ${paymentMethod === 'upi' ? 'border-primary text-primary font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            UPI / Instant Pay
                        </button>
                    </div>

                    {paymentMethod === 'card' ? (
                        <div>
                            {/* Virtual Card Graphic */}
                            <div className="w-full h-40 bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-900 rounded-2xl p-5 text-white shadow-lg flex flex-col justify-between mb-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs tracking-widest text-white/70 font-mono">QUICKSTAY PAY</span>
                                    <span className="font-bold text-sm italic tracking-wider text-amber-300">VISA / MASTERCARD</span>
                                </div>
                                <div className="text-lg md:text-xl font-mono tracking-widest text-white/95 py-1">
                                    {cardNumber || '•••• •••• •••• ••••'}
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <div>
                                        <p className="text-[10px] text-white/60 uppercase">Cardholder</p>
                                        <p className="font-medium tracking-wide uppercase truncate max-w-44">{cardHolder || 'CARDHOLDER NAME'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-white/60 uppercase">Expires</p>
                                        <p className="font-medium font-mono">{expiry || 'MM/YY'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Inputs */}
                            <div className="space-y-3.5">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        value={cardNumber}
                                        onChange={handleCardNumberChange}
                                        placeholder="4242 4242 4242 4242"
                                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm font-mono outline-blue-500"
                                        maxLength="19"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            value={expiry}
                                            onChange={handleExpiryChange}
                                            placeholder="MM/YY"
                                            className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm font-mono outline-blue-500"
                                            maxLength="5"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">CVV</label>
                                        <input
                                            type="password"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                                            placeholder="•••"
                                            className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm font-mono outline-blue-500"
                                            maxLength="4"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Cardholder Name</label>
                                    <input
                                        type="text"
                                        value={cardHolder}
                                        onChange={(e) => setCardHolder(e.target.value)}
                                        placeholder="Full name on card"
                                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 py-2">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Virtual Payment Address (UPI ID)</label>
                                <input
                                    type="text"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    placeholder="yourname@okhdfcbank"
                                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-blue-500"
                                />
                                <p className="text-xs text-gray-400 mt-1.5">Compatible with Google Pay, PhonePe, Paytm, and BHIM.</p>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                                <span className="text-xs text-gray-600 font-medium">Auto-Debit Verification</span>
                                <span className="text-xs text-green-600 font-semibold">Active & Instant</span>
                            </div>
                        </div>
                    )}

                    {/* Pay Button */}
                    <button
                        type="button"
                        onClick={handlePay}
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg mt-6 cursor-pointer active:scale-98 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {processing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                <span>Verifying Payment...</span>
                            </>
                        ) : (
                            <span>Pay ${amount} & Confirm Reservation</span>
                        )}
                    </button>
                    <p className="text-[11px] text-gray-400 text-center mt-2.5">
                        Payments are securely encrypted and saved directly to your profile.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
