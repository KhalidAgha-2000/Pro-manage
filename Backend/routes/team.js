var express = require('express')
var router = express.Router()
var group = require('express-group-routes');
var controller = require('../controller/team')
const { authenticate } = require('../middleware/authentication')

// Group all Team routes

router.group('/teams', (teamRouter) => {

    // Use the authenticate middleware for all Team routes
    teamRouter.use(authenticate);

    // ---------- Team Routes
    teamRouter.get('/all-teams', controller.allTeams)
    teamRouter.get('/specific-team/:id', controller.specificTeam)
    teamRouter.post('/add-team', controller.addTeam)
    teamRouter.put('/assign-team-to-employee/:id', controller.assignTeamToemployee)
    teamRouter.put('/update-team-name/:id', controller.updateTeamName)
    teamRouter.delete('/remove-team/:id', controller.deleteTeam)
})

module.exports = router