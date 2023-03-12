var express = require('express')
var router = express.Router()
var controller = require('../controller/registration')

router.post('/login', controller.login)
router.post('/logout', controller.logout)



module.exports = router