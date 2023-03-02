const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const adminModel = require('../model/admin')


class Controller {
    // -------------------- Login
    async login(req, res, next) {

        //check if admin exists in database 
        const admin = await adminModel.findOne({ email: req.body.email })
        if (!admin) return res.status(404).json({ success: false, message: 'Invalid credential !' })

        //Validate password with the hashed one in database 
        bcrypt.compare(req.body.password, admin.password, function (err, isMatch) {

            if (err) throw err

            else if (!isMatch) {
                res.status(404).json({ success: false, message: 'Invalid credential !' })
            }

            else {
                const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SCERET, { expiresIn: 60 * 60 })

                res
                    .setHeader('Authorization', 'Bearer ' + token)
                    .cookie('token', token).json({ success: true, message: "Successfully LogedIn !", data: admin, token: token })
            }
        })
    }

    logout(req, res) {
        res
            .clearCookie("token")
            .status(200)
            .header('Cache-Control', 'no-cache')
            .json({ success: true, message: "Successfully logged out" });
    }
}

const controller = new Controller(); //Creating an instance from this class 
module.exports = controller; 
