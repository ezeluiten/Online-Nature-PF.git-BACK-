const express = require('express');
const morgan = require('morgan');

const clientRouter = require('./routes/clientRoutes');
const animalRouter = require('./routes/animalRoutes');
const publicationsRoutes = require('./routes/publicationRoutes')

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/animals', animalRouter);
app.use('/api/v1/publications', publicationsRoutes);

module.exports = app;