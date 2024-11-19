const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    salary: { type: Number, required: true },
});

const Employee = mongoose.model('Employee', EmployeeSchema, 'Employees');
module.exports = Employee;