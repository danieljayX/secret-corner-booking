import { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

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
  const [loading, setLoading] = useState(true);

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

  const [bookedDates, setBookedDates] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  // Fetch bookings on mount from Supabase
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setMyBookings(data || []);
        
        // Populate booked dates (exclude declined or cancelled ones)
        const dates = (data || [])
          .filter(b => b.status !== 'Declined' && b.status !== 'Cancelled')
          .map(b => b.date)
          .filter(Boolean);
        setBookedDates([...new Set(dates)]);
      } catch (err) {
        console.error('Error fetching bookings from Supabase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    localStorage.setItem('packages', JSON.stringify(packages));
  }, [packages]);

  const confirmBooking = async (bookingDetails) => {
    try {
      setLoading(true);

      // Use raw SQL to bypass schema cache issues
      const sql = `
        INSERT INTO public.bookings (
          customerName, eventName, packageName, packagePrice, location, 
          date, time, status, customerPhone, socialLink, specialRequests
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
        )
        RETURNING *;
      `;

      const { data, error } = await supabase.rpc('exec_sql', {
        sql: sql,
        params: [
          bookingDetails.customerName,
          bookingDetails.eventName,
          bookingDetails.packageName,
          bookingDetails.packagePrice,
          bookingDetails.location,
          bookingDetails.date,
          bookingDetails.time,
          'Pending',
          bookingDetails.customerPhone,
          bookingDetails.socialLink,
          bookingDetails.specialRequests || ''
        ]
      }).catch(async () => {
        // Fallback: try regular insert method
        const newBooking = {
          customerName: bookingDetails.customerName,
          eventName: bookingDetails.eventName,
          packageName: bookingDetails.packageName,
          packagePrice: bookingDetails.packagePrice,
          location: bookingDetails.location,
          date: bookingDetails.date,
          time: bookingDetails.time,
          status: 'Pending',
          customerPhone: bookingDetails.customerPhone,
          socialLink: bookingDetails.socialLink,
          specialRequests: bookingDetails.specialRequests || ''
        };

        return await supabase
          .from('bookings')
          .insert([newBooking])
          .select()
          .single();
      });

      if (error) throw error;

      // Create local booking object from response
      const insertedBooking = data?.[0] || {
        id: Date.now(),
        customerName: bookingDetails.customerName,
        eventName: bookingDetails.eventName,
        packageName: bookingDetails.packageName,
        packagePrice: bookingDetails.packagePrice,
        location: bookingDetails.location,
        date: bookingDetails.date,
        time: bookingDetails.time,
        status: 'Pending',
        customerPhone: bookingDetails.customerPhone,
        socialLink: bookingDetails.socialLink,
        specialRequests: bookingDetails.specialRequests || ''
      };

      setMyBookings(prev => [insertedBooking, ...prev]);
      setBookedDates(prev => [...new Set([...prev, insertedBooking.date])]);
      setCurrentBooking(null);
    } catch (err) {
      console.error('Error saving booking to Supabase:', err);
      const errorMsg = err?.message || err?.error_description || 'Unknown error';
      const detailedMsg = `Failed to save booking: ${errorMsg}`;
      console.error('Detailed error:', detailedMsg);
      alert(detailedMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setMyBookings(prev => prev.map(booking => {
        if (booking.id === id) {
          if (newStatus === 'Declined' || newStatus === 'Cancelled') {
            setBookedDates(dates => dates.filter(date => date !== booking.date));
          } else if (newStatus === 'Confirmed' || newStatus === 'Pending') {
            setBookedDates(dates => [...new Set([...dates, booking.date])]);
          }
          return { ...booking, status: newStatus };
        }
        return booking;
      }));
    } catch (err) {
      console.error('Error updating booking status in Supabase:', err);
    }
  };

  const editBooking = async (id, updatedBooking) => {
    try {
      const dbBooking = {
        customerName: updatedBooking.customerName,
        eventName: updatedBooking.eventName,
        location: updatedBooking.location,
        date: updatedBooking.date,
        time: updatedBooking.time,
        specialRequests: updatedBooking.specialRequests || '',
        customerPhone: updatedBooking.customerPhone,
        socialLink: updatedBooking.socialLink
      };

      const { error } = await supabase
        .from('bookings')
        .update(dbBooking)
        .eq('id', id);

      if (error) throw error;

      setMyBookings(prev => prev.map(booking => {
        if (booking.id === id) {
          if (booking.date !== updatedBooking.date) {
            setBookedDates(dates => {
              const filtered = dates.filter(d => d !== booking.date);
              if (updatedBooking.status !== 'Declined' && updatedBooking.status !== 'Cancelled') {
                filtered.push(updatedBooking.date);
              }
              return [...new Set(filtered)];
            });
          }
          return { ...booking, ...updatedBooking };
        }
        return booking;
      }));
    } catch (err) {
      console.error('Error updating booking in Supabase:', err);
    }
  };

  const updatePackage = (id, updatedData) => {
    setPackages(prev => prev.map(pkg => pkg.id === id ? { ...pkg, ...updatedData } : pkg));
  };

  const deleteBooking = async (id) => {
    try {
      const bookingToDelete = myBookings.find(b => b.id === id);

      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (bookingToDelete) {
        setBookedDates(dates => dates.filter(date => date !== bookingToDelete.date));
      }
      setMyBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error("Error deleting booking in Supabase:", err);
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
