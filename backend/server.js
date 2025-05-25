const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./utils/connectDB');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const logMiddleware = require('./middleware/logMiddleware');

// Load env variables
dotenv.config();

// Connect to database
connectDB();

// Import routes
const baseRoutes = require('./routes/baseRoutes');

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const transferRoutes = require('./routes/transferRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const expenditureRoutes = require('./routes/expenditureRoutes');
const logRoutes = require('./routes/logRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(morgan('dev')); // logger
app.use(logMiddleware); // log each request into DB

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bases', baseRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/expenditures', expenditureRoutes);
app.use('/api/logs', logRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
