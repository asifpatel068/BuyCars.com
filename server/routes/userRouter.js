const express = require('express');
const uesrRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require("../model/User"); 

uesrRouter.post('/register', async (req, res) => {
    try {
        console.log(req.body)
      const { username, password, email, role } = req.body;

      const existingUser = await User.findOne({ $or: [{ username }, { email }] });

      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 5);
      const newUser = new User({username,password: hashedPassword,email,role,});
      await newUser.save();
  
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error)
      res.status(500).json({ message: 'Server error' });
    }
  });



uesrRouter.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id, username: user.username,role:user.role }, 'KEYBUYCARS');
        res.status(200).json({ message: 'Authentication successful', token });
      } 
    } catch (error) {
      res.status(500).json({ message: 'server error' });
    }
  });

module.exports = {uesrRouter};
