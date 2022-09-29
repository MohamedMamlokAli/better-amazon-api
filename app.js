require('dotenv').config();
const express = require('express');
const connect = require('./db/connect');
const app = express();
const productsRoutes = require('./routes/products');

//middlewares
app.use(express.json());
//routes
app.use('/api/v1', productsRoutes);

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(
      process.env.PORT,
      console.log(`server is running on port: ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
