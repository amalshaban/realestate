import React, { useState, useEffect } from 'react';
import { Authorization } from '../../../constants/Validations';
import { LOCATIONS_URLs, PROPERTIES_URLS } from '../../../constants/EndPoints';
import axios from 'axios';


export default function Search() {
    const [myData, setMyData] = useState([]);
    const [activeTab, setActiveTab] = useState('buy'); // Logic للتبديل بين Buy و Rent

    const getmydata = async () => {
        try {
            let response = await axios.get(LOCATIONS_URLs.Countries, Authorization);
            setMyData(response.data);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    }

    useEffect(() => {
        getmydata();
    }, []);


    return (
        <div className="container mt-5">
            <div className="search-container">
                {/* Buy / Rent Tabs */}
                <div className="toggle-container">
                    <button 
                        className={`toggle-btn ${activeTab === 'buy' ? 'active' : ''}`}
                        onClick={() => setActiveTab('buy')}
                    >
                        Buy
                    </button>
                    <button 
                        className={`toggle-btn ${activeTab === 'rent' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rent')}
                    >
                        Rent
                    </button>
                </div>

                {/* Form Row */}
                <form>
                    <div className="row g-1  align-items-center">
                        <div className="col-lg-4 col-md-6">
                            <div className="search-box-wrapper ">
                                {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                                <select className="form-select border-0  bg-transparent">
                                    <option value="" selected disabled>Select Country</option>
                                    {myData.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Property Type */}
                        <div className="col-lg-3 col-md-6">
                            <div className="search-box-wrapper">
                                <select className="form-select border-0 bg-transparent">
                                    <option value="" selected>Any Type</option>
                                    <option value="1">Apartment</option>
                                    <option value="2">Villa</option>
                                    <option value="2">Compound</option>
                                    <option value="2">Land</option>
                                </select>
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="col-lg-3 col-md-6">
                            <div className="search-box-wrapper">
                                <select className="form-select border-0 bg-transparent">
                                    <option value="" selected>Any Price</option>
                                    <option value="1">$1000 - $5000</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="col-lg-2 col-md-6">
                            <button type="submit" className="btn-search-main">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}