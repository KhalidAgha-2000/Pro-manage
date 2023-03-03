const { model, Schema } = require('mongoose')

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
        required: false
    }
},
    {
        collection: 'admins',
        timestamps: true,
    }
)

const Model = model('Admin', adminSchema);
module.exports = Model;