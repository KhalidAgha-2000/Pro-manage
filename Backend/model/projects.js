const { model, Schema } = require('mongoose');

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    in_progress: {
        type: Boolean,
        required: true,
        default: false,
    },
    archive: {
        archived: {
            type: Boolean,
            required: false,
            default: false,
        },
        arcivedDate: {
            type: Intl,
        }
    },

    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    }
},
    {
        collection: 'projects',
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });



const Model = model('Project', projectSchema);
module.exports = Model;


