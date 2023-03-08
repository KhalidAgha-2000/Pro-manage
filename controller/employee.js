const employeeModel = require('../model/employee')
const kpiModel = require('../model/kpi')
const cloudinary = require('cloudinary').v2
const ObjectID = require('mongodb').ObjectId
require('dotenv').config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})


class Controller {

    // -------------------- Fetch All Employees
    async allEmployees(req, res, next) {
        try {
            const employees = await employeeModel.find({}, '-kpis');
            res.status(200).json({ success: true, message: 'Employees', data: employees });
        } catch (err) {
            next(err);
        }
    }

    // -------------------- Fetch Specific Employee
    async specificEmployee(req, res, next) {
        try {
            const employee = await employeeModel.findById(req.params.id).populate('kpis.kpi')

            res.status(200).json({ success: true, message: 'Employee Information!', data: employee });
        } catch (err) {
            next(err);
        }
    }

    // -------------------- Delete
    async deleteEmployee(req, res, next) {
        try {
            // *-*-*-*-*-*--*-*-*-*if
            // *-*-*-*-*-*--*-*-*-*there
            // *-*-*-*-*-*--*-*-*-*is 
            // *-*-*-*-*-*--*-*-*-*no team

            // Delete employee from database
            const deletedEmployee = await employeeModel.findByIdAndDelete(req.params.id);

            if (!deletedEmployee) {
                return res.status(404).json({ message: "Employee not found" });
            }

            res.status(200).json({ success: true, message: "Employee removed from database!" });
        } catch (err) {
            next(err);
        }
    };

    // ---------------------  Change Image
    async changeImage(req, res, next) {
        // Upload image to Cloudinary
        let imageUploadResult;
        try {
            imageUploadResult = await cloudinary.uploader.upload(req.file.path);
        } catch (error) {
            return res.status(400).json({ success: false, message: "Add image to upload image !" });
        }

        try {
            const updatedData = await employeeModel.updateOne(
                { _id: req.params.id },
                { $set: { image: imageUploadResult.secure_url, } },
                { new: true }
            );
            res.status(200).json({ success: true, message: 'Data updated successfully', data: updatedData });
        } catch (err) {
            res.status(500).json({ success: false, message: "Failed to Update!" });
        }
    }

    // ---------------------  Change Basic Info -*-* name, email, phone,
    async UpdateEmployeeInfo(req, res, next) {

        try {
            // Check if the email already exists
            const employeeExists = await employeeModel.findOne({ email: req.body.email });
            if (employeeExists) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Update the employee by ID
            const newemployeeData = await employeeModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            res.status(200).json({ success: true, message: 'Data updated successfully', data: newemployeeData });
        } catch (err) {
            res.status(500).json({ success: false, message: "Failed to Update!" });
        }

    }

    // -------------------- Add Employee
    async addEmployee(req, res, next) {

        // Check if the Employee Email is already in the database 
        const employeeExists = await employeeModel.findOne({ email: req.body.email })
        if (employeeExists) {
            // 409 Conflict
            return res.status(409).json({ success: false, message: "Email already exists" })
        }

        //Check length of phone number
        if (!/^\d{8}$/.test(req.body.phone)) {
            return res.status(500).json({ success: false, message: "Please enter a valid phone number (8) digits" })
        }
        // Upload image to Cloudinary
        // let imageUploadResult;
        // try {
        //     imageUploadResult = await cloudinary.uploader.upload(req.file.path);
        // } catch (error) {
        //     return res.status(400).json({ success: false, message: "Image is required" });
        // }

        // Create new admin
        const newEmployee = new employeeModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.body.image,
        });

        // Save new Employee to database
        try {
            const savedEmployee = await newEmployee.save();
            return res.status(201).json({ success: true, message: "Employee added successfully", employee: savedEmployee });
        } catch (error) {
            next(error)
            return res.status(500).json({ success: false, message: "Failed to add Employee" });
        }
    }

    // -------------------- Add KPI to Employee
    async addKpiToEmployee(req, res) {

        try {
            const employeeWithKpi = await employeeModel.findByIdAndUpdate(
                req.params.id,
                {
                    $push: {
                        kpis: {
                            kpi: req.body.kpiId,
                            rate: req.body.kpiRate,
                            kpiDate: new Date().toLocaleString()
                        }
                    }
                },
                { new: true }
            ).populate('kpis.kpi');

            return res.status(200).json({ success: true, message: 'KPI added to employee', employee: employeeWithKpi });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    };

    // -------------------- Get All KPIs Of Specific Employee with date sorting 
    async getKPIsOfspecificEmployee(req, res, next) {
        try {
            let objectId = new ObjectID(req.params.id);
            const employee = await employeeModel.aggregate([
                { $match: { _id: objectId } },

                // Unwind the kpis array to create separate documents for each element
                { $unwind: "$kpis" },

                // Perform a left outer join with the kpis collection using the kpi field in the kpis array
                // and the _id field in the kpis collection
                {
                    $lookup: {
                        from: "kpis",
                        localField: "kpis.kpi",
                        foreignField: "_id",
                        as: "kpis.kpi"
                    }
                },
                // Unwind the resulting array from the lookup operation
                { $unwind: "$kpis.kpi" },

                // Add a new field to the kpis array to store the name of the kpi from the kpis collection
                { $addFields: { "kpis.kpi_name": "$kpi.name", fullName: { $concat: ["$first_name", " ", "$last_name"] } } },

                // Sort the kpis elements in descending order by kpiDate
                { $sort: { "kpis.kpiDate": -1 } },
                // Group the documents by the employee ID again and create a new kpis array with all kpis elements
                { $group: { _id: "$_id", fullName: { $first: "$fullName" }, kpis: { $push: "$kpis" } } }

            ]);
            if (employee.length === 0) {
                return res.status(500).json({ success: true, message: 'No KPI for this employee yet' });
            }

            return res.status(200).json({ success: true, message: "KPI(S) of the employee", data: employee[0] });
        } catch (err) {
            next(err)
        }
    };

}


const controller = new Controller(); //Creating an instance from this class 
module.exports = controller;


