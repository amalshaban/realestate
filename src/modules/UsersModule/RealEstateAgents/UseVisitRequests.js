import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { apiKey } from '../../../constants/Validations.js';

const BASE_URL = 'https://realstate.niledevelopers.com';

const headers = () => ({
  Authorization: `Bearer ${sessionStorage.token}`,
  apiKey,
  'Content-Type': 'application/json',
});

export default function useVisitRequests() {

  const [requests,       setRequests]       = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState(null);
  const [suggestedDates, setSuggestedDates] = useState({});
  const [adding,         setAdding]         = useState(null);
  const [deleting,       setDeleting]       = useState(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/Agent/VisitRequests`, {
        headers: headers(),
      });
      setRequests(response.data || []);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSuggestedDates = useCallback(async (visitRequestId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/Agent/VisitRequests/SuggestedDates/List`,
        { visitRequestId },
        { headers: headers() }
      );
      setSuggestedDates(prev => ({
        ...prev,
        [visitRequestId]: response.data || [],
      }));
    } catch {}
  }, []);

  const addSuggestedDate = useCallback(async (propertyVisitRequestId, suggestedDateTime) => {
    setAdding(propertyVisitRequestId);
    try {
      await axios.post(
        `${BASE_URL}/Agent/VisitRequests/SuggestedDates`,
        { propertyVisitRequestId, suggestedDateTime },
        { headers: headers() }
      );
      await fetchSuggestedDates(propertyVisitRequestId);
    } catch {}finally {
      setAdding(null);
    }
  }, [fetchSuggestedDates]);

  const deleteSuggestedDate = useCallback(async (suggestedDateId, visitRequestId) => {
    setDeleting(suggestedDateId);
    try {
      await axios.post(
        `${BASE_URL}/Agent/VisitRequests/SuggestedDates/Delete`,
        { suggestedDateId },
        { headers: headers() }
      );
      await fetchSuggestedDates(visitRequestId);
    } catch {} finally {
      setDeleting(null);
    }
  }, [fetchSuggestedDates]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests, loading, error,
    suggestedDates, adding, deleting,
    fetchSuggestedDates, addSuggestedDate, deleteSuggestedDate,
    refetch: fetchRequests,
  };
}