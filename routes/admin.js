var express = require('express')
var router = express.Router()
var controller = require('../controller/admin')
const { authenticate } = require('../middleware/authentication')

router.post('/add-admin',authenticate, controller.addAdmin)



module.exports = router