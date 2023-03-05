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
    });


const Model = model('Kpi', kpiSchema);
module.exports = Model;
