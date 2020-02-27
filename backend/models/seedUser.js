const mongoose = require('mongoose');
const User = require('./user');
const cript = require ('bcryptjs');
const saltRounds = cript.genSaltSync (10);

mongoose.connect('mongodb+srv://yfasproject:bDnFp8YliGSqwbd0@yfas-lsvem.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

async function seedUser() {
  const newUser = new User({
    active: true,
    username: 'Marina',
    password: await cript.hash('12344321', saltRounds),
    surname:'-',
    name:'Marina',
  });
  
  await newUser.save();
}

seedUser()
.then(() => {
  mongoose.connection.close();
})
.catch((data)=>(console.log('error: ', data)))
.then(()=> mongoose.connection.close());