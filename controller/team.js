const teamModel = require('../model/team')
const employeeModel = require('../model/employee')

class Controller {
    // -------------------- Fetch All Teams
    async allTeams(req, res, next) {
        try {
            const teams = await teamModel.find({}, '-employee');
            // const teams = await teamModel.find({}, '-employee');
            // const teamsWithCount = teams.map(team => {
            //     return {
            //         ...team,
            //         employeeCount: team.employee.length || 0
            //     }
            // });
            res.status(200).json({ success: true, message: 'Teams', data: teams });
        } catch (err) {
            next(err);
        }
    }

    // -------------------- Fetch Specific Team
    async specificTeam(req, res, next) {
        try {
            const team = await teamModel.findById(req.params.id)
            // .populate({
            //     path: 'employee',
            //     select: `first_name last_name`
            //  });
            res.status(200).json({ success: true, message: 'Team Information', data: team });
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

    // -------------------- Delete
    async deleteKpi(req, res, next) {
        try {

            // Delete KPI from database
            const deletedKpi = await teamModel.findByIdAndDelete(req.params.id);

            if (!deletedKpi) {
                return res.status(404).json({ success: false, message: "KPI not found" });
            }

            res.status(200).json({ success: true, message: "KPI removed from database" });
        } catch (err) {
            next(err);
        }
    };

    // -------------------- Assign employees To Team

    async assignEmployeeToTeam(req, res, next) {
        try {
            // First, check if the employee is already assigned to a team
            const existingEmployee = await employeeModel.findOne({ _id: req.body.employeeId });
            if (existingEmployee.team) {
                if (existingEmployee.team.toString() === req.params.id) {
                    return res.send({ success: false, message: 'Employee is already assigned to this team' })
                } else {
                    return res.send({ success: false, message: 'Employee is already assigned to another team' })
                }
            }


            // If the employee is not assigned to a team, add them to the new team
            const updatedEmployee = await employeeModel.findOneAndUpdate(
                { _id: employeeId },
                { team: req.params.id },
                { new: true }
            ).populate({ path: 'team' });

            return res.send({ success: true, message: 'Employee has been added to the team', data: updatedEmployee })
        } catch (err) {
            console.error(err);
            return res.send({ success: false, message: 'Failed to add employee to team' })
        }
        // try {

        //     const employee = await employeeModel.findById(req.body.employeeID);
        //     if (!employee) {
        //         res.status(404).json({ success: false, message: "Employee not found" })
        //         return
        //     }

        //     const team = await teamModel.findById(req.params.id);
        //     if (!team) {
        //         res.status(404).json({ success: false, message: "Team not found" })
        //         return
        //     }

        //     // ------------ Check if employee already in the team
        //     if (team.employee.includes(req.body.employeeID)) {
        //         res.status(409).json({ success: false, message: "Employee is already in the team" })
        //         return
        //     }

        //     team.employee.push(req.body.employeeID);
        //     const updatedTeam = await team.save();


        //     res.status(201).json({ success: true, message: "Employee successfully assigned to the team", data: updatedTeam })
        // } catch (err) {
        //     next(err);
        // }
    }


}




const controller = new Controller(); //Creating an instance from this class 
module.exports = controller; 