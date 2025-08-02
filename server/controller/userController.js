import { UserModel } from "../postgres/postgres.js";
import multer from "multer";

export const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            attributes: { exclude: ['file'] }
        });

        if (users.length === 0) {
            return res.status(200).json({ message: "User Not Found!" });
        } else {
            return res.status(200).json(users);
        }
    } catch (error) {
        return res.status(500).json("Internal Server Error: " + error.message);
    }
};

export const addUser = async (req, res) => {
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    try {
        const {
            name, employeeId, email, phone, altPhone, age, role, department,
            designation, salary, joiningDate, location, aadhar, pan,
            permanentAddress, currentAddress, note
        } = req.body;

        const file = req.file ? req.file.buffer : null;
        const fileType = req.file ? req.file.mimetype : null;

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid Email Format" });
        }

        const existing = await UserModel.findOne({ where: { email } });
        if (existing) {
            return res.status(409).json({ message: "Email already exists" });
        }

        await UserModel.create({
            name, employeeId, email, phone, altPhone, age, role, department,
            designation, salary, joiningDate, location, aadhar, pan,
            permanentAddress, currentAddress, note, file, fileType
        });

        return res.status(201).json({ message: "User Added Successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name, employeeId, email, phone, altPhone, age, role, department,
            designation, salary, joiningDate, location, aadhar, pan,
            permanentAddress, currentAddress, note
        } = req.body;

        const file = req.file ? req.file.buffer : null;
        const fileType = req.file ? req.file.mimetype : null;

        const user = await UserModel.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found!" });

        await user.update({
            name, employeeId, email, phone, altPhone, age, role, department,
            designation, salary, joiningDate, location, aadhar, pan,
            permanentAddress, currentAddress, note,
            ...(file && { file, fileType })
        });

        return res.status(200).json({ message: "User updated successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        await user.destroy();

        return res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getUserFile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);
        if (!user || !user.file) {
            return res.status(404).json({ message: "File not found" });
        }

        res.set('Content-Type', user.fileType || 'application/octet-stream');
        res.send(user.file);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving file", error });
    }
};
