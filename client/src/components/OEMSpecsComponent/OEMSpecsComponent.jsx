import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOEMSpecsByMakeAndModel } from './api/OEMSpecsService';
import './OEMSpecsComponent.css'; 

const OEMSpecsComponent = () => {
    
    const { make, model } = useParams();
    console.log(`Make: ${make}, Model: ${model}`);
    
    const [specs, setSpecs] = useState({});
  
    useEffect(() => {
      if (make && model) {
        getOEMSpecsByMakeAndModel(make, model)
          .then((data) => {
            setSpecs(data)
            console.log("error")
        })
          .catch((error) => {
            console.error(error)
            console.log("error")
        });
      }
    }, [make, model]);

  return (
    <div>
      <h2>OEM Specs</h2>
      <div className="oem-specs-table">
        <table>
          <tbody>
            <tr>
              <th>Make</th>
              <td>{specs.make}</td>
            </tr>
            <tr>
              <th>Model</th>
              <td>{specs.model}</td>
            </tr>
            <tr>
              <th>Year</th>
              <td>{specs.year}</td>
            </tr>
            <tr>
              <th>List Price</th>
              <td>{specs.list_price}</td>
            </tr>
            <tr>
              <th>Available Colors</th>
              <td>{specs.available_colors}</td>
            </tr>
            <tr>
              <th>Mileage</th>
              <td>{specs.mileage}</td>
            </tr>
            <tr>
              <th>Power (BHP)</th>
              <td>{specs.power_bhp}</td>
            </tr>
            <tr>
              <th>Max Speed</th>
              <td>{specs.max_speed}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OEMSpecsComponent;
