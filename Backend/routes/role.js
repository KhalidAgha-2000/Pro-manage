var express = require('express')
var router = express.Router()
var group = require('express-group-routes');
var controller = require('../controller/role')
const { authenticate } = require('../middleware/authentication')

// Group all Role routes

router.group('/roles', (roleRouter) => {

    // Use the authenticate middleware for all Role routes
    roleRouter.use(authenticate);

    // ---------- Role Routes
    roleRouter.get('/all-roles', controller.allRoles)
    roleRouter.post('/add-role', controller.addRole)
    roleRouter.put('/update-role-name/:id', controller.updateRoleName)
    // roleRouter.delete('/remove-kpi/:id', controller.deleteKPI)
})

module.exports = router