const { model, Schema } = require('mongoose');

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
},
    {
        collection: 'rols',
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });



const Model = model('Role', roleSchema);
module.exports = Model;
