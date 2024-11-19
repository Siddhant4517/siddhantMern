const mongoose = require('mongoose');

const EmployeeDetailsSchema = new mongoose.Schema({
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: Number, required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, // Reference to Employee
});

module.exports = mongoose.model('EmployeeDetails', EmployeeDetailsSchema, 'EmployeeDetails');
