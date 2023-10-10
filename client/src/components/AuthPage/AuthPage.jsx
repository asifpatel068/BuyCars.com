import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css';

const AuthPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        role: '', 
        isRegistering: false,
      });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleMode = () => {
    setFormData({ ...formData, isRegistering: !formData.isRegistering });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.isRegistering) {
        if (!formData.username) {
       
          console.error("Username is required for registration.");
          return;
        }
      
        const response =await axios.post('https://buycars-lqj1.onrender.com/user/register', {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          role: formData.role,
        });
        alert(response.data.message)
      } else {
      
        const response = await axios.post('https://buycars-lqj1.onrender.com/user/login', {
          username: formData.username,
          password: formData.password,
        });
        const { token } = response.data;
        localStorage.setItem("token",token)
        console.log(token)
        alert('Login Success')
      }



    } catch (error) {
      console.error(error);
     
    }
  };

  return (
    <div className="auth-container">
      <h2>{formData.isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {formData.isRegistering && (
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="dealer">Dealer</option>
            <option value="buyer">Buyer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">
          {formData.isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <button className="toggle-button" onClick={handleToggleMode}>
        {formData.isRegistering
          ? 'Switch to Login'
          : 'Switch to Registration'}
      </button>
    </div>
  );
};

export default AuthPage;