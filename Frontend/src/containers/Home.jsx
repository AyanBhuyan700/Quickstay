import React, { useEffect } from "react";
import Hero from "../components/Hero";
import FeaturedDestination from "../components/FeaturedDestination";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Testimonials from "../components/Testimonials";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
    useEffect(() => {
        document.title = "Home - QuickStay";
    }, [])
    return (
        <>
            <Hero />
            <FeaturedDestination />
            <ExclusiveOffers />
            <Testimonials />
            <NewsLetter />
        </>
    )
};

export default Home;
