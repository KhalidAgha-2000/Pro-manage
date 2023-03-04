var express = require('express')
var router = express.Router()
var controller = require('../controller/admin')
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

// ---------- Admin Routes
router.get('/all-admins',  authenticate, controller.allAdmin)
router.get('/specific-admin/:id',  authenticate, controller.specificAdmin)
router.post('/add-admin', upload.single('image'), authenticate, controller.addAdmin)
router.post('/update-info/:id', authenticate, controller.UpdateAdminInfo)
router.delete('/remove-admin/:id', authenticate, controller.deleteAdmin)
router.put('/change-password/:id', authenticate, controller.changePassword)
router.put('/change-image/:id', upload.single('image'), authenticate, controller.changeImage)



module.exports = router