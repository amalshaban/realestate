import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { LOCATIONS_URLs } from '../../../../constants/EndPoints';
import { Authorization } from '../../../../constants/Validations';

export default function useLocations() {

  const [countries,  setCountries]  = useState([]);
  const [cities,     setCities]     = useState([]);
  const [districts,  setDistricts]  = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await axios.get(LOCATIONS_URLs.Countries, Authorization);
        setCountries(res.data);
      } catch {}
    };
    getCountries();
  }, []);

  const fetchCities = useCallback(async (countryId) => {
    setCities([]);
    setDistricts([]);
    if (!countryId || countryId === '0') return;
    try {
      const res = await axios.get(
        `https://realstate.niledevelopers.com/Locations/Cities?id=${countryId}`,
        Authorization
      );
      setCities(res.data);
    } catch {}
  }, []);

  const fetchDistricts = useCallback(async (cityId) => {
    setDistricts([]);
    if (!cityId || cityId === '0') return;
    try {
      const res = await axios.get(
        `https://realstate.niledevelopers.com/Locations/Districts?id=${cityId}`,
        Authorization
      );
      setDistricts(res.data);
    } catch {}
  }, []);

  return { countries, cities, districts, fetchCities, fetchDistricts };
}