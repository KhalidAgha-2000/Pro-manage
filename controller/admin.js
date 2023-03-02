const bcrypt = require('bcryptjs')
const adminModel = require('../model/admin')


class Controller {

    // -------------------- Add
    async addAdmin(req, res) {

        // Check if the adminName is already in the database 
        const adminExists = await adminModel.findOne({ email: req.body.email })
        if (adminExists) return res.json({ success: false, message: "Admin already exists" })

        //  Hashing a password
        const salt = await bcrypt.genSalt(10); //The salt will hash the password and create a string password of dfault complexity of 10
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //  Admin creation if no error in Admin data enetered 
        const admin = new adminModel({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        })
        try {
            const savedAdmin = await admin.save() //This is to save the entered admin data once post request is finished 
            res.status(200).json({ success: true, message: "Successfully Created", admins: savedAdmin })
        }
        catch (err) {
            res.send({ message: 'Oops! An error occurred' })
        }
    }

    
}


const controller = new Controller(); //Creating an instance from this class 
module.exports = controller; 
