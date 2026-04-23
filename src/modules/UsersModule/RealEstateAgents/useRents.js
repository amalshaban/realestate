import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { apiKey } from '../../../constants/Validations.js';

const BASE_URL = 'https://realstate.niledevelopers.com';

export default function useRents() {

  const [rents,   setRents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchRents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/Agent/Rents`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
          apiKey,
          'Content-Type': 'application/json',
        },
      });
      setRents(response.data || []);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRents();
  }, [fetchRents]);

  return { rents, loading, error, refetch: fetchRents };
}