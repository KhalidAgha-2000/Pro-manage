const bcrypt = require('bcryptjs')
const adminModel = require('../model/admin')
const cloudinary = require('cloudinary').v2
require('dotenv').config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})


class Controller {
    // -------------------- Fetch All Admins
    async allAdmin(req, res, next) {

        try {
            const admins = await adminModel.find({}, '-password');
            res.status(200).json({ success: true, message: 'Admins', data: admins });
        } catch (err) {
            next(err);
        }
    }

    // -------------------- Fetch Specific Admin
    async specificAdmin(req, res, next) {
        try {
            const admin = await adminModel.findById(req.params.id, '-password');
            res.status(200).json({ success: true, message: 'Admin Information!', data: admin });
        } catch (err) {
            next(err);
        }
    }


    // -------------------- Add 
    async addAdmin(req, res) {

        // Check if the adminName is already in the database 
        const adminExists = await adminModel.findOne({ email: req.body.email })
        if (adminExists) {
            // 409 Conflict
            return res.status(409).json({ success: false, message: "Email already exists" })
        }

        //Check length of password && Hash password
        if (req.body.password.length < 6) {
            return res.status(500).json({ success: false, message: "Password is too short, insert at least 6 characters." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Upload image to Cloudinary
        let imageUploadResult;
        try {
            imageUploadResult = await cloudinary.uploader.upload(req.file.path);
        } catch (error) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        // Create new admin
        const newAdmin = new adminModel({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            image: imageUploadResult.secure_url,
        });

        // Save new admin to database
        try {
            const savedAdmin = await newAdmin.save();
            return res.status(201).json({ success: true, message: "Admin added successfully", admin: savedAdmin });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Failed to add admin" });
        }
    }

    // -------------------- Edit
    async UpdateAdminInfo(req, res, next) {

        try {
            // Check if the email already exists
            const adminExists = await adminModel.findOne({ email: req.body.email });
            if (adminExists) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Check if the request body is empty
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ success: false, message: "You must fill input" });
            }
            // Update the admin by ID
            const newAdminData = await adminModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            res.status(200).json({ success: true, message: 'Data updated successfully', data: newAdminData });
        } catch (err) {
            res.status(500).json({ success: false, message: "Failed to Update!", err });
        }

    }

    // -------------------- Delete
    async deleteAdmin(req, res, next) {
        try {
            const adminId = req.params.id;

            // Check if admin is trying to delete themselves
            if (req.admin.id === adminId) {
                return res.status(403).json({ message: "You cannot delete yourself" });
            }

            // Delete admin from database
            const deletedAdmin = await adminModel.findByIdAndDelete(adminId);

            if (!deletedAdmin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            res.status(200).json({ success: true, message: "Admin removed from database!" });
        } catch (err) {
            next(err);
        }
    };

    // -------------------- Change Password
    async changePassword(req, res, next) {
        try {

            const admin = await adminModel.findById(req.params.id);
            const isMatch = await bcrypt.compare(req.body.oldPassword, admin.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Incorrect old password" });
            }

            //Check length of password && Hash password
            if (req.body.newPassword.length < 6) {
                return res.status(500).json({ success: false, message: "Password is too short, insert at least 6 characters." })
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
            const updatedData = await adminModel.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: { password: hashedPassword } },
                { new: true }
            );
            res.status(200).json({ success: true, message: "Password changed successfully", data: updatedData });
        } catch (err) {
            res.status(500).json({ success: false, message: "Failed to Update!", err });
        }
    }

    // ---------------------  Change Image
    async changeImage(req, res, next) {
        // Upload image to Cloudinary
        let imageUploadResult;
        try {
            imageUploadResult = await cloudinary.uploader.upload(req.file.path);
        } catch (error) {
            return res.status(400).json({ success: false, message: "Add image to upload !" });
        }

        try {
            const updatedData = await adminModel.updateOne(
                { _id: req.params.id },
                { $set: { image: imageUploadResult.secure_url, } },
                { new: true }
            );
            res.status(200).json({ success: true, message: 'Data updated successfully', id: req.params.id, data: { image: imageUploadResult.secure_url } });
        } catch (err) {
            res.status(500).json({ success: false, message: "Failed to Update!" });
        }
    }

}


const controller = new Controller(); //Creating an instance from this class 
module.exports = controller; 
