const { model, Schema } = require('mongoose');

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    // employee: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Employee',
    // }],
},
    {
        collection: 'teams',
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);



teamSchema.virtual('employee', {
    ref: 'Employee',//Model to populate from 
    localField: '_id', // field in Current Model = Category
    foreignField: 'team',// field in Book Model
})
const Model = model('Team', teamSchema);
module.exports = Model;
