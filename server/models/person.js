const mongoose = require('mongoose');

//Person Schema
const PersonSchema = mongoose.Schema({
  name:{
      type: String,
      required:true
  },
  email:{
      type: String,
      required:true
  },
  country:{
      type: String,
      required:true
  },
  date_of_birth:{
      type: Date,
      required:true
  },
  phone:{
      type: String,
      required:true
  }
});

/*******************/
//FUNCTIONS
/*******************/
const Person = module.exports = mongoose.model('Person', PersonSchema);

//Get the person by Id
module.exports.getPersonById = (id, callback) => {
    Person.findById(id, callback);
}

//Add new Person
module.exports.addPerson = (newPerson, callback) => {
    newPerson.save(callback);    
}
