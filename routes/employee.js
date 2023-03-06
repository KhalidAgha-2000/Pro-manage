var express = require('express')
var router = express.Router()
var group = require('express-group-routes');
var controller = require('../controller/employee')
const { authenticate } = require('../middleware/authentication')

// Group all Employee routes

router.group('/employees', (employeeRouter) => {

    employeeRouter.get('/kpis-of-specific-employee/:id', controller.getKPIsOfspecificEmployee)
    // Use the authenticate middleware for all Employee routes
    employeeRouter.use(authenticate);
    
    // ---------- Employee Routes
    employeeRouter.post('/add-employee', controller.addEmployee)
    employeeRouter.get('/all-employees', controller.allEmployees)
    employeeRouter.get('/specific-employee/:id', controller.specificEmployee)
    employeeRouter.put('/add-kpi-to-employee/:id', controller.addKpiToEmployee)
})

module.exports = router