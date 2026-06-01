import { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contactInfo, setContactInfo] = useState({
    phone: '+63 9XX XXX XXXX',
    facebook_page: 'Secret Corner Events',
    facebook_url: 'https://facebook.com/secretcorner',
    instagram_handle: '@secretcornerevents',
    instagram_url: 'https://instagram.com/secretcorner',
    location: 'Cebu City, Philippines',
    email: 'secretcorner@email.com',
    logo_url: null
  });
  const [loading, setLoading] = useState(false);

  // Fetch contact info on mount
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('contact_info')
          .select('*')
          .eq('id', 1)
          .single();

        if (error) throw error;
        if (data) setContactInfo(data);
      } catch (err) {
        console.error('Error fetching contact info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const updateContactInfo = async (updatedInfo) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('contact_info')
        .update(updatedInfo)
        .eq('id', 1);

      if (error) throw error;

      setContactInfo(prev => ({ ...prev, ...updatedInfo }));
      return { success: true };
    } catch (err) {
      console.error('Error updating contact info:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContext.Provider value={{ contactInfo, updateContactInfo, loading }}>
      {children}
    </ContactContext.Provider>
  );
};
