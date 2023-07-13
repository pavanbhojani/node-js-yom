const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email: {
        type: String,
        validate: {
          validator: async function(email) {
            const user = await this.constructor.findOne({ email });
            if(user) {
              if(this.id === user.id) { 
                return true;
              }
              return false;
            }
            return true;
          },
          message: props => 'The specified email address is already in use.'
        },
        required: [true, 'User email required']
      },
      
    password : {
        type : String,
        required : true
    }
});

const register = mongoose.model('register',schema);
module.exports = register;