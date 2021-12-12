const mongoose = require('mongoose')

const sociosSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    loguin: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    clube: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'clube'
    },
    socioDesDe: {
        type: Date,
        required: true,
        default: new Date
    }
})

module.exports = mongoose.model('socios', sociosSchema)