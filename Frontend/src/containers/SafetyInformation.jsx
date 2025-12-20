import React, { useEffect } from "react";
import Title from "../components/Title";

const SafetyInformation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Safety Information - QuickStay";
  }, []);
  return (
    <>
      <div className="flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
        <Title title="Safety Information" subTitle="We've missed you and can’t wait to welcome your next meeting or event to one of our sustainable sanctuaries." />
        <div className="mt-18">
          <img src="https://cdn.bfldr.com/TU9NUD0C/at/cnnrsjg44crwzg46b8qb38h/meadowrue_socialspace_bar_327.jpg?format=jpg&auto=webp&drupal-image-style=showcase&width=1920&height=1080&precrop=6720%2C3780%2Cx0%2Cy350%2Csafe&h=2992ba0a&itok=GHhqjuox" />
        </div>
        <div className="mt-10">
          <h1 className="text-4xl font-playfair">Gathering Safely</h1>
          <h3 className="font-Outfit text-2xl mt-2">To our 1 Hotels community</h3>
          <p className="text-gray-600 mt-2"> Hotels was brought to life with an intentional vision to honor and protect the natural world while providing you, our cherished guests, with an unparalleled luxury experience. In light of our vision, the journey of the COVID-19 pandemic sparked a noticeable and necessary evolution of our DNA and operations. In order to safely and cautiously welcome you and our team back to our properties, we constructed a sanitation plan that considers the complete guest experience and utilizes enhanced health and safety protocols in accordance with local health authorities.</p>
          <p className="my-4 text-gray-600">As we emerge from the pandemic together, we want you, our family, to feel peace of mind knowing that these safety and sanitation practices remain robust — and the warm, nostalgic feeling that greets you at our doors never left.</p>
        </div>
        <div>
          <h2 className="text-4xl font-playfair">Your Arrival</h2>
          <p className="mt-3 mb-10 text-gray-600">Enjoy enhanced technology for hybrid meetings, including video conferencing, streaming capabilities, and increased bandwidth. We offer contactless guest services including check-in, mobile key, television controls, menu ordering and payment, service requests, concierge support, front desk text messaging and check out (service availability may vary by property and stay dates). </p>
        </div>
      </div>
    </>
  )
};

export default SafetyInformation;
