import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className='bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
                <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                    <div className='max-w-80'>
                        <img src={assets.logo} alt="logo" className='mb-4 h-8 md:h-9 invert opacity-80' />
                        <p className='text-sm'>
                            Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private islands.
                        </p>
                        <div className='flex items-center gap-3 mt-4'>
                            {/* Instagram */}
                            <Link to="https://www.instagram.com/ayanbhuyan04/?hl=en" target="_blank">
                                <img src={assets.instagramIcon} alt="instagram" className="w-6" />
                            </Link>
                            {/* Facebook */}
                            <Link to="https://www.facebook.com/" target="_blank">
                            <img src={assets.facebookIcon} alt="facebook" className="w-6" />
                            </Link>
                            {/* Twitter */}
                            <Link to="https://x.com/AyanBhuyan3" target="_blank">
                                <img src={assets.twitterIcon} alt="twitter" className="w-6" />
                            </Link>
                            {/* LinkedIn */}
                            <Link to="https://www.linkedin.com/in/ayan-bhuyan-2a957a231/" target="_blank">
                                <img src={assets.linkendinIcon} alt="linkedin" className="w-6" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <p className='font-playfair text-lg text-gray-800'>COMPANY</p>
                        <ul className='mt-3 flex flex-col gap-2 text-sm'>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/career">Careers</Link></li>
                            <li><Link to="/partner">Partners</Link></li>
                            <li><Link to="/safety">Safety Information</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className='font-playfair text-lg text-gray-800'>SUPPORT</p>
                        <ul className='mt-3 flex flex-col gap-2 text-sm'>
                            <li><Link to="/help">Help Center</Link></li>
                            <li><Link to="/cancellation">Cancellation Options</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/accessibility">Accessibility</Link></li>
                        </ul>
                    </div>

                    <div className='max-w-80'>
                        <p className='font-playfair text-lg text-gray-800'>STAY UPDATED</p>
                        <p className='mt-3 text-sm'>
                            Subscribe to our newsletter for inspiration and special offers.
                        </p>
                        <div className='flex items-center mt-4'>
                            <input type="text" className='bg-white rounded-l border border-gray-300 h-9 px-3 outline-none' placeholder='Your email' />
                            <button className='flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r'>
                                {/* Arrow icon */}
                                <img src={assets.arrowIcon} alt="arrow" className="w-3.5 invert" />
                            </button>
                        </div>
                    </div>
                </div>
                <hr className='border-gray-300 mt-8' />
                <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                    <p>© {new Date().getFullYear()} QuickStay.All rights reserved.</p>
                    <ul className='flex items-center gap-4'>
                        <li><Link to="/privacy">Privacy</Link></li>
                        <li><Link to="/terms-and-conditions">Terms</Link></li>
                    </ul>
                </div>
            </div >
        </>
    )
};

export default Footer;
