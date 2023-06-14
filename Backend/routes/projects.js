var express = require('express')
var router = express.Router()
var group = require('express-group-routes');
var controller = require('../controller/projects')
const { authenticate } = require('../middleware/authentication')

// Group all Project routes

router.group('/projects', (projectRouter) => {

    // Use the authenticate middleware for all Project routes
    projectRouter.use(authenticate);

    // ---------- Project Routes
    projectRouter.get('/all-projects', controller.allProjects)
    projectRouter.get('/specific-project/:id', controller.specificProject)
    projectRouter.get('/get-employees-with-roles-of-project/:id', controller.getEmployeesWithRolesOfProject)
    projectRouter.post('/add-project', controller.addProject)
    projectRouter.put('/update-project-name/:id', controller.updateProjectName)
    projectRouter.put('/change-project-status/:id', controller.changeProjectStatus)
    projectRouter.put('/archive-project/:id', controller.archiveProject)
    projectRouter.put('/change-team/:id', controller.changeTeamOfProject)
})

module.exports = router