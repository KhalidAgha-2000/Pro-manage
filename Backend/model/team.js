const { model, Schema } = require('mongoose');

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
},
    {
        collection: 'teams',
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

teamSchema.virtual(
    'employees', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'team',
    options: {
        select: 'first_name last_name email image -team'// Specify the fields to be loaded from the employee document    
    }
}
)


teamSchema.virtual('projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'team',
    options: {
        select: 'name -team'// Specify the fields to be loaded from the project document    
    }
});

teamSchema.pre(['find', 'findOne'], function () {
    this.populate(['employees', 'projects'])
})

const Model = model('Team', teamSchema);
module.exports = Model;

