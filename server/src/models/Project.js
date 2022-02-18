const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = Schema(
    {
        title: { type: String, required: true, max: 100 },
        status: { type: String, required: true, max: 50, default: 'Open' },
        details: { type: String, required: true, min: 6, max: 255 },
        tickets: [{ type : Schema.Types.ObjectId, ref: 'Ticket' }]
    }
    , { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);