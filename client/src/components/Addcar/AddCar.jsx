import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [carData, setCarData] = useState({
    image: '',
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem('token');

      const response = await axios.post('https://buycars-lqj1.onrender.com/inventory/create', {
        make: carData.make,
        model: carData.model,
        year: carData.year,
        price: carData.price,
        color: carData.color,
        mileage: carData.mileage,
        image_url: carData.image,
        description: carData.description,
      }, {
 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

 
      console.log('Car listing created:', response.data);

      setCarData({
        image: '',
        title: '',
        description: '',
      });
    } catch (error) {
      console.error(error);
    
    }
  };

  return (
    <div>
      <h2>Add Car Listing</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={carData.image}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={carData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={carData.description}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
