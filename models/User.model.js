const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: [true, 'This username has already been registered']
  },
  password: {
    type: String,
    required: [true, 'please add a password']
  }
    
});

const User = model("User", userSchema);

module.exports = User;
