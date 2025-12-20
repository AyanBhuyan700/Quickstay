import React, { useEffect } from "react";
import Title from "../components/Title";

const Accessibility = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Accessibility - QuickStay";
    }, []);
    return (
        <>
            <div className="flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 ">
                <Title title="Accessibility" subTitle="The QuickStay Commitment to Digital Accessibility" />
                <div className="lg:flex-row-reverse relative mt-10">
                    <img className="object-cover rounded-lg shadow-lg" loading="lazy" src="https://www.marriott.com/content/dam/marriott-digital/jw/emea/hws/d/dxbjw/en_us/photo/unlimited/assets/dxbjw-exterior-0209.jpg.transform/mcom-hp-transform-2880x960/image.jpg" />
                    <p className="absolute top-30 left-15 font-playfair text-white text-5xl">Digital Accessibility</p>
                </div>
                <div className="mt-10">
                    <h1 className="text-5xl font-playfair">The Commitment to Digital Accessibility</h1>
                    <h3 className="font-Outfit text-3xl mt-2">An Equal Experience for All</h3>
                    <p className="text-gray-600 mt-2">Marriott is dedicated to providing an equivalent digital experience for our guests, regardless of physical or cognitive ability. To uphold our commitment, we adhere to the Website Content Accessibility Guidelines (WCAG 2.1 to level AA) in the design, testing and development of our global digital experiences. This helps ensure our content is available to all – including those who rely on assistive technology.</p>
                    <p className="my-4 text-gray-600">Our digital standards, design and development teams regularly collaborate to ensure we follow accessibility best practices and we advocate for accessibility and digital equality.</p>
                </div>
                <div>
                    <h2 className="text-4xl font-playfair">We’re Here for You 24/7</h2>
                    <p className="mt-3 mb-10 text-gray-600">If you are having difficulty using this website because of a disability or have an issue to report, we are here to receive your feedback and provide you with access to all of the information and functionality on this website. Please call our Customer Engagement Centers by consulting our worldwide telephone reservations page.</p>
                </div>
            </div>
        </>
    )
};

export default Accessibility;
