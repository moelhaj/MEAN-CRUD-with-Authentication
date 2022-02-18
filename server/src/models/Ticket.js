const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = Schema(
    {
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        title: { type: String, required: true, max: 100 },
        severity: { type: String, required: true, max: 50 },
        status: { type: String, required: true, max: 50, default: 'Open' },
        details: { type: String, required: true, min: 6, max: 255 },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    }
    , { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);