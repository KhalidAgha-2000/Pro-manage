const teamModel = require('../model/team')
const employeeModel = require('../model/employee')

class Controller {
    // -------------------- Fetch All Teams
    async allTeams(req, res, next) {
        try {
            const teams = await teamModel.find({})
            const teamData = teams.map(team => ({
                _id: team._id,
                name: team.name,
                numberOfEmployees: team.employees.length,
                numberOfProjects: team.projects.length,
                projects: team.projects,
                employees: team.employees
            }));
            res.status(200).json({ success: true, message: 'All Teams', data: teamData });
        } catch (err) {
            next(err);
        }
    }

    // -------------------- Fetch Specific Team
    async specificTeam(req, res, next) {
        try {
            const team = await teamModel.findById(req.params.id).populate('employees')
            if (!team) {
                return res.status(404).json({ success: false, message: "Team not found" });
            }
            res.status(200).json({ success: true, message: 'Team Information', numberOfProjects: team.projects.length, numberOfEmployees: team.employees.length, data: team });
        } catch (err) {
            next(err);
        }
    }
    // -------------------- Add Kpi
    async addTeam(req, res) {

        // Check if the request body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "You must add name for the team" });
        }

        // Check if the team name is already in the database 
        const teamExists = await teamModel.findOne({ name: req.body.name })
        if (teamExists) {
            // 409 Conflict
            return res.status(409).json({ success: false, message: "Team already exists" })
        }

        const newTeam = new teamModel({
            name: req.body.name.toLowerCase(),
        });

        // Save new Team to database
        try {
            const savedTeam = await newTeam.save();
            return res.status(201).json({ success: true, message: "New Team added successfully", data: savedTeam });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Failed to add Team" });
        }

    }

    // -------------------- Delete / Check if team does not has employee(s)
    async deleteTeam(req, res, next) {
        try {
            const team = await teamModel.findById(req.params.id).populate('employees')

            if (!team) {
                return res.status(404).json({ success: false, message: "Team not found" });
            }

            // Check if Team has employees
            if (team.employees && team.employees.length > 0) {
                res.status(403).json({ success: false, message: "This Team has a list of employees, cannot be deleted" });
            }
            else if (team.projects && team.projects.length > 0) {
                res.status(403).json({ success: false, message: "This Team is assigned to project(s), cannot be deleted" });
            }
            else {
                // Delete Team from database
                const deletedTeam = await teamModel.findByIdAndDelete(req.params.id);

                if (!deletedTeam) {
                    return res.status(404).json({ success: false, message: "Team not found" });
                }

                res.status(200).json({ success: true, message: "Team removed from database!" });
            }
        } catch (err) {
            next(err);
            return res.status(500).json({ success: false, message: "Failed to add Team", error: err });
        }
    };

    // -------------------- Assign Team To Employees
    async assignTeamToemployee(req, res, next) {
        try {
            let { id } = req.params;
            const teamm = await teamModel.findById(id);
            const employee = await employeeModel.findById(req.body.employeeId);

            if (!employee) {
                return res.status(404).json({ success: false, message: "Employee not found" });
            }

            if (!teamm) {
                return res.status(404).json({ success: false, message: "Team not found" });
            }

            // if (employee.team && employee.team !== id) {
            //     const assignedTeam = await teamModel.findById(employee.team);
            //     return res.status(409).json({ success: false, message: `Employee ${employee.Employee_Name} is already assigned to team: ${assignedTeam.name}`, employeeData: employee });
            // }

            employee.team = id;
            await employee.save();

            return res.status(200).json({ success: true, data: employee, id: req.body.employeeId, team: teamm.name, message: `Employee ${employee.Employee_Name} has been successfully assigned to team: ${teamm.name}` });
        } catch (err) {
            next(err)
            return res.status(500).json({ success: false, message: "Failed to add Team", error: err });
        }
    }


    // ---------------------  Update Team name
    async updateTeamName(req, res, next) {

        try {

            // Check if the request body is empty
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ success: false, message: "You must add Team name" });
            }

            // Check if the name already exists
            const teamExists = await teamModel.findOne({ name: req.body.name });
            if (teamExists) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Update the Team by ID
            const teamData = await teamModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            res.status(200).json({ success: true, message: 'Data updated successfully', data: teamData });
        } catch (err) {
            next(err)
            // res.status(500).json({ success: false, message: "Failed to Update!" });
        }

    }
}


const controller = new Controller(); //Creating an instance from this class 
module.exports = controller; 