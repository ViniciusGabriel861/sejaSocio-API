const mongoose = require('mongoose')

const clubeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: {
    type: String,
    required: true
  },
  jogadores: [{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'jogadores'
  }],
  criadoEm: {
    type: Date,
    required: true,
    default: new Date
  },
})

module.exports = mongoose.model('clube', clubeSchema)