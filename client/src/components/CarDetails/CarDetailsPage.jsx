import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CarDetailsPage.css'; 

export default function CarDetailsPage() {
  const { id } = useParams();
  const [carData, setCarData] = useState({});

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const response = await axios.get(`https://buycars-lqj1.onrender.com/inventory/${id}`);
        setCarData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCarDetails();
  }, [id]);

  return (
    <div className="car-details-container">
      <div className="car-details-top">
        <h2>Car Details</h2>
        <p>Make: {carData.make}</p>
        <img src={carData.image_url} alt={`${carData.make} ${carData.model}`} />
      </div>
      <div className="car-details-bottom">
        <p>Model: {carData.model}</p>
        <p>Year: {carData.year}</p>
        <p>Price: ${carData.price}</p>
        <p>Color: {carData.color && carData.color.join(', ')}</p>
        <p>Mileage: {carData.mileage} miles</p>
        <p>Description: {carData.description}</p>
      </div>
    </div>
  );
}
