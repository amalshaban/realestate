import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { apiKey } from '../../../constants/Validations.js';

const BASE_URL = 'https://realstate.niledevelopers.com';

export default function useAgentProperties() {

  const [properties, setProperties] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/agent/properties`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
          apiKey,
          'Content-Type': 'application/json',
        },
      });
      setProperties(response.data.properties || response.data || []);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, loading, error, refetch: fetchProperties };
}