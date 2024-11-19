const express = require('express');
const employeeRoutes = require('./Employee'); 
const cors = require('cors');
const connectDB = require('./db/db')

const app = express();
const port = 3000;

app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the employee routes with a base URL
app.use('/employees', employeeRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});
connectDB()
