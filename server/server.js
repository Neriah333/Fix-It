const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('API is running...')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

