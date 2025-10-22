import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function UserLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
        
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data && data.address) {
              setAddress({
                city: data.address.city || data.address.town || data.address.village || data.address.county,
                country: data.address.country,
              });
console.log(location);
            } else {
              setError('Could not retrieve address information.');
            }
          } catch (error) {
            setError('Error fetching address: ' + error.message);
          }
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  if (error) {
    return toast.error("Error: ",{error});
    
  }

  if (!location) {
    return <div>Loading location...</div>;
  }

  return (

        
    <div>
      <h2>Your Location:</h2>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      {address && (
        <div>
          <h2>Address:</h2>
          <p>City: {address.city}</p>
          <p>Country: {address.country}</p>
        </div>
      )}
      {!address && !error && <p>Fetching address...</p>}
    </div>
  );
}
export default UserLocation;



