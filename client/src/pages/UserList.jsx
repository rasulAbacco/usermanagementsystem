import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ImFileExcel, ImFilePdf, ImFileWord } from "react-icons/im";
import { Document, Packer, Paragraph, Table as DocTable, TableCell, TableRow, TextRun } from "docx";
import { GiCrossedSabres, GiElephantHead } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import UserRow from "../components/UserRow";
import "../styles/UserList.css"; // Import external CSS

const API_URL = import.meta.env.VITE_API_URL;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [previewFile, setPreviewFile] = useState(null);
    const [previewType, setPreviewType] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [openUserId, setOpenUserId] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/users`);
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : data.users || []);
        } catch {
            setUsers([]);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Delete user?")) return;
        const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (res.ok) {
            setMessage(data.message || "Deleted");
            fetchUsers();
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(users);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Users");
        XLSX.writeFile(wb, "users.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const columns = [
            "Emp ID", "Name", "Email", "Phone", "Alt Phone", "Age", "Role",
            "Department", "Designation", "Salary", "Joining Date", "Location",
            "Aadhar", "PAN", "Perm Address", "Curr Address", "Note"
        ];
        const rows = users.map(u => [
            u.employeeId, u.name, u.email, u.phone, u.altPhone, u.age,
            u.role, u.department, u.designation, u.salary, u.joiningDate,
            u.location, u.aadhar, u.pan, u.permanentAddress, u.currentAddress, u.note
        ]);
        autoTable(doc, { head: [columns], body: rows });
        doc.save("users.pdf");
    };

    const exportToWord = async () => {
        const headerRow = new TableRow({
            children: [
                "Emp ID", "Name", "Email", "Phone", "Alt Phone", "Age", "Role",
                "Department", "Designation", "Salary", "Joining Date", "Location",
                "Aadhar", "PAN", "Perm Address", "Curr Address", "Note"
            ].map(h => new TableCell({ children: [new Paragraph(h)] }))
        });

        const userRows = users.map(u => new TableRow({
            children: [
                u.employeeId, u.name, u.email, u.phone, u.altPhone, u.age?.toString(),
                u.role, u.department, u.designation, u.salary, u.joiningDate,
                u.location, u.aadhar, u.pan, u.permanentAddress, u.currentAddress, u.note
            ].map(val => new TableCell({ children: [new Paragraph(val || "")] }))
        }));

        const doc = new Document({
            sections: [{
                children: [
                    new Paragraph({
                        children: [new TextRun({ text: "User List", bold: true, size: 28 })],
                        spacing: { after: 300 }
                    }),
                    new DocTable({ rows: [headerRow, ...userRows] })
                ]
            }]
        });

        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "users.docx";
        a.click();
    };

    const handlePreview = (user) => {
        setPreviewFile(`${API_URL}/users/${user.id}/file`);
        setPreviewType(user.fileType || "");
        setShowPreview(true);
    };

    useEffect(() => { fetchUsers(); }, []);

    return (
        <div className="user-list-container">
            {/* Header */}
            <div className="header">
                <div className="header-content">
                    <div className="header-flex">
                        <div className="header-info">
                            <h1 className="header-title">All Users</h1>
                            <p className="header-subtitle">
                                Manage and view all users in your organization
                            </p>
                            <div className="user-count">
                                <div className="pulse-dot"></div>
                                <span>{users.length} active users</span>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate("/users")}
                            className="add-user-btn"
                        >
                            <FaPlus />
                            Add New User
                        </button>
                    </div>
                </div>
            </div>

            <div className="main-content">
                {/* Success Message */}
                {message && (
                    <div className="message-alert">
                        <div className="message-content">
                            <div className="pulse-dot"></div>
                            <span>{message}</span>
                        </div>
                    </div>
                )}

                {/* Export Buttons */}
                <div className="export-buttons">
                    <button onClick={exportToExcel} className="export-btn export-excel">
                        <ImFileExcel />
                        Export Excel
                    </button>
                    <button onClick={exportToPDF} className="export-btn export-pdf">
                        <ImFilePdf />
                        Export PDF
                    </button>
                    <button onClick={exportToWord} className="export-btn export-word">
                        <ImFileWord />
                        Export Word
                    </button>
                </div>

                {/* Table Container */}
                <div className="table-container">
                    <div className="table-wrapper">
                        <div className="table-scroll">
                            <table className="users-table">
                                <thead className="table-header">
                                    <tr>
                                        <th className="col-sl">SL</th>
                                        <th className="col-emp-id">Emp ID</th>
                                        <th className="col-name">Name</th>
                                        <th className="col-email">Email</th>
                                        <th className="col-phone">Phone</th>
                                        <th className="col-role">Role</th>
                                        <th className="col-actions">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {users.map((user, index) => (
                                        <UserRow
                                            key={user.id}
                                            user={user}
                                            index={index}
                                            API_URL={API_URL}
                                            onDelete={deleteUser}
                                            onPreview={handlePreview}
                                            openUserId={openUserId}
                                            setOpenUserId={setOpenUserId}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title">File Preview</h3>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="modal-close"
                                >
                                    <GiCrossedSabres />
                                </button>
                            </div>
                            <div className="modal-body">
                                {previewType.startsWith("image/") ? (
                                    <div className="preview-image">
                                        <img src={previewFile} alt="Preview" />
                                    </div>
                                ) : previewType === "application/pdf" ? (
                                    <iframe
                                        src={previewFile}
                                        className="preview-iframe"
                                        title="PDF preview"
                                    />
                                ) : (
                                    <div className="preview-unsupported">
                                        <div className="preview-icon-container">
                                            <GiElephantHead className="preview-icon" />
                                        </div>
                                        <h3>Cannot preview this file type</h3>
                                        <p>This file format is not supported for preview</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;