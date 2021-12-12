const mongoose = require('mongoose')

const jogadoresSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: {
        type: String,
        require: true
    },
    apelido: {
        type: String,
        required: false
    },
    camisa: {
        type: Number,
        required: false
    },
    clube: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'clube'
    }
})

module.exports = mongoose.model('jogadores', jogadoresSchema)