import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../features/employeeSlice';
import { useNavigate } from 'react-router-dom';
import '../CreateEmployee.css' // Import the CSS file
import Navbar from '../Navbar';

const CreateEmployee = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', salary: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addEmployee(form));
        navigate('/');
    };

    return (
        <>
        <Navbar/>
        <div className="form-container">
            <form onSubmit={handleSubmit} className="employee-form">
                <h1>Create Employee</h1>
                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter employee name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Phone</label>
                    <input
                        type="number"
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Salary</label>
                    <input
                        type="number"
                        placeholder="Enter salary"
                        value={form.salary}
                        onChange={(e) => setForm({ ...form, salary: parseInt(e.target.value) })}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Create</button>
            </form>
        </div>
        </>
    );
};

export default CreateEmployee;
