const express = require('express');
const inventoryRouter = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { InventoryModel } = require('../model/inventoryModel');

inventoryRouter.post('/create',authenticateToken, async (req, res) => {
  try {
    const user=req.user
    const {make, model,year,price,color,mileage,image_url,description} = req.body;

    const inventoryItem = new InventoryModel({user,make,model,year,price,color,mileage,image_url,description,});

    const savedInventoryItem = await inventoryItem.save();
    res.status(201).json(savedInventoryItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

inventoryRouter.get('/all',authenticateToken, async (req, res) => {
  try {
    const inventoryItems = await InventoryModel.find();
    res.json(inventoryItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


inventoryRouter.get('/:id',authenticateToken, async (req, res) => {
  try {
    const inventoryItem = await InventoryModel.findById(req.params.id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json(inventoryItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


inventoryRouter.put('/:id', async (req, res) => {
  try {
    const updatedInventoryItem = await InventoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json(updatedInventoryItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


inventoryRouter.delete('/:id', async (req, res) => {
  try {
    const deletedInventoryItem = await InventoryModel.findByIdAndRemove(
      req.params.id
    );
    if (!deletedInventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json({ message: 'Inventory item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = {inventoryRouter};
