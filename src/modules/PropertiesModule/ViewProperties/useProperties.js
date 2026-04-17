import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { apiKey } from '../../../constants/Validations.js';

const BASE_URL = 'https://realstate.niledevelopers.com';

export default function useProperties() {

  const [properties, setProperties] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/properties/active`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
          apiKey,
          'Content-Type': 'application/json',
          'Accept-Language': 'browserLanguage',
        },
      });
      setProperties(response.data.properties || []);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sendView = useCallback(async (id) => {
    try {
      await axios.post(
        `${BASE_URL}/User/add-new-watch`,
        { propertyId: id },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            apiKey,
            'Content-Type': 'application/json',
            'Accept-Language': 'browserLanguage',
          },
        }
      );
    } catch (err) {
      // silent fail — view tracking shouldn't break UX
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, loading, error, sendView };
}