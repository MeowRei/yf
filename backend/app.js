const express = require('express');
const useMiddleware = require('./middleware');
const useErrorHandlers = require('./middleware/error-handlers');
const path = require('path');

const publicPath = path.join(__dirname, 'build'); //deploy


const app = express();
useMiddleware(app);



const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const symbolRouter = require('./routes/symbol');



app.use('/users', usersRouter);
app.use('/index', indexRouter);
app.use('/symbol', symbolRouter);


useErrorHandlers(app);

//deploy
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


module.exports = app;