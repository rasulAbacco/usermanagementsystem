import { DataTypes } from "sequelize";

export const createUserModel = async (sequelize) => {
    const User = sequelize.define('User', {
        name: { type: DataTypes.STRING, allowNull: false },
        employeeId: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        phone: { type: DataTypes.STRING, allowNull: false },
        altPhone: { type: DataTypes.STRING },
        age: { type: DataTypes.INTEGER },
        role: { type: DataTypes.STRING, allowNull: false },
        department: { type: DataTypes.STRING },
        designation: { type: DataTypes.STRING },
        salary: { type: DataTypes.STRING },
        joiningDate: { type: DataTypes.STRING },
        location: { type: DataTypes.STRING },
        aadhar: { type: DataTypes.STRING },
        pan: { type: DataTypes.STRING },
        permanentAddress: { type: DataTypes.TEXT },
        currentAddress: { type: DataTypes.TEXT },
        note: { type: DataTypes.TEXT },
        file: { type: DataTypes.BLOB('long'), allowNull: true },
        fileType: { type: DataTypes.STRING, allowNull: true }
    });

    return User;
};
