const express = require("express");
const router = express.Router();
const Employee = require("./models/Employee"); // Mongoose model

// Create a new employee
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, salary } = req.body;
    const newEmployee = new Employee({ name, email, phone, salary });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    console.error("Error saving employee data:", err);
    res.status(500).json({ error: "Failed to save employee data" });
  }
});

// List all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// Get details of a specific employee
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (err) {
    console.error("Error fetching employee details:", err);
    res.status(500).json({ error: "Failed to fetch employee details" });
  }
});

// Update an employee
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone, salary } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, salary },
      { new: true, runValidators: true }
    );
    if (!updatedEmployee)
      return res.status(404).json({ error: "Employee not found" });
    res.json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Failed to update employee" });
  }
});

// Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee)
      return res.status(404).json({ error: "Employee not found" });
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

// Add a specific amount to an employee's salary
router.patch("/:id/addSalary/:amount", async (req, res) => {
  try {
    const amount = parseInt(req.params.amount);
    if (isNaN(amount)) {
      return res.status(400).json({ error: "Invalid salary amount" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $inc: { salary: amount } },
      { new: true }
    );

    if (!updatedEmployee)
      return res.status(404).json({ error: "Employee not found" });
    res.json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee salary:", err);
    res.status(500).json({ error: "Failed to update employee salary" });
  }
});

module.exports = router;
