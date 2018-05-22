const mongoose = require('mongoose');

//Person Schema
const CountrySchema = mongoose.Schema({
  name:{
      type: String,
      required:true
  }
});

/*******************/
//FUNCTIONS
/*******************/
const Country = module.exports = mongoose.model('Country', CountrySchema);

//Get the country by Id
module.exports.getCountryById = (id, callback) => {
    Person.findById(id, callback);
}

