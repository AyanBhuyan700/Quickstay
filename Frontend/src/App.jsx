import Navbar from "./components/Navbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./containers/Home";
import Footer from "./components/Footer";
import AllRooms from "./containers/AllRooms";
import RoomDetails from "./containers/RoomDetails";
import Offers from "./containers/Offers";
import Experience from "./containers/Experience";
import About from "./containers/About";
import Contact from "./containers/Contact";
import Accessibility from "./containers/Accessibility";
import Career from "./containers/Career";
import Partner from "./containers/Partner";
import HelpCenter from "./containers/HelpCenter";
import SafetyInformation from "./containers/SafetyInformation";
import Cancellation from "./containers/Cancellation";
import MyBookings from "./containers/MyBookings";
import Privacy from "./containers/Privacy";
import Terms from "./containers/Terms";
import HotelReg from "./containers/HotelReg";
import Layout from "./containers/hotelOwner/Layout";
import Dashboard from "./containers/hotelOwner/Dashboard";
import AddRoom from "./containers/hotelOwner/AddRoom";
import ListRoom from "./containers/hotelOwner/ListRoom";
import { useApp } from "./context/AppContext";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { isHotelRegOpen = false } = useApp() || {};

  return (
    <>
      {!isOwnerPath && <Navbar />}
      {isHotelRegOpen && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/experiences" element={<Experience />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/career" element={<Career />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/safety" element={<SafetyInformation />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/owner" element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
