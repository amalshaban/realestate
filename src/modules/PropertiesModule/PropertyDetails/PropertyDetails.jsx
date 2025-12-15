import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthorizedToken } from "../../../constants/Validations";

export default function PropertyDetails() {
  const { id } = useParams();
  console.log(id);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await axios.get(
          `https://realstate.niledevelopers.com/api/general/realstatetypeproperties/${id}`,
          AuthorizedToken
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      }
    };

    getProperty();
  }, [id]);

  return (
    <div className="container">
      <h2>Property Details Page</h2>
      <p>Property ID: {id}</p>

      {property ? (
        <pre>{JSON.stringify(property, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}



       <div>PropertyDetails
        <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
            <ArcGISMap />
            </div>
        <div className="col-md-6">
    xxxxxxxxxxxxxxxxxxxxxxx
 
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
