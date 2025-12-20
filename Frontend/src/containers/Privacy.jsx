import React, { useEffect } from "react";
import Title from "../components/Title";

const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Privacy & Security - QuickStay";
    }, []);
    return (
        <>
            <div className="flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
                <Title title="Privacy & Security" subTitle="Your privacy is important to us. This policy explains how we handle your personal information." />
                <div className="my-16 text-gray-600">
                    <h1 className="text-3xl font-playfair text-black">Our Policy</h1>
                    <p className="my-3">The privacy and security of your information is very important to us. We have made material changes to the Privacy Policy that apply with respect to information that you provide on or after the date indicated in the “Last Updated” legend above. These changes include:</p>
                    <p className="my-3">(1) Detailed information regarding what personal data and other information we collect from you, how we collect it, and how it is used;</p>
                    <p className="mb-3">(2) Further descriptions of the parties with whom and for what purposes your data is shared.</p>
                    <p className="mb-3">To learn more, please review the full Privacy Policy below.</p>
                    <p>The Parkside Hotel & Spa Ltd. and its affiliates (collectively, “Parkside”, “we”, “our” or “us”) are committed to safeguarding your privacy and want you to be familiar with how we collect, disclose and otherwise use information about you. References in this Privacy Policy to “Parkside,” “we,” “our” or “us” are references to the entity responsible for the processing of your personal data, which generally is the entity that obtains your personal data in the respective case, or the data controller.</p>
                    <h2 className="text-3xl font-playfair text-black my-8">This Privacy Policy describes:</h2>
                    <ul className="list-disc list-outside pl-6 space-y-2">
                        <li>
                            our practices in connection with the information we collect from you when you visit our websites that link to this Privacy Policy (the “Site”), or when you use any applications made available by us on or through computers and mobile devices (the “Apps”),
                        </li>
                        <li>
                            when we communicate with you through e-mail messages that link to this Privacy Policy (collectively, including the Site and Apps, referred to as the “Services”);
                        </li>
                        <li>Your credit card and/or debit card details;</li>
                        <li>Guest stay information, special requests and preferences (including preferred room type or floor, spend, vacation preferences, amenities requested, language preferences, interests, hobbies, ages of children or companions and any other aspects of the Services used), telephone numbers dialed, faxes and telephone messages received;</li>
                        <li>IP addresses,  online user account details or profiles when you log-in to your Parkside account;</li>
                        <li>Social media account information, profile pictures or posts;</li>
                        <li>Information, feedback or content you provide regarding your marketing preferences, in surveys, comment cards, sweepstakes, or promotional offers on our Services and those of third parties;</li>
                        <li>Images and visual recordings through the use of closed circuit television systems collected while visiting The Parkside Hotel & Spa or property, where permitted by applicable law;</li>
                        <li>Conversations, including records or monitoring of guest service calls for quality assurance and training purposes, and other communications such as in-app messages or SMS text messages, where permitted by applicable law or based upon consent;</li>
                    </ul>
                    <h2 className="text-3xl font-playfair text-black my-8"> When is your personal data collected?</h2>
                    <ul className="list-disc list-outside pl-6 space-y-2">
                        <li>When you make reservations, stay at a property or plan or attend an event. Visitors who elect to make reservations using our Services or Offline Services will be asked to supply specific Personal Data, including name, e-mail address and contact information, as well as information to secure the reservation, such as a credit card number. We collect your Personal Data to provide you with services, including when you purchase goods and services, inform us of any requests, or take advantage of services such as concierge services, health clubs and spa treatments, activities, equipment rentals, and child care services. If you plan or host an event with us, we collect meeting and event specifications, such as your name, contact details, date of event, occasion, number of guest rooms required, and length of stay. We also collect information about guests that are a part of your group or event.</li>
                        <li>When you sign up for promotional offers and sweepstakes. We collect your e-mail address when you sign up for promotional offers, newsletters or sweepstakes.</li>
                        <li>When you provide your comments and feedback or communicate with us. We may collect Personal Data that you voluntarily share with us in surveys, guest feedback or comment cards, as well as on third-party websites. We also collect your Personal Data when you communicate with us via text or e-mail or otherwise, like WhatsApp.</li>
                        <li>When you share photos. We collect and publish photos and images you voluntarily share with us about your experience with us, which you may post on our Services.</li>
                    </ul>
                </div>

            </div >
        </>
    )
};

export default Privacy;
