const mongoose = require('mongoose')
const SejaSocio = require('../models/socios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const getAll = async (req, res) => {
    const authHeader = req.get('authorization')
    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(403).send({ message: 'token não fornecido'})
    }

    jwt.verify(token, SECRET, async (err, decoded) => {
        if (err) {
            res.status(403).send({ message: 'Token invalido', err})
        }
        const clube = await SejaSocio.find({ loguin: decoded.loguin }).select(['clube'])

        const socios = await SejaSocio.find({ clube: clube[0].clube }).populate({ path: 'clube', select: ['nome','criadoEm']})
        res.status(200).json(socios)
    })
}

const createSocio = async (req, res) => {
    const sejaSocio = new SejaSocio({
        _id: new mongoose.Types.ObjectId(),
        loguin: req.body.loguin,
        senha: bcrypt.hashSync(req.body.senha, 10),
        nome: req.body.nome,
        cpf: req.body.cpf,
        clube: req.body.clube,
        socioDesDe: req.body.socioDesDe
    })

    const socioJaExiste = await SejaSocio.findOne({ cpf: req.body.cpf })

    if (socioJaExiste) {
        return res.status(409).json({ error: 'Socio já cadastrado.' })
    }

    try {
        const novoSejaSocio = await sejaSocio.save()
        res.status(201).json(novoSejaSocio)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const loguinSocio = async (req, res) => {
    SejaSocio.findOne({ loguin: req.body.loguin }, (err, result) => {
        if(err) {
            res.send(500).send({ message: err.message })
        }

        if(!result) {
            return res.status(404).send({ message: 'Socio não encontrado', loguin: `${req.body.loguin}`})
        }

        const validarSenha = bcrypt.compareSync(req.body.senha, result.senha)

        if (!validarSenha) {
            return res.status(401).send({ message: 'Senha invalida'})
        }

        const token = jwt.sign({ loguin: req.body.loguin }, SECRET)
        res.status(200).send({ message: 'Loguin realizado com sucesso!', token: token })
    })
}

const updateOneSocio = async (req, res) => {
    const id = req.body._id
    const nome = req.body.nome

    SejaSocio.updateOne({ _id: id }, {
        $set: {
            nome: nome
        }
    }, (err) => {
        if (err) return res.send(err)

        res.status(200).json({ message: 'Socio atualizado com sucesso' })
    })
}

const deleteSocio = async (req, res) => {
    const id = req.body._id

    SejaSocio.deleteOne({ _id: id }, {

    }, (err) => {
        if (err) return res.send(err)

        res.status(200).json({ message: 'Socio excluido com sucesso' })
    })
}

module.exports = {
    getAll,
    createSocio,
    loguinSocio,
    updateOneSocio,
    deleteSocio
}