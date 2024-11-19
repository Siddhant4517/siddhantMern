import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEmployees } from "../features/employeeSlice";
import "../EmployeeList.css";
import Navbar from "../Navbar";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: employees, status } = useSelector((state) => state.employees);

  // Fetch employees when the component mounts
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Navigate to employee details page
  const handleCardClick = (id) => {
    navigate(`/employees/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="employee-list-container">
        <h1 className="page-title">Employee Directory</h1>

        {status === "loading" && <p>Loading employees...</p>}
        {status === "failed" && <p>Error fetching employees.</p>}

        {status === "succeeded" && employees.length > 0 ? (
          <div className="employee-grid">
            {employees.map((employee) => (
              <div
                key={employee._id}
                className="employee-card"
                onClick={() => handleCardClick(employee._id)} // Redirect on click
              >
                <h3 className="employee-name">{employee.name}</h3>
                <p className="employee-email">{employee.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </>
  );
};

export default EmployeeList;
