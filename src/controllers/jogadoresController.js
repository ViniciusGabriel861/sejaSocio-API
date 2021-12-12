const mongoose = require('mongoose')
const Jogador = require('../models/jogadores')
const Clube = require('../models/clube')

const getAll = async (req, res) => {
    const jogador = await Jogador.find().populate({ path: 'clube', select: ['nome','criadoEm'] })

    res.status(200).json(jogador)
}

const createJogador = async (req, res) => {
    const jogador = new Jogador({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        apelido: req.body.apelido
    })

    const jogadorJaExiste = await Jogador.findOne({ nome: req.body.nome })

    if (jogadorJaExiste) {
        return res.status(409).json({ error: 'Jogador já cadastrado.' })
    }
    
    try {
        const novoJogador = await jogador.save()
        res.status(201).json(novoJogador)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const aposentarJogador = async (req, res) => {
    const jogador = req.body.jogador

    const jogadorTemClube = await Jogador.find({ _id: jogador }).select(['clube'])

    if (jogadorTemClube[0].clube) {
        Clube.updateOne({ _id: jogadorTemClube[0].clube }, {
            $pull: {
                jogadores: jogador
            }
        }, (err) => {
            if (err) return res.send(err)
        })
    }

    Jogador.deleteOne({ _id: jogador }, {

    }, (err) => {
        if (err) return res.send(err)

        res.status(200).json({ message: 'Jogador excluido com sucesso' })
    })
}

module.exports = {
    getAll,
    aposentarJogador,
    createJogador
}