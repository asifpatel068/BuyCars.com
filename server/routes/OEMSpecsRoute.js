const express = require('express');
const OEMSpecRouter = express.Router();

const { OEMSpecs } = require('../model/OEM_Specs');

OEMSpecRouter.get('/:make/:model', async (req, res) => {
  try {
    const { make, model } = req.params;
    const specs = await OEMSpecs.findOne({ make, model });

    if (!specs) {
      return res.status(404).json({ message: 'OEM specs not found' });
    }

    res.json(specs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

///admin routes

OEMSpecRouter.post('/', async (req, res) => {
  try {
    if(req.role!=admin){
        res.status(401).json({ message: 'Admin Access Error' });
    }
    const { make, model, year, list_price, available_colors, mileage, power_bhp, max_speed } = req.body;

    const specs = new OEMSpecs({
      make,
      model,
      year,
      list_price,
      available_colors,
      mileage,
      power_bhp,
      max_speed,
    });

    await specs.save();
    res.status(201).json(specs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


OEMSpecRouter.put('/:make/:model', async (req, res) => {
  try {
    if(req.role!=admin){
      res.status(401).json({ message: 'Admin Access Error' });
  }
    const { make, model } = req.params;
    const updatedSpecs = req.body;

    const result = await OEMSpecs.updateOne({ make, model }, updatedSpecs);

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'OEM specs not found' });
    }

    res.json({ message: 'OEM specs updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


OEMSpecRouter.delete('/:make/:model', async (req, res) => {
  try {
    if(req.role!=admin){
      res.status(401).json({ message: 'Admin Access Error' });
  }
    const { make, model } = req.params;

    const result = await OEMSpecs.deleteOne({ make, model });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'OEM specs not found' });
    }

    res.json({ message: 'OEM specs deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = {OEMSpecRouter};
