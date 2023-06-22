const roleModel = require('../model/role')

class Controller {
    // -------------------- Fetch All Roles
    async allRoles(req, res, next) {
        try {
            const roles = await roleModel.find({});
            res.status(200).json({ success: true, message: 'roles', data: roles });
        } catch (err) {
            next(err);
        }
    }

    // -------------------- Add Role
    async addRole(req, res) {

        // Check if the request body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "You must add Role name" });
        }

        // Check if the Role is already in the database 
        const roleExists = await roleModel.findOne({ name: req.body.name })
        if (roleExists) {            // 409 Conflict
            return res.status(409).json({ success: false, message: "Role already exists" })
        }

        const newrole = new roleModel({
            name: req.body.name.toLowerCase(),
        });

        // Save new Role to database
        try {
            const savedRole = await newrole.save();
            return res.status(201).json({ success: true, message: "New Role added successfully", data: savedRole });
        } catch (error) {
            next(error)
        }

    }

    // ---------------------  Update Role name
    async updateRoleName(req, res, next) {

        try {

            // Check if the request body is empty
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ success: false, message: "You must add Role name" });
            }

            // Check if the name already exists
            const roleExists = await roleModel.findOne({ name: req.body.name });
            if (roleExists) {
                return res.status(400).json({ message: 'Role already exists' });
            }

            // Update the Role by ID
            const roleData = await roleModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            res.status(200).json({ success: true, message: 'Data updated successfully', data: roleData });
        } catch (err) {
            next(err)
        }

    }



}




const controller = new Controller(); //Creating an instance from this class 
module.exports = controller; 