import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    async function fetchInventoryItems() {
      try {
        const response = await axios.get('https://buycars-lqj1.onrender.com/inventory/all');
        setInventoryItems(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchInventoryItems();
  }, []);

  return (
    <div>
      <h2>All Cars</h2>
      <div className="inventory-card-container">
        {inventoryItems.map((item) => (
          <div key={item._id} className="inventory-card">
            <Link to={`/car/${item._id}`}> 
              <img src={item.image_url} alt={`${item.make} ${item.model}`} />
              <div className="inventory-details">
                <h3>{item.make} {item.model}</h3>
                <p>Year: {item.year}</p>
                <p>Price: ${item.price}</p>
                <p>Color: {item.color.join(', ')}</p>
                <p>Mileage: {item.mileage} miles</p>
                <p>Description: {item.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
