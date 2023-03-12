const { model, Schema } = require('mongoose');

const kpiSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
},
    {
        collection: 'kpis',
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });


kpiSchema.virtual('employees', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'kpis.kpi',
})

const Model = model('Kpi', kpiSchema);
module.exports = Model;
