import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaPhoneVolume, FaComputer } from "react-icons/fa6";
import { MdAttachEmail, MdAddTask } from "react-icons/md";
import { SiGooglecalendar, SiFiles } from "react-icons/si";
import { GrMapLocation } from "react-icons/gr";
import { BiSolidDashboard } from "react-icons/bi";
import { FaIdCard, FaRegAddressCard, FaMoneyBillWave } from "react-icons/fa";
import { PiIdentificationCardFill } from "react-icons/pi";

const API_URL = import.meta.env.VITE_API_URL;

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '', employeeId: '', email: '', phone: '', altPhone: '',
        age: '', role: '', department: '', designation: '', salary: '',
        joiningDate: '', location: '', aadhar: '', pan: '',
        permanentAddress: '', currentAddress: '', note: '', file: null
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'file' ? files[0] : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.entries(formData).forEach(([k, v]) => v && form.append(k, v));
        try {
            const res = await fetch(`${API_URL}/users`, { method: 'POST', body: form });
            const data = await res.json();
            if (res.ok) {
                setMessage('User created successfully');
                navigate('/');
            } else {
                setMessage(data.message || 'Failed to create user');
            }
        } catch (err) {
            setMessage('Server error' + err.message || 'An error occurred');
        }
    };

    const labelClass = "flex items-center gap-2 text-sm text-gray-700 mb-1 font-medium";

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-purple-700">Add New User</h2>
            {message && <p className="text-red-500 mb-4">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}><FaUserTie /> Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className={labelClass}><FaIdCard /> Employee ID</label>
                        <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label className={labelClass}><MdAttachEmail /> Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className={labelClass}><FaPhoneVolume /> Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label className={labelClass}><FaPhoneVolume /> Alternate Phone</label>
                        <input type="text" name="altPhone" value={formData.altPhone} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className={labelClass}><SiGooglecalendar /> Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label className={labelClass}><FaComputer /> Role</label>
                        <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className={labelClass}><MdAddTask /> Department</label>
                        <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label className={labelClass}><MdAddTask /> Designation</label>
                        <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className={labelClass}><FaMoneyBillWave /> Salary</label>
                        <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label className={labelClass}><SiGooglecalendar /> Joining Date</label>
                        <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className={labelClass}><GrMapLocation /> Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label className={labelClass}><PiIdentificationCardFill /> Aadhar Number</label>
                        <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className={labelClass}><PiIdentificationCardFill /> PAN Number</label>
                        <input type="text" name="pan" value={formData.pan} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                </div>

                <div>
                    <label className={labelClass}><FaRegAddressCard /> Permanent Address</label>
                    <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} rows="2" className="w-full border p-2 rounded" placeholder="Enter permanent address" />
                </div>

                <div>
                    <label className={labelClass}><FaRegAddressCard /> Current Address</label>
                    <textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} rows="2" className="w-full border p-2 rounded" placeholder="Enter current address" />
                </div>

                <div>
                    <label className={labelClass}><MdAddTask /> Note</label>
                    <textarea name="note" value={formData.note} onChange={handleChange} rows="3" className="w-full border p-2 rounded" placeholder="Enter any notes (optional)" />
                </div>

                <div>
                    <label className={labelClass}><SiFiles /> Upload Document</label>
                    <input type="file" name="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={handleChange} className="w-full border p-2 rounded" />
                </div>

                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold">
                    Submit
                </button>

                <div className="form-footer">
                    <button type="button" onClick={() => navigate('/')} className="text-purple-600 hover:underline font-medium flex items-center gap-2">
                        <BiSolidDashboard /> View All Users
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
