const express = require('express');
const useMiddleware = require('./middleware');
const useErrorHandlers = require('./middleware/error-handlers');
// const path = require('path');

const app = express();
useMiddleware(app);

const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const symbolRouter = require('./routes/symbol');



app.use('/users', usersRouter);
app.use('/index', indexRouter);
app.use('/symbol', symbolRouter);


useErrorHandlers(app);

module.exports = app;
