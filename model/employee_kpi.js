const { model, Schema } = require('mongoose');

const employeeKpiSchema = new Schema({
    rate: {
        type: Number,
        default: 1
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    kpi: {
        type: Schema.Types.ObjectId,
        ref: 'Kpi',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    {
        collection: 'employeesKpis',
        timestamps: true,
    }
);

const Model = model('EmployeeKpiSchema', employeeKpiSchema);
module.exports = Model;
