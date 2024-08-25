const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorhandler');
require('dotenv').config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use Routes

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/kyc', require('./routes/ekycRoutes'));
app.use('/api/banks', require('./routes/bankRoutes'));
app.use('/api/nominee', require('./routes/nomineeRoutes'));
app.use('/api/investments', require('./routes/investmentRoutes'));
app.use('/api/wallet', require('./routes/walletRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
