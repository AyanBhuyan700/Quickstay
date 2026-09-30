import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { roomsDummyData, userBookingsDummyData } from '../assets/assets';
import toast from 'react-hot-toast';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8081';
    const backendUrl = rawBackendUrl.replace(/\/+$/, '');
    const { getToken, isSignedIn } = useAuth();
    const { user } = useUser();

    const [rooms, setRooms] = useState([]);
    const [loadingRooms, setLoadingRooms] = useState(true);
    const [isHotelRegOpen, setIsHotelRegOpen] = useState(false);
    const [userRole, setUserRole] = useState('user');
    const [ownerHotel, setOwnerHotel] = useState(null);
    const [userBookings, setUserBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(false);

    // Helper to get auth header with Clerk token
    const getAuthHeaders = async () => {
        try {
            const token = await getToken();
            return token ? { Authorization: `Bearer ${token}` } : {};
        } catch (err) {
            return {};
        }
    };

    // Fetch all public rooms with optional query filters
    const fetchRooms = async (params = {}) => {
        setLoadingRooms(true);
        try {
            const query = new URLSearchParams();
            if (params.city) query.append('city', params.city);
            if (params.roomType) query.append('roomType', params.roomType);
            if (params.minPrice) query.append('minPrice', params.minPrice);
            if (params.maxPrice) query.append('maxPrice', params.maxPrice);
            if (params.sort) query.append('sort', params.sort);
            if (params.search) query.append('search', params.search);

            const res = await axios.get(`${backendUrl}/api/room/all?${query.toString()}`);
            if (res.data.success && res.data.rooms && res.data.rooms.length > 0) {
                setRooms(res.data.rooms);
            } else {
                // If API returns empty, use dummy data filtered as fallback
                setRooms(roomsDummyData);
            }
        } catch (error) {
            console.warn('Backend rooms fetch error, using fallback data:', error.message);
            setRooms(roomsDummyData);
        } finally {
            setLoadingRooms(false);
        }
    };

    // Check user role and owner hotel from backend
    const fetchUserData = async () => {
        if (!isSignedIn) {
            setUserRole('user');
            setOwnerHotel(null);
            return;
        }

        try {
            const headers = await getAuthHeaders();
            const res = await axios.get(`${backendUrl}/api/user/get`, { headers });
            if (res.data.success) {
                setUserRole(res.data.role || 'user');
                if (res.data.role === 'hotelOwner') {
                    const hotelRes = await axios.get(`${backendUrl}/api/hotel/owner-hotel`, { headers });
                    if (hotelRes.data.success) {
                        setOwnerHotel(hotelRes.data.hotel);
                    }
                }
            }
        } catch (error) {
            console.warn('User data fetch error:', error.message);
        }
    };

    // Fetch user bookings
    const fetchUserBookings = async () => {
        if (!isSignedIn) {
            setUserBookings([]);
            return;
        }
        setLoadingBookings(true);
        try {
            const headers = await getAuthHeaders();
            const res = await axios.get(`${backendUrl}/api/booking/user-bookings`, { headers });
            if (res.data.success && res.data.bookings) {
                setUserBookings(res.data.bookings);
            } else {
                setUserBookings(userBookingsDummyData);
            }
        } catch (error) {
            console.warn('Bookings fetch error, using dummy data:', error.message);
            setUserBookings(userBookingsDummyData);
        } finally {
            setLoadingBookings(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    useEffect(() => {
        if (isSignedIn) {
            fetchUserData();
            fetchUserBookings();
        } else {
            setUserRole('user');
            setOwnerHotel(null);
            setUserBookings([]);
        }
    }, [isSignedIn, user]);

    const value = {
        backendUrl,
        rooms,
        setRooms,
        loadingRooms,
        fetchRooms,
        isHotelRegOpen,
        setIsHotelRegOpen,
        userRole,
        setUserRole,
        ownerHotel,
        setOwnerHotel,
        userBookings,
        setUserBookings,
        loadingBookings,
        fetchUserBookings,
        fetchUserData,
        getAuthHeaders,
        isOwner: userRole === 'hotelOwner',
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
