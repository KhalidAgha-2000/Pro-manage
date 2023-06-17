var express = require('express')
var router = express.Router()
var group = require('express-group-routes');
var controller = require('../controller/employee')
const { authenticate } = require('../middleware/authentication')

// ------------ Multer to add Image
const multer = require('multer');
const path = require("path");

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("Unsupported file type!"), false);
            return;
        }
        cb(null, true);
    },
});

// Group all Employee routes

router.group('/employees', (employeeRouter) => {

    // Use the authenticate middleware for all Employee routes
    employeeRouter.use(authenticate);

    // Group all image upload routes
    employeeRouter.group('', (imageRouter) => {
        // Use the upload middleware for all image routes
        imageRouter.use(upload.single('image'));

        // ---------- Image Routes
        imageRouter.post('/add-employee', controller.addEmployee)
        imageRouter.put('/change-image/:id', controller.changeImage)
    });
    // ---------- Employee Routes
    employeeRouter.get('/all-employees', controller.allEmployees)
    employeeRouter.get('/all-employees-pagination', controller.employeesWithPagination)
    employeeRouter.get('/kpis-of-employee-report/:id', controller.KPIsOfEmployeeReport)
    employeeRouter.get('/roles-kpis-report/:id', controller.rolesAndKpisForReport)
    employeeRouter.get('/kpis-of-employee-update/:id', controller.KPIsOfEmployeeUpdate)
    employeeRouter.get('/specific-employee/:id', controller.specificEmployee)
    employeeRouter.put('/add-kpi-to-employee/:id', controller.addKpiToEmployee)
    employeeRouter.put('/assign-role-to-employee/:id', controller.assignRoleToEmployee)
    employeeRouter.put('/update-info/:id', controller.UpdateEmployeeInfo)
})

module.exports = router