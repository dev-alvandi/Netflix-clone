const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/UserRoutes');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected!');
  });

app.use('/api/user', userRouter);

app.listen(9000, console.log('Server is started!'));
