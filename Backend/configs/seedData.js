import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import User from '../models/User.js';

export const seedInitialData = async () => {
    try {
        console.log("Populating rich hotel and room catalog into MongoDB...");

        // 1. Verified Host / Owner Accounts
        const ownersData = [
            {
                _id: "user_2unqyL4diJFP1E3pIBnasc7w8hP",
                username: "Urbanza Luxury Hospitality",
                email: "hospitality@urbanza.com",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
                role: "hotelOwner",
                recentSearchedCities: ["New York", "Dubai", "London", "Singapore"],
            },
            {
                _id: "user_dubai_palace_host",
                username: "Emirates Royal Stays",
                email: "concierge@emiratesroyal.ae",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
                role: "hotelOwner",
                recentSearchedCities: ["Dubai", "Singapore"],
            },
            {
                _id: "user_london_heritage_host",
                username: "British Crown Hospitality",
                email: "bookings@crownhospitality.co.uk",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
                role: "hotelOwner",
                recentSearchedCities: ["London"],
            },
            {
                _id: "user_singapore_sanctuary_host",
                username: "Marina Pacific Hotels Group",
                email: "reservations@marinapacific.sg",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
                role: "hotelOwner",
                recentSearchedCities: ["Singapore"],
            }
        ];

        for (const owner of ownersData) {
            await User.findByIdAndUpdate(owner._id, owner, { upsert: true, new: true });
        }

        // 2. Iconic Hotels Catalog (New York, Dubai, Singapore, London)
        const hotelsData = [
            // --- NEW YORK ---
            {
                _id: "67f76393197ac559e4089b72",
                name: "Urbanza Suites Manhattan",
                address: "123 5th Avenue, Midtown Manhattan",
                contact: "+1 212 555 0198",
                owner: "user_2unqyL4diJFP1E3pIBnasc7w8hP",
                city: "New York",
                description: "Centrally located luxury boutique suites featuring breathtaking skyline views of the Empire State Building and 5th Avenue.",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
                rating: 4.8,
            },
            {
                _id: "67f76393197ac559e4089b76",
                name: "The Central Park Grand Horizon",
                address: "768 5th Ave, Central Park South",
                contact: "+1 212 759 3000",
                owner: "user_2unqyL4diJFP1E3pIBnasc7w8hP",
                city: "New York",
                description: "Overlooking lush Central Park greenery, offering marble bathrooms, 24-hour white glove butler service, and private spa.",
                image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000",
                rating: 4.9,
            },

            // --- DUBAI ---
            {
                _id: "67f76393197ac559e4089b73",
                name: "The Royal Palm Resort & Beach Club",
                address: "Crescent Road, The Palm Jumeirah",
                contact: "+971 4 888 3456",
                owner: "user_dubai_palace_host",
                city: "Dubai",
                description: "A private beachfront paradise on the iconic Palm island with infinity lagoons, private cabanas, and Michelin-starred dining.",
                image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000",
                rating: 4.9,
            },
            {
                _id: "67f76393197ac559e4089b77",
                name: "Burj Skyline Oasis Palace",
                address: "Financial Centre Road, Downtown Dubai",
                contact: "+971 4 362 7500",
                owner: "user_dubai_palace_host",
                city: "Dubai",
                description: "Ultra-luxury high-rise retreat towering over Downtown Dubai with panoramic views of the Dubai Fountain and Burj Khalifa.",
                image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000",
                rating: 4.95,
            },

            // --- SINGAPORE ---
            {
                _id: "67f76393197ac559e4089b74",
                name: "Marina Bay Skyline Sanctuary",
                address: "10 Bayfront Avenue, Marina Bay",
                contact: "+65 6688 8868",
                owner: "user_singapore_sanctuary_host",
                city: "Singapore",
                description: "Iconic architectural masterpiece with the world's most renowned rooftop infinity pool, sky gardens, and waterfront promenades.",
                image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1000",
                rating: 4.9,
            },
            {
                _id: "67f76393197ac559e4089b78",
                name: "The Sentosa Cove Rainforest Villas",
                address: "1 The Knolls, Sentosa Island",
                contact: "+65 6591 5000",
                owner: "user_singapore_sanctuary_host",
                city: "Singapore",
                description: "Nestled in tranquil tropical rainforest meeting the South China Sea, boasting heritage colonial manor houses and private plunge pools.",
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000",
                rating: 4.85,
            },

            // --- LONDON ---
            {
                _id: "67f76393197ac559e4089b75",
                name: "The Westminster Heritage Hotel",
                address: "Broad Sanctuary, Westminster",
                contact: "+44 20 7222 5678",
                owner: "user_london_heritage_host",
                city: "London",
                description: "Historic Victorian grandeur right next to Big Ben and Westminster Abbey. Traditional afternoon tea, velvet suites, and fireplace lounges.",
                image: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=1000",
                rating: 4.75,
            },
            {
                _id: "67f76393197ac559e4089b79",
                name: "The Kensington Royal Boutique Hotel",
                address: "Queen's Gate, South Kensington",
                contact: "+44 20 7584 7799",
                owner: "user_london_heritage_host",
                city: "London",
                description: "Stately Georgian townhouse living minutes from Royal Albert Hall and Hyde Park, featuring bespoke art collections and secret garden terraces.",
                image: "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1000",
                rating: 4.8,
            }
        ];

        for (const h of hotelsData) {
            await Hotel.findByIdAndUpdate(h._id, h, { upsert: true, new: true });
        }

        // 3. Complete Room Catalog across all price tiers and types
        const roomsData = [
            // --- NEW YORK (Urbanza Suites Manhattan) ---
            {
                _id: "67f7647c197ac559e4089b96",
                hotel: "67f76393197ac559e4089b72",
                roomType: "Double Bed",
                pricePerNight: 399,
                amenities: ["Room Service", "Mountain View", "Pool Access", "Free WiFi"],
                images: [
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000"
                ],
                isAvailable: true,
            },
            {
                _id: "67f76452197ac559e4089b8e",
                hotel: "67f76393197ac559e4089b72",
                roomType: "Double Bed",
                pricePerNight: 299,
                amenities: ["Room Service", "Free Breakfast", "Pool Access"],
                images: [
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000"
                ],
                isAvailable: true,
            },
            {
                _id: "67f763d8197ac559e4089b7a",
                hotel: "67f76393197ac559e4089b72",
                roomType: "Single Bed",
                pricePerNight: 199,
                amenities: ["Free WiFi", "Room Service", "Pool Access"],
                images: [
                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000"
                ],
                isAvailable: true,
            },

            // --- NEW YORK (The Central Park Grand Horizon) ---
            {
                _id: "67f7647c197ac559e4089b80",
                hotel: "67f76393197ac559e4089b76",
                roomType: "Luxury Room",
                pricePerNight: 650,
                amenities: ["Mountain View", "Room Service", "Free Breakfast", "Free WiFi"],
                images: [
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000"
                ],
                isAvailable: true,
            },
            {
                _id: "67f7647c197ac559e4089b81",
                hotel: "67f76393197ac559e4089b76",
                roomType: "Family Suite",
                pricePerNight: 1100,
                amenities: ["Room Service", "Free Breakfast", "Pool Access", "Free WiFi"],
                images: [
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000",
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000",
                    "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000"
                ],
                isAvailable: true,
            },

            // --- DUBAI (The Royal Palm Resort & Beach Club) ---
            {
                _id: "67f7647c197ac559e4089c01",
                hotel: "67f76393197ac559e4089b73",
                roomType: "Luxury Room",
                pricePerNight: 799,
                amenities: ["Room Service", "Pool Access", "Free WiFi", "Free Breakfast"],
                images: [
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000",
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000",
                    "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000"
                ],
                isAvailable: true,
            },
            {
                _id: "67f7647c197ac559e4089c02",
                hotel: "67f76393197ac559e4089b73",
                roomType: "Family Suite",
                pricePerNight: 1450,
                amenities: ["Pool Access", "Free Breakfast", "Room Service", "Free WiFi", "Mountain View"],
                images: [
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000",
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000",
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000"
                ],
                isAvailable: true,
            },

            // --- DUBAI (Burj Skyline Oasis Palace) ---
            {
                _id: "67f7647c197ac559e4089c10",
                hotel: "67f76393197ac559e4089b77",
                roomType: "Luxury Room",
                pricePerNight: 890,
                amenities: ["Room Service", "Pool Access", "Free WiFi"],
                images: [
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000"
                ],
                isAvailable: true,
            },
            {
                _id: "67f7647c197ac559e4089c11",
                hotel: "67f76393197ac559e4089b77",
                roomType: "Double Bed",
                pricePerNight: 550,
                amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
                images: [
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000"
                ],
                isAvailable: true,
            },

            // --- SINGAPORE (Marina Bay Skyline Sanctuary) ---
            {
                _id: "67f7647c197ac559e4089c03",
                hotel: "67f76393197ac559e4089b74",
                roomType: "Luxury Room",
                pricePerNight: 850,
                amenities: ["Pool Access", "Free WiFi", "Room Service"],
                images: [
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000"
                ],
                isAvailable: true,
            },
            {
                _id: "67f7647c197ac559e4089c04",
                hotel: "67f76393197ac559e4089b74",
                roomType: "Double Bed",
                pricePerNight: 480,
                amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
                images: [
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000"
                ],
                isAvailable: true,
            },

            // --- SINGAPORE (The Sentosa Cove Rainforest Villas) ---
            {
                _id: "67f7647c197ac559e4089c15",
                hotel: "67f76393197ac559e4089b78",
                roomType: "Family Suite",
                pricePerNight: 1350,
                amenities: ["Pool Access", "Free Breakfast", "Room Service", "Mountain View"],
                images: [
                    "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000",
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000",
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000"
                ],
                isAvailable: true,
            },

            // --- LONDON (The Westminster Heritage Hotel) ---
            {
                _id: "67f7647c197ac559e4089c05",
                hotel: "67f76393197ac559e4089b75",
                roomType: "Luxury Room",
                pricePerNight: 620,
                amenities: ["Free Breakfast", "Free WiFi", "Room Service"],
                images: [
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000"
                ],
                isAvailable: true,
            },
            {
                _id: "67f7647c197ac559e4089c06",
                hotel: "67f76393197ac559e4089b75",
                roomType: "Single Bed",
                pricePerNight: 210,
                amenities: ["Free WiFi", "Room Service"],
                images: [
                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000"
                ],
                isAvailable: true,
            },

            // --- LONDON (The Kensington Royal Boutique Hotel) ---
            {
                _id: "67f7647c197ac559e4089c20",
                hotel: "67f76393197ac559e4089b79",
                roomType: "Double Bed",
                pricePerNight: 360,
                amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
                images: [
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000"
                ],
                isAvailable: true,
            },
            {
                _id: "67f7647c197ac559e4089c21",
                hotel: "67f76393197ac559e4089b79",
                roomType: "Luxury Room",
                pricePerNight: 580,
                amenities: ["Room Service", "Free WiFi", "Free Breakfast"],
                images: [
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000"
                ],
                isAvailable: true,
            }
        ];

        for (const roomData of roomsData) {
            await Room.findByIdAndUpdate(roomData._id, roomData, { upsert: true, new: true });
        }

        console.log(`Database populated with ${hotelsData.length} world-class hotels and ${roomsData.length} rooms across New York, Dubai, Singapore, and London!`);
    } catch (error) {
        console.warn("Seeding initial data note:", error.message);
    }
};

export default seedInitialData;
