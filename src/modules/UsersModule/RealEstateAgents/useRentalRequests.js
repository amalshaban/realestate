import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { apiKey } from '../../../constants/Validations.js';

const BASE_URL = 'https://realstate.niledevelopers.com';

const headers = () => ({
  Authorization: `Bearer ${sessionStorage.token}`,
  apiKey,
  'Content-Type': 'application/json',
});

export default function useRentalRequests() {

  const [requests,  setRequests]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [accepting, setAccepting] = useState(null);
  const [creating,  setCreating]  = useState(false);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/Agent/RentalRequests`, {
        headers: headers(),
      });
      setRequests(response.data || []);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const acceptRequest = useCallback(async (rentalRequestId) => {
    setAccepting(rentalRequestId);
    try {
      await axios.post(
        `${BASE_URL}/Agent/RentalRequests/Accept`,
        { rentalRequestId },
        { headers: headers() }
      );
      await fetchRequests();
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setAccepting(null);
    }
  }, [fetchRequests]);

  const createRent = useCallback(async (data) => {
    setCreating(true);
    try {
      await axios.post(
        `${BASE_URL}/Agent/Rent/Create`,
        data,
        { headers: headers() }
      );
      await fetchRequests();
      return true;
    } catch (err) {
      setError(err.response?.data || err.message);
      return false;
    } finally {
      setCreating(false);
    }
  }, [fetchRequests]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests, loading, error,
    accepting, creating,
    acceptRequest, createRent,
    refetch: fetchRequests,
  };
}