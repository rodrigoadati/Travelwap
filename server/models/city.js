const mongoose = require('mongoose');

//City Schema
const CitySchema = mongoose.Schema({
  name:{
      type: String,
      required:true
  },
  region:{
      type: String,
      required:true
  }
});

/*******************/
//FUNCTIONS
/*******************/
const City = module.exports = mongoose.model('City', CitySchema);

//Get the country by Id
module.exports.getCityById = (id, callback) => {
    City.findById(id, callback);
}

