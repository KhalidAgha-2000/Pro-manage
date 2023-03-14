var express = require('express')
var router = express.Router()
var controller = require('../controller/analysis')
const { authenticate } = require('../middleware/authentication')


// ---------- Admin Routes
router.get('/analysis-data', authenticate, controller.anlaysisData)


module.exports = router