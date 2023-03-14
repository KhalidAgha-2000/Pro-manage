const adminModel = require('../model/admin')
const teamModel = require('../model/team')
const kpiModel = require('../model/kpi')
const projectModel = require('../model/projects')
const employeeModel = require('../model/employee')
const roleModel = require('../model/role')

class Controller {

    async anlaysisData(req, res, next) {
        try {
            const admin = await adminModel.find()
            const team = await teamModel.find()
            const kpi = await kpiModel.find()
            const project = await projectModel.find()
            const inProgressProject = await projectModel.find({ in_progress: true })
            const archivedProject = await projectModel.find({ 'archive.archived': true })
            const employee = await employeeModel.find()
            const role = await roleModel.find()

            const adminCount = admin.length;
            const teamCount = team.length;
            const kpiCount = kpi.length;
            const projectCount = project.length;
            const employeeCount = employee.length;
            const roleCount = role.length;
            const inProgressProjectCount = inProgressProject.length;
            const archivedProjectCount = archivedProject.length;
            res.status(200).json({
                success: true, message: 'Analysis_Numbers', data: {
                    'Trustworthy Bosses': adminCount
                    , 'Effective Groups': teamCount
                    , 'Available Ratings': kpiCount
                    , 'Enthusiastic Employees': employeeCount
                    , 'Actual Duties': roleCount
                    , 'Taken Projects ': projectCount
                    , 'Activities Ongoing': inProgressProjectCount
                    , 'Archived Projects': archivedProjectCount
                }
            });
        } catch (err) {
            next(err);
        }

    }

}



const controller = new Controller(); //Creating an instance from this class 
module.exports = controller; 
