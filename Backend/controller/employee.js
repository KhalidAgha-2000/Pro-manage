const employeeModel = require('../model/employee')
const projectModel = require('../model/projects')
const roleModel = require('../model/role')
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
            const employees = await employeeModel.find({}, '-kpis -roles').populate('team')
            const data = employees.map(e => ({
                id: e.id,
                first_name: e.first_name,
                last_name: e.last_name,
                Employee_Name: e.Employee_Name,
                email: e.email,
                phone: e.phone,
                image: e.image,
                teamID: e.team ? e.team._id : null,
                team: e.team ? e.team.name : null, // replace team ID with team name
            }))


            res.status(200).json({ success: true, message: 'Employees', data: data });
        } catch (err) {
            res.status(500).json({ message: 'Server error', err });
        }
    }
    // -------------------- Fetch All Employees with Pagination
    async employeesWithPagination(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;

            // get the number of items to display per page from the query string
            const perPage = parseInt(req.query.perPage) || 5;

            // calculate the starting and ending indexes for the current page
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const employees = await employeeModel.find({}, '-kpis -roles')
                .populate('team')
                .sort({ first_name: 1 })
                .skip(startIndex)
                .limit(perPage);

            const data = employees.map(e => ({
                id: e.id,
                first_name: e.first_name,
                last_name: e.last_name,
                Employee_Name: e.Employee_Name,
                email: e.email,
                phone: e.phone,
                image: e.image,
                team: e.team ? e.team.name : null, // replace team ID with team name
            }))
            const totalEmployees = await employeeModel.countDocuments({})

            res.status(200).json({
                success: true,
                message: "Pagination for Employees",
                data: data,
                currentPage: page,
                endIndex: endIndex,
                perPage: perPage,
                totalPages: Math.ceil(totalEmployees / perPage),
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
    // -------------------- Fetch Specific Employee
    async specificEmployee(req, res, next) {
        try {
            const employee = await employeeModel.findById(req.params.id)
                // .populate('team')
                .populate(['roles.role', 'roles.project', 'team', 'kpis.kpi'])
                .exec()

            let data = {
                _id: employee._id,
                first_name: employee.first_name,
                last_name: employee.last_name,
                email: employee.email,
                phone: employee.phone,
                image: employee.image,
                team: employee.team ? employee.team._id : null,
                teamName: employee.team ? employee.team.name : null,
                teamEmployeeCount: employee.team ? employee.team.employees.length : null,
                teamProjectCount: employee.team ? employee.team.projects.length : null,

                roles: employee.roles ? employee.roles.map(rr => ({
                    role: rr.role,
                    project: {
                        id: rr.project._id,
                        name: rr.project.name
                    }
                })) : null
            };

            res.status(200).json({ success: true, message: 'Employee Information!', data: data });
        } catch (err) {
            next(err);
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
            const updatedData = await employeeModel.updateOne(
                { _id: req.params.id },
                { $set: { image: imageUploadResult.secure_url, } },
                { new: true }
            );
            res.status(200).json({ success: true, message: 'Data updated successfully', id: req.params.id, data: { image: imageUploadResult.secure_url } });
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
            const newEmployeeData = await employeeModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            res.status(200).json({ success: true, message: 'Data updated successfully', data: newEmployeeData });
        } catch (err) {
            next(err)
            res.status(500).json({ success: false, message: "Failed to Update!", err });
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
        // if (req.body.phone.toString().length < 8) {
        if (!/^\d{8}$/.test(req.body.phone.toString())) {
            return res.status(500).json({ success: false, message: "Please enter a valid phone number (8) digits" })
        }
        // Upload image to Cloudinary
        let imageUploadResult;
        try {
            imageUploadResult = await cloudinary.uploader.upload(req.file.path);
        } catch (error) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        // Create new admin
        const newEmployee = new employeeModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            image: imageUploadResult.secure_url,
        });

        // Save new Employee to database
        try {
            const savedEmployee = await newEmployee.save();
            return res.status(201).json({ success: true, message: "Employee added successfully", employee: savedEmployee });
        } catch (error) {
            next(error)
            return res.status(400).json({ success: false, message: "Fields are required" });
        }
    }

    // -------------------- Add KPI to Employee
    async addKpiToEmployee(req, res, next) {

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
                }, { new: true }).populate('kpis.kpi');

            const updatedKpis = employeeWithKpi.kpis.map(k => ({
                id: k.kpi._id,
                name: k.kpi.name,
                rate: k.rate,
                kpiDate: k.kpiDate
            }));


            return res.status(200).json({
                id: req.params.id,
                success: true,
                message: 'KPI added to employee',
                kpis: updatedKpis,
            });


        } catch (error) {
            next(error)
            return res.status(500).json({ success: false, message: 'Server error', error });
        }
    };
    // -------------------- Get All KPIs Of Employee with date sorting to update
    async KPIsOfEmployeeUpdate(req, res, next) {
        try {
            const employee = await employeeModel.findById(req.params.id)
                // .populate('team')
                .populate(['kpis.kpi'])
                .exec()

            let data = {
                id: employee._id,
                // Combination of Map and values to remove the duplicates
                // while keeping only the last occurrence based on kpiDate.
                // The sort method is used to order the KPIs by date, with the latest KPI first.

                kpis: employee.kpis
                    ? [...new Map(employee.kpis.map(k => [k.kpi._id, k])).values()]
                        .sort((a, b) => new Date(b.kpiDate) - new Date(a.kpiDate))
                        .map(k => ({
                            id: k.kpi._id,
                            name: k.kpi.name,
                            rate: k.rate,
                            kpiDate: k.kpiDate,
                        }))
                    : null,
            };

            res.status(200).json({ success: true, message: 'Employee Information!', data: data });
        } catch (err) {
            next(err);
            res.status(500).json({ success: false, message: 'Server Error!', err });
        }
    }
    // -------------------- Get All KPIs Of Employee with date sorting to make reports
    async KPIsOfEmployeeReport(req, res, next) {
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

            ])

            return res.status(200).json({
                success: true,
                message: "KPI(S) of the employee",
                // data: employee[0]
                data: employee.length === 0 ? 'No KPI for this employee yet' : employee[0]
            });
        } catch (err) {
            next(err)
        }
    };


    // -------------------- Assign Role To Employee 
    async assignRoleToEmployee(req, res, next) {

        try {
            const project = await projectModel.findById({ _id: req.params.id });
            const employee = await employeeModel.findById({ _id: req.body.employeeID }).populate('roles.role');
            const role = await roleModel.findById({ _id: req.body.roleID });

            if (!project) {
                return res.status(404).json({ success: false, message: "Project not found" });
            }
            if (!employee) {
                return res.status(404).json({ success: false, message: "Employee not found" });
            }
            if (!role) {
                return res.status(404).json({ success: false, message: "Role not found" });
            }
            employee.roles.push({ project: project._id, role: role._id });
            await employee.save();

            const response = {
                status: 200,
                message: 'Role assigned',
            }
            res.status(200).json(response);
        } catch (err) {
            next(err)
        }
    }

    // -------------------- Get All Roles Of Employee to make reports
    async rolesAndKpisForReport(req, res, next) {
        try {
            const employee = await employeeModel.findById(req.params.id)
                .populate(['roles.role', 'roles.project', 'kpis.kpi', 'team'])
                .exec()

            let data = {
                _id: employee._id,
                first_name: employee.first_name,
                last_name: employee.last_name,
                Employee_Name: employee.Employee_Name,
                image: employee.image,

                roles: employee.roles ? employee.roles.map(rr => ({
                    rolesInProject: {
                        roleId: rr.role._id,
                        projectId: rr.project._id,
                        roleName: rr.role.name,
                        projectName: rr.project.name
                    },
                })) : null,

                // Get the rates of one kpi
                kpis: employee.kpis
                    ? employee.kpis.reduce((result, kp) => {
                        const existingKPI = result.find((item) => item.kpi._id.equals(kp.kpi._id));
                        if (existingKPI) {
                            existingKPI.rates.push({
                                rate: kp.rate,
                            });
                        } else {
                            result.reverse().push({
                                kpi: {
                                    _id: kp.kpi._id,
                                    name: kp.kpi.name,
                                },
                                rates: [
                                    {
                                        rate: kp.rate,
                                    },
                                ],
                            });
                        }
                        return result;
                    }, []).map(item => {
                        item.rates.reverse(); // Reverse the rates array to get last rate
                        return item;
                    })
                    : null,

            }

            res.status(200).json({ success: true, message: 'Employee Information!', data: data });
        } catch (err) {
            next(err);
        }
    }

}


const controller = new Controller(); //Creating an instance from this class 
module.exports = controller;

