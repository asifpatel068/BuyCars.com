import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ManageCarsPage() {

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
      
        const handleDelete = async (id) => {
          try {
            await axios.delete(`https://buycars-lqj1.onrender.com/inventory/${id}`);
            const updatedInventoryItems = inventoryItems.filter((item) => item._id !== id);
            setInventoryItems(updatedInventoryItems);
          } catch (error) {
            console.error(error);
          }
        };
      
        return (
          <div>
            <h2>Manage Cars</h2>
            <Link to="/manage/add">Add Car</Link>
            <ul>
              {inventoryItems.map((item) => (
                <li key={item._id}>
                  {item.make} {item.model}, {item.year}
                  <Link to={`/manageedit/${item._id}`}>Edit</Link>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        );
}
