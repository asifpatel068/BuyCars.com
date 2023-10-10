// api/OEMSpecsService.js

import axios from 'axios';

const BASE_URL = 'https://buycars-lqj1.onrender.com';

export const getOEMSpecsByMakeAndModel = async (make, model) => {
  try {
    const response = await axios.get(`${BASE_URL}/oem/${make}/${model}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


