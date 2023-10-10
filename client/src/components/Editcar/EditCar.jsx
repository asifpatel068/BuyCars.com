import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function EditCar() {
    const { id } = useParams();
    const [carData, setCarData] = useState({
      make: '',
      model: '',
      year: '',
      price: '',
      color: '',
      mileage: '',
      image_url: '',
      description: '',
    });
  
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`https://buycars-lqj1.onrender.com/inventory/${id}`, carData); 
    
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCarData({ ...carData, [name]: value });
    };
  
    return (
      <div>
        <h2>Edit Car</h2>
        <form onSubmit={handleSubmit}>
      
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
}
