const mongoose = require('mongoose');

//Person Schema
const RegionSchema = mongoose.Schema({
  name:{
      type: String,
      required:true
  }
});

/*******************/
//FUNCTIONS
/*******************/
const Region = module.exports = mongoose.model('Region', RegionSchema);

//Get the country by Id
module.exports.getRegionById = (id, callback) => {
    Region.findById(id, callback);
}

