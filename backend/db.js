const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prathmesh18:FWGAGN8iu7nBY9z0@cluster1.pmfqlsq.mongodb.net/')
  .then(() => console.log('Connected!'));
 const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength:6
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 50
    },
    LastName:{
        type: String,
        required: true,
        maxLength:50
    }
 });
 // create a model for the schema
const  User = mongoose.model('User',userSchema);
module.exports ={
    User
}