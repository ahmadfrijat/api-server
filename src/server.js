'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFoundHndler = require('../src/error-handlers/404.js');
const errorHandler = require('../src/error-handlers/500.js');
const foodRouter = require('../src/routes/food.js');
const clothesRouter = require('../src/routes/clothes.js');
const app = express();




app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/v1/food/', foodRouter);
app.use('/api/v1/clothes/', clothesRouter);



app.use('*', notFoundHndler);
app.use(errorHandler);









module.exports = {
    server: app,
    start: (port) => {
      const PORT = port || 8080;
      app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    },
  };