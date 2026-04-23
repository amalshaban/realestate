import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { apiKey } from '../../../constants/Validations.js';

const BASE_URL = 'https://realstate.niledevelopers.com';

export default function usePurchaseRequests() {

  const [requests,  setRequests]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [accepting, setAccepting] = useState(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/Agent/PurchaseRequests`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
          apiKey,
          'Content-Type': 'application/json',
        },
      });
      setRequests(response.data || []);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const acceptRequest = useCallback(async (purchaseRequestId) => {
    setAccepting(purchaseRequestId);
    try {
      await axios.post(`${BASE_URL}/Agent/PurchaseRequests/Accept`,
        { purchaseRequestId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            apiKey,
            'Content-Type': 'application/json',
          },
        }
      );
      await fetchRequests();
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setAccepting(null);
    }
  }, [fetchRequests]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return { requests, loading, error, accepting, acceptRequest, refetch: fetchRequests };
}