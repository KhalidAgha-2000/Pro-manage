var express = require('express')
var router = express.Router()
var group = require('express-group-routes');
var controller = require('../controller/kpi')
const { authenticate } = require('../middleware/authentication')

// Group all KPI routes

router.group('/kpis', (kpiRouter) => {

    // Use the authenticate middleware for all KPI routes
    kpiRouter.use(authenticate);

    // ---------- KPI Routes
    kpiRouter.get('/all-kpis', controller.allKpis)
    kpiRouter.post('/add-kpi', controller.addKpi)
    kpiRouter.put('/update-kpi-name/:id', controller.updateKPIName)
    kpiRouter.delete('/remove-kpi/:id', controller.deleteKPI)
})

module.exports = router