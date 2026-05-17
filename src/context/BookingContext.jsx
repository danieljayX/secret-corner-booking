import { createContext, useState, useEffect } from 'react';

export const BookingContext = createContext();

const initialPackages = [
  // Mobile Bar
  {
    id: 'basic',
    category: 'mobile_bar',
    name: 'BASIC',
    price: 5999,
    features: ['30 Cups', '2 Drinks', 'Basic Setup'],
    colorClass: 'text-pink-500',
    borderClass: 'border-pink-500/30',
    shadowClass: 'shadow-[0_0_15px_rgba(236,72,153,0.2)]',
    bgClass: 'bg-pink-500/10'
  },
  {
    id: 'standard',
    category: 'mobile_bar',
    name: 'STANDARD',
    price: 9999,
    features: ['50 Cups', '3 Drinks', 'Styled Setup'],
    colorClass: 'text-cyan-400',
    borderClass: 'border-cyan-400/30',
    shadowClass: 'shadow-[0_0_15px_rgba(34,211,238,0.2)]',
    bgClass: 'bg-cyan-400/10'
  },
  {
    id: 'premium',
    category: 'mobile_bar',
    name: 'PREMIUM',
    price: 14999,
    features: ['100 Cups', '4-5 Drinks', 'Full Setup + Staff'],
    colorClass: 'text-yellow-400',
    borderClass: 'border-yellow-400/30',
    shadowClass: 'shadow-[0_0_15px_rgba(250,204,21,0.2)]',
    bgClass: 'bg-yellow-400/10'
  },
  {
    id: 'deluxe',
    category: 'mobile_bar',
    name: 'DELUXE',
    price: 24999,
    features: ['150-200 Cups', 'Unlimited Drinks', 'Premium Experience'],
    colorClass: 'text-green-400',
    borderClass: 'border-green-400/30',
    shadowClass: 'shadow-[0_0_15px_rgba(74,222,128,0.2)]',
    bgClass: 'bg-green-400/10'
  },
  // Coffee Bar
  {
    id: 'c_basic',
    category: 'coffee_bar',
    name: 'BASIC',
    price: 5999,
    features: ['30 Cups', '2 Coffee Choices', 'Basic Setup'],
    colorClass: 'text-pink-500',
    borderClass: 'border-pink-500/30',
    shadowClass: 'shadow-[0_0_15px_rgba(236,72,153,0.2)]',
    bgClass: 'bg-pink-500/10'
  },
  {
    id: 'c_standard',
    category: 'coffee_bar',
    name: 'STANDARD',
    price: 9999,
    features: ['50 Cups', '3 Coffee Choices', 'Styled Coffee Bar Setup'],
    colorClass: 'text-cyan-400',
    borderClass: 'border-cyan-400/30',
    shadowClass: 'shadow-[0_0_15px_rgba(34,211,238,0.2)]',
    bgClass: 'bg-cyan-400/10'
  },
  {
    id: 'c_premium',
    category: 'coffee_bar',
    name: 'PREMIUM',
    price: 14999,
    features: ['100 Cups', '4-5 Coffee Choices', 'Full Setup + Barista'],
    colorClass: 'text-yellow-400',
    borderClass: 'border-yellow-400/30',
    shadowClass: 'shadow-[0_0_15px_rgba(250,204,21,0.2)]',
    bgClass: 'bg-yellow-400/10'
  },
  {
    id: 'c_deluxe',
    category: 'coffee_bar',
    name: 'DELUXE',
    price: 24999,
    features: ['150-200 Cups', 'Unlimited Coffee Options', 'Premium Setup + 2 Baristas'],
    colorClass: 'text-green-400',
    borderClass: 'border-green-400/30',
    shadowClass: 'shadow-[0_0_15px_rgba(74,222,128,0.2)]',
    bgClass: 'bg-green-400/10'
  },
  // Pica Pica
  {
    id: 'p_basic',
    category: 'pica_pica',
    name: 'BASIC',
    price: 4999,
    features: ['30-40 Pax', 'Assorted Meat Dishes', 'Fries/Chips', 'Kakanin', 'Sweets'],
    colorClass: 'text-pink-500',
    borderClass: 'border-pink-500/30',
    shadowClass: 'shadow-[0_0_15px_rgba(236,72,153,0.2)]',
    bgClass: 'bg-pink-500/10'
  },
  {
    id: 'p_standard',
    category: 'pica_pica',
    name: 'STANDARD',
    price: 7999,
    features: ['50-60 Pax', 'Assorted Meat Dishes', 'Fries/Chips', 'Shooters', 'Sweets'],
    colorClass: 'text-cyan-400',
    borderClass: 'border-cyan-400/30',
    shadowClass: 'shadow-[0_0_15px_rgba(34,211,238,0.2)]',
    bgClass: 'bg-cyan-400/10'
  },
  {
    id: 'p_premium',
    category: 'pica_pica',
    name: 'PREMIUM',
    price: 14999,
    features: ['100 Pax', 'Assorted Meat Dishes', 'Fries/Chips', 'Shooters & Seafood', 'Sweets'],
    colorClass: 'text-yellow-400',
    borderClass: 'border-yellow-400/30',
    shadowClass: 'shadow-[0_0_15px_rgba(250,204,21,0.2)]',
    bgClass: 'bg-yellow-400/10'
  },
  {
    id: 'p_deluxe',
    category: 'pica_pica',
    name: 'DELUXE',
    price: 11999,
    features: ['70-80 Pax', 'Assorted Meat Dishes', 'Fries/Chips', 'Shooters & Seafood', 'Sweets'],
    colorClass: 'text-green-400',
    borderClass: 'border-green-400/30',
    shadowClass: 'shadow-[0_0_15px_rgba(74,222,128,0.2)]',
    bgClass: 'bg-green-400/10'
  }
];

export function BookingProvider({ children }) {
  const [currentBooking, setCurrentBooking] = useState(null);
  const loading = false;

  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('packages');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0 && !parsed[0].category) {
        localStorage.removeItem('packages');
        return initialPackages;
      }
      return parsed;
    }
    return initialPackages;
  });

  const [bookedDates, setBookedDates] = useState(() => {
    const saved = localStorage.getItem('bookedDates');
    return saved ? JSON.parse(saved) : [];
  });

  const [myBookings, setMyBookings] = useState(() => {
    const saved = localStorage.getItem('myBookings');
    if (saved) return JSON.parse(saved);
    
    // Default dummy data matching the user's design image
    return [
      {
        id: 1,
        customerName: 'Juan Dela Cruz',
        eventName: 'Beach Resort',
        packageName: 'MOBILE BAR: PREMIUM',
        packagePrice: 14999,
        location: 'Beach Resort, Mactan',
        date: '2024-05-20',
        time: '14:00',
        status: 'Confirmed',
        customerPhone: '09123456789',
        socialLink: 'https://facebook.com/juandelacruz'
      },
      {
        id: 2,
        customerName: 'Maria Santos',
        eventName: 'City Hotel',
        packageName: 'COFFEE BAR: STANDARD',
        packagePrice: 9999,
        location: 'City Hotel, Cebu City',
        date: '2024-05-21',
        time: '15:00',
        status: 'Pending',
        customerPhone: '09223334444',
        socialLink: 'https://instagram.com/mariasantos'
      },
      {
        id: 3,
        customerName: 'Robert Garcia',
        eventName: 'Mountain Cabin',
        packageName: 'PICA PICA: DELUXE',
        packagePrice: 11999,
        location: 'Mountain Cabin, Busay',
        date: '2024-05-18',
        time: '11:00',
        status: 'Declined',
        customerPhone: '09445556666',
        socialLink: 'https://facebook.com/robertgarcia'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('bookedDates', JSON.stringify(bookedDates));
  }, [bookedDates]);

  useEffect(() => {
    localStorage.setItem('myBookings', JSON.stringify(myBookings));
  }, [myBookings]);

  const confirmBooking = (bookingDetails) => {
    const newBooking = {
      ...bookingDetails,
      id: Date.now(),
      status: 'Pending',
      created_at: new Date().toISOString()
    };
    setMyBookings([newBooking, ...myBookings]);
    setBookedDates([...bookedDates, bookingDetails.date]);
    setCurrentBooking(null);
  };

  const updateBookingStatus = (id, newStatus) => {
    setMyBookings(prev => prev.map(booking => {
      if (booking.id === id) {
        if (newStatus === 'Declined' || newStatus === 'Cancelled') {
          setBookedDates(dates => dates.filter(date => date !== booking.date));
        }
        return { ...booking, status: newStatus };
      }
      return booking;
    }));
  };

  const editBooking = (id, updatedBooking) => {
    setMyBookings(prev => prev.map(booking => {
      if (booking.id === id) {
        if (booking.date !== updatedBooking.date) {
          setBookedDates(dates => [...dates.filter(d => d !== booking.date), updatedBooking.date]);
        }
        return updatedBooking;
      }
      return booking;
    }));
  };

  const updatePackage = (id, updatedData) => {
    setPackages(prev => prev.map(pkg => pkg.id === id ? { ...pkg, ...updatedData } : pkg));
  };

  const deleteBooking = async (id) => {
    try {
      const updated = myBookings.filter(b => b.id !== id);
      setMyBookings(updated);
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  return (
    <BookingContext.Provider value={{
      currentBooking,
      setCurrentBooking,
      confirmBooking,
      myBookings,
      updateBookingStatus,
      editBooking,
      deleteBooking,
      bookedDates,
      loading,
      packages,
      updatePackage
    }}>
      {children}
    </BookingContext.Provider>
  );
}
