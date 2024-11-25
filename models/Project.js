const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    appUrl: { type: String, required: true },
    techno: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Project', projectSchema);
