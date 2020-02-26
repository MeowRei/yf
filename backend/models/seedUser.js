const mongoose = require('mongoose');
const User = require('./user');
const cript = require ('bcryptjs');
const saltRounds = cript.genSaltSync (10);

mongoose.connect('mongodb+srv://yfasproject:bDnFp8YliGSqwbd0@yfas-lsvem.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

async function seedUser() {
  const newUser = new User({
    active: true,
    username: 'Reiko',
    password: await cript.hash('an0r1el', saltRounds),
    surname:'Lirovskiy',
    name:'Konstantin',
  });
  
  await newUser.save();
}

seedUser()
.then(() => {
  mongoose.connection.close();
})
.catch((data)=>(console.log('error: ', data)))
.then(()=> mongoose.connection.close());