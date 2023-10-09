const mongoose=require("mongoose")

const inventorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    color: { type: [String], required: true },
    mileage: { type: Number, required: true },
    image_url: { type: String, required: true },
    description: { type: String, required: true }
    
  });
  
  const InventoryModel = mongoose.model('Inventory', inventorySchema);
  

module.exports={
  InventoryModel
}