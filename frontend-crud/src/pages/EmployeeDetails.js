import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchEmployees,
  incrementSalary,
  deleteEmployee,
  updateEmployee,
} from "../features/employeeSlice";
import "../EmployeeDetails.css";
import Navbar from "../Navbar";

const EmployeeDetails = () => {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: employees } = useSelector((state) => state.employees);

  const [editing, setEditing] = useState(false); // State for editing mode
  const [updatedEmployee, setUpdatedEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
  });

  useEffect(() => {
    if (employees.length === 0) {
      // Fetch employees if not already fetched
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees]);

  // Find the specific employee
  const employee = employees.find((e) => e._id === id);

  useEffect(() => {
    if (employee) {
      setUpdatedEmployee({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        salary: employee.salary,
      });
    }
  }, [employee]);

  const handleIncrementSalary = () => {
    dispatch(incrementSalary(id));
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(id)).then(() => {
      navigate("/"); // Redirect to the main page after deletion
    });
  };

  const handleUpdate = () => {
    dispatch(updateEmployee({ id, employee: updatedEmployee })).then(() => {
      setEditing(false); // Exit editing mode after update
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="employee-details-container">
        {employee ? (
          <div>
            <h1 className="employee-details-title">
              {editing ? "Edit Employee Details" : employee.name}
            </h1>

            {editing ? (
              <>
                <label>
                  Name:{" "}
                  <input
                    type="text"
                    name="name"
                    value={updatedEmployee.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email:{" "}
                  <input
                    type="email"
                    name="email"
                    value={updatedEmployee.email}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Phone:{" "}
                  <input
                    type="text"
                    name="phone"
                    value={updatedEmployee.phone}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Salary:{" "}
                  <input
                    type="number"
                    name="salary"
                    value={updatedEmployee.salary}
                    onChange={handleChange}
                  />
                </label>
                <button onClick={handleUpdate} className="update-button">
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="employee-details-email">
                  Email: <strong>{employee.email}</strong>
                </p>
                <p className="employee-details-phone">
                  Phone: <strong>{employee.phone}</strong>
                </p>
                <p className="employee-details-salary">
                  Salary: <strong>${employee.salary}</strong>
                </p>
                <div className="employee-actions">
                  <button
                    onClick={handleIncrementSalary}
                    className="increment-button"
                  >
                    Increment Salary
                  </button>
                  <button
                    onClick={() => setEditing(true)}
                    className="edit-button"
                  >
                    Edit Details
                  </button>
                  <button onClick={handleDelete} className="delete-button">
                    Delete Employee
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>Employee not found.</p>
        )}
      </div>
    </>
  );
};

export default EmployeeDetails;
