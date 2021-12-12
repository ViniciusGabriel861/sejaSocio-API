const mongoose = require('mongoose')
const Clube = require('../models/clube')
const Jogador = require('../models/jogadores')

const getAll = async (req, res) => {
    const clube = await Clube.find().populate({ path: 'jogadores', select: ['nome','apelido','camisa'] })

    res.status(200).json(clube)
}

const createClube = async (req, res) => {
    const clube = new Clube({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        criadoEm: req.body.criadoEm
    })
    const clubeJaExiste = await Clube.findOne({ nome: req.body.nome })
    
    if (clubeJaExiste) {
        return res.status(409).json({ error: 'Clube já cadastrado.' })
    }

    try {
        const novoClube = await clube.save()
        res.status(201).json(novoClube)
    } catch(err) {
        res.status(200).json({ message: err.message })
    }
}

const updateOneClube = async (req, res) => {
    const id = req.body._id
    const nome = req.body.nome

    Clube.updateOne({ _id: id }, {
        $set: {
            nome: nome
        }
    }, (err) => {
        if (err) return res.send(err)

        res.status(200).json({ message: 'Clube atualizado com sucesso' })
    })
}

const deleteClube = async (req, res) => {
    const id = req.body._id

    Clube.deleteOne({ _id: id }, {

    }, (err) => {
        if (err) return res.send(err)

        res.status(200).json({ message: 'Clube excluido com sucesso' })
    })
}

const contratarJogador = async (req, res) => {
    const clube = req.body.clube
    const jogador = req.body.jogador
    const camisa = req.body.camisa

    if (!Jogador.findOne({ _id: jogador })) {
        res.status(404).send({ message: 'Jogador informado não existe!'})
    }

    Jogador.updateOne({ _id: jogador}, {
        $set: {
            camisa: camisa,
            clube: clube
        }
    }, (err) => {
        if (err) return res.send(err)
    })

    Clube.updateOne({ _id: clube }, {
        $push: {
            jogadores: jogador 
        }
    }, (err) => {
        if (err) return res.send(err)

        res.status(200).json({ message: 'Jogador adicionado com sucesso!'})
    })
}

const demitirJogador = async (req, res) => {
    const clube = req.body.clube
    const jogador = req.body.jogador

    Jogador.updateOne({ _id: jogador}, {
        $set: {
            camisa: null,
            clube: null
        }
    }, (err) => {
        if (err) return res.send(err)
    })

    Clube.updateOne({ _id: clube }, {
        $pull: {
            jogadores: jogador 
        }
    }, (err) => {
        if (err) return res.send(err)

        res.status(200).json({ message: 'Jogador removido com sucesso!'})
    })
}

module.exports = {
    getAll,
    createClube,
    contratarJogador,
    demitirJogador,
    updateOneClube,
    deleteClube
}