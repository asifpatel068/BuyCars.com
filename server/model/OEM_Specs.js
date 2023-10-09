const mongoose=require("mongoose");

const oemSpecsSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    list_price: { type: Number, required: true },
    available_colors: { type: [String], required: true },
    mileage: { type: Number, required: true },
    power_bhp: { type: Number, required: true },
    max_speed: { type: Number, required: true },
    
  });
  
const OEMSpecs = mongoose.model('OEMSpecs', oemSpecsSchema);

module.exports={
    OEMSpecs
}