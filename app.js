require('dotenv').config();
const express = require('express');
const connect = require('./db/connect');
const app = express();
const productsRoutes = require('./routes/products');
const userRouters = require('./routes/user');

//middlewares
app.use(express.json());
//routes
app.get('/', (req, res) => res.send('<h1>Better Amazon API</h1>'));
app.use('/api/v1', productsRoutes);
app.use('/api/v1/user', userRouters);

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
