const adminModel = require('../model/admin')
const teamModel = require('../model/team')
const kpiModel = require('../model/kpi')
const projectModel = require('../model/projects')
const employeeModel = require('../model/employee')
const roleModel = require('../model/role')

class Controller {

    async anlaysisData(req, res, next) {
        try {
            const admin = await adminModel.find().countDocuments()
            const team = await teamModel.find().countDocuments()
            const kpi = await kpiModel.find().countDocuments()
            const project = await projectModel.find().countDocuments()
            const inProgressProject = await projectModel.find({ in_progress: true }).countDocuments()
            const archivedProject = await projectModel.find({ 'archive.archived': true }).countDocuments()
            const employee = await employeeModel.find().countDocuments()
            const role = await roleModel.find().countDocuments()

            res.status(200).json({
                success: true, message: 'Analysis_Numbers', data: {
                    'Trustworthy Bosses': admin
                    , 'Effective Groups': team
                    , 'Available Ratings': kpi
                    , 'Enthusiastic Employees': employee
                    , 'Actual Duties': role
                    , 'Taken Projects ': project
                    , 'Activities Ongoing': inProgressProject
                    , 'Archived Projects': archivedProject
                }
            });
        } catch (err) {
            next(err);
        }

    }

}



const controller = new Controller(); //Creating an instance from this class 
module.exports = controller;

