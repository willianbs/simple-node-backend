const mongoose = require('mongoose');

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId, //pega o objectID e salva 
        ref: 'File' //model
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Box', Box);
