import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/userRow.css"; // Import external CSS
import { MdReadMore } from "react-icons/md";

const UserRow = ({ user, index, onDelete, onPreview, openUserId, setOpenUserId }) => {
    const isOpen = openUserId === user.id;
    const navigate = useNavigate();

    const toggleDetails = () => {
        setOpenUserId(isOpen ? null : user.id);
    };

    return (
        <>
            <tr className="user-row">
                <td className="cell-sl">
                    <div className="serial-number">
                        {index + 1}
                    </div>
                </td>
                <td className="cell-emp-id">
                    <div className="emp-id-text">
                        {user.employeeId}
                    </div>
                </td>
                <td className="cell-name">
                    <div className="name-text">
                        {user.name}
                    </div>
                </td>
                <td className="cell-email">
                    <div className="email-text">
                        {user.email}
                    </div>
                </td>
                <td className="cell-phone">
                    <div className="phone-text">
                        {user.phone}
                    </div>
                </td>
                <td className="cell-role">
                    <span className="role-badge">
                        {user.role}
                    </span>
                </td>
                <td className="cell-actions">
                    <div className="actions-container">
                        <button
                            onClick={() => onPreview(user)}
                            className="action-btn preview-btn"
                        >
                            <FaEye />
                        </button>
                        <button
                            onClick={() => navigate(`/users/${user.id}`)}
                            className="action-btn edit-btn"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => onDelete(user.id)}
                            className="action-btn delete-btn"
                        >
                            <FaTrash />
                        </button>
                        <button
                            onClick={toggleDetails}
                            className="action-btn toggle-btn"
                        >
                            <span className={`toggle-arrow ${isOpen ? 'open' : ''}`}>
                                <MdReadMore />
                            </span>
                        </button>
                    </div>
                </td>
            </tr>

            {isOpen && (
                <tr className="details-row">
                    <td colSpan="7" style={{ padding: 0 }}>
                        <div className="details-container">
                            <div className="details-content">
                                <div className="details-grid">
                                    <div className="detail-item">
                                        <div className="detail-label">Alt Phone</div>
                                        <div className="detail-value">
                                            {user.altPhone || 'N/A'}
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <div className="detail-label">Age</div>
                                        <div className="detail-value">
                                            {user.age || 'N/A'}
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <div className="detail-label">Department</div>
                                        <div className="detail-value">
                                            {user.department || 'N/A'}
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <div className="detail-label">Designation</div>
                                        <div className="detail-value">
                                            {user.designation || 'N/A'}
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <div className="detail-label">Salary</div>
                                        <div className="detail-value">
                                            ₹{user.salary || 'N/A'}
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <div className="detail-label">Aadhar</div>
                                        <div className="detail-value">
                                            {user.aadhar || 'N/A'}
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <div className="detail-label">PAN</div>
                                        <div className="detail-value">
                                            {user.pan || 'N/A'}
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <div className="detail-label">Permanent Address</div>
                                        <div className="detail-value">
                                            {user.permanentAddress || 'N/A'}
                                        </div>
                                    </div>

                                    <div className="detail-item">
                                        <div className="detail-label">Current Address</div>
                                        <div className="detail-value">
                                            {user.currentAddress || 'N/A'}
                                        </div>
                                    </div>

                                    <div className="detail-item detail-note">
                                        <div className="detail-label">Additional Notes</div>
                                        <div className="detail-value">
                                            {user.note || 'No additional notes'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default UserRow;