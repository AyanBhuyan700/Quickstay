import React, { useEffect, useState } from "react";
import Title from "../components/Title";

const HelpCenter = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Help Center - QuickStay";
    }, []);
    const [openIndex, setOpenIndex] = useState(null)
    const faqsData = [
        {
            question: 'How do I make a hotel booking on your website?',
            answer: 'Simply enter your destination, check-in and check-out dates, and the number of guests in the search bar. Browse available hotels, choose your preferred one, and follow the steps to complete your booking securely online.'
        },
        {
            question: 'Do I need an account to book a hotel?',
            answer: 'No, you can book as a guest. However, creating an account allows you to view booking history, manage reservations easily, and receive exclusive offers.'
        },
        {
            question: 'How do I know if my booking is confirmed?',
            answer: 'Once your booking is complete, you’ll receive a confirmation email with your reservation details and a unique booking ID. You can also check the booking status in your account dashboard.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit and debit cards, UPI, net banking, and digital wallets like Paytm, Google Pay, and PhonePe.'
        },
        {
            question: 'Can I pay at the hotel instead of online?',
            answer: 'Some hotels offer a “Pay at Hotel” option. You’ll see this clearly mentioned during checkout if it’s available.'
        }
    ]
    return (
        <>
            <div className="flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
                <div>
                    <Title
                        title="Frequently Asked Questions"
                        subTitle="Proactively answering FAQs boosts user confidence and cuts down on support tickets."
                    />
                </div>

                <div className="max-w-xl w-full my-18 flex flex-col gap-4 items-center text-center mx-auto">
                    {faqsData.map((faq, index) => (
                        <div key={index} className="flex flex-col items-start w-full">
                            <div
                                className="flex items-center justify-between w-full cursor-pointer border border-indigo-100 p-4 rounded"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <h2 className="text-md">{faq.question}</h2>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`${openIndex === index ? "rotate-180" : ""
                                        } transition-all duration-500 ease-in-out`}
                                >
                                    <path
                                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                                        stroke="#1D293D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <p
                                className={`text-md text-left text-slate-500 px-4 transition-all duration-500 ease-in-out ${openIndex === index
                                    ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                                    : "opacity-0 max-h-0 -translate-y-2"
                                    }`}
                            >
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default HelpCenter;
