const { model, Schema } = require('mongoose');

const employeeSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    kpis: [
        {
            kpi: {
                type: Schema.Types.ObjectId,
                ref: 'Kpi',
            },
            rate: {
                type: Number,
                min: 1,
                max: 10
            },
            kpiDate: {
                type: Intl,
                // type: Date,
            }
        }
    ],
    // team: {
    //    type: Schema.Types.ObjectId,
    //     ref: 'Team',
    //     default: null
    // },
},
    {
        collection: 'Employees',
        timestamps: true,
    }
);

const Model = model('Employee', employeeSchema);
module.exports = Model;
