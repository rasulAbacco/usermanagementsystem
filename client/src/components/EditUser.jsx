import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        employeeId: '',
        email: '',
        phone: '',
        altPhone: '',
        age: '',
        role: '',
        department: '',
        designation: '',
        salary: '',
        joiningDate: '',
        location: '',
        aadhar: '',
        pan: '',
        permanentAddress: '',
        currentAddress: '',
        note: '', // ✅ Added note field
        file: null,
    });

    useEffect(() => {
        console.log("Edit ID:", id); // ✅ Confirm this is correct
        fetchUser();
    }, [id]);


    const fetchUser = async () => {
        try {
            const res = await fetch(`${API_URL}/users`); // 🔁 adjust endpoint
            const userData = await res.json();
            const user = userData.find(u => u.id === parseInt(id)); // 🔁 if it's wrapped
            setFormData({
                name: user.name || '',
                employeeId: user.employeeId || '',
                email: user.email || '',
                phone: user.phone || '',
                altPhone: user.altPhone || '',
                age: user.age || '',
                role: user.role || '',
                department: user.department || '',
                designation: user.designation || '',
                salary: user.salary || '',
                joiningDate: user.joiningDate?.substr(0, 10) || '',
                location: user.location || '',
                aadhar: user.aadhar || '',
                pan: user.pan || '',
                permanentAddress: user.permanentAddress || '',
                currentAddress: user.currentAddress || '',
                note: user.note || '',
                file: null,
                existingFileName: user.fileName || '', // 🆕 optional
            });
        } catch (err) {
            console.error('Failed to fetch user', err);
        }
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFormData({ ...formData, file: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) form.append(key, value);
        });

        try {
            const res = await fetch(`${API_URL}/users/${id}`, {
                method: 'PUT',
                body: form
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('✅ User updated successfully!');
                setTimeout(() => navigate('/'), 1500);
            } else {
                setMessage(data.message || '❌ Update failed.');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setMessage('❌ Update failed.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
            <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Employee ID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        placeholder="Employee ID"
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* Email, Phone, Alt Phone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="altPhone"
                        value={formData.altPhone}
                        onChange={handleChange}
                        placeholder="Alternate Phone"
                        className="border p-2 rounded"
                    />
                </div>

                {/* Age, Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Role"
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* Department, Designation, Salary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Department"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="Designation"
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Salary"
                        className="border p-2 rounded"
                    />
                </div>

                {/* Joining Date & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Work Location"
                        className="border p-2 rounded"
                    />
                </div>

                {/* Aadhar & PAN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="aadhar"
                        value={formData.aadhar}
                        onChange={handleChange}
                        placeholder="Aadhar Number"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="pan"
                        value={formData.pan}
                        onChange={handleChange}
                        placeholder="PAN Number"
                        className="border p-2 rounded"
                    />
                </div>

                {/* Permanent & Current Address (Vertically stacked) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Permanent Address</label>
                    <textarea
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleChange}
                        rows="2"
                        className="w-full border p-2 rounded mb-4 resize-none"
                        placeholder="Enter permanent address"
                    />
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Current Address</label>
                    <textarea
                        name="currentAddress"
                        value={formData.currentAddress}
                        onChange={handleChange}
                        rows="2"
                        className="w-full border p-2 rounded resize-none"
                        placeholder="Enter current address"
                    />
                </div>

                {/* ✅ Note Section (Before File Upload) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Note</label>
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        rows="3"
                        className="w-full border p-2 rounded resize-none"
                        placeholder="Add any notes (optional)"
                    />
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Upload File</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className='flex justify-between items-center mt-4'>
                    <button
                        type="button"
                        onClick={() => navigate('/users')}
                        className="text-purple-600 font-medium hover:underline"
                    >
                        ← Back to Users
                    </button>

                    <button
                        type="submit"
                        className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
                    >
                        Update User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
