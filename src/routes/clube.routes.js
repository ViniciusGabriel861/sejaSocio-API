const express = require('express')
const router = express.Router()
const controller = require('../controllers/clubeController')

router.get('/', controller.getAll)

router.post('/', controller.createClube)

router.put('/contratar', controller.contratarJogador)

router.delete('/demitir', controller.demitirJogador)

router.delete('/deletar', controller.deleteClube)

router.put('/atualizar', controller.updateOneClube)

module.exports = router