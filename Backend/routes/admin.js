var express = require('express')
var router = express.Router()
var group = require('express-group-routes');
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
// Group all admin routes

router.group('/admins', (adminRouter) => {

    // Use the authenticate middleware for all admin routes
    adminRouter.use(authenticate);

    // Group all image upload routes
    adminRouter.group('', (imageRouter) => {
        // Use the upload middleware for all image routes
        imageRouter.use(upload.single('image'));

        // ---------- Image Routes
        imageRouter.post('/add-admin', controller.addAdmin)
        imageRouter.put('/change-image/:id', controller.changeImage)
    });

    // ---------- Admin Routes
    adminRouter.post('/add-admin', upload.single('image'), controller.addAdmin)
    adminRouter.get('/all-admins', controller.allAdmin)
    adminRouter.get('/specific-admin/:id', controller.specificAdmin)
    adminRouter.put('/change-image/:id', upload.single('image'), controller.changeImage)
    adminRouter.put('/update-info/:id', controller.UpdateAdminInfo)
    adminRouter.delete('/remove-admin/:id', controller.deleteAdmin)
    adminRouter.put('/change-password/:id', controller.changePassword)

})
module.exports = router