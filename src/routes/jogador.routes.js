const express = require('express')
const router = express.Router()
const controller = require('../controllers/jogadoresController')

router.post('/', controller.createJogador)

router.get('/', controller.getAll)

router.delete('/aposentar', controller.aposentarJogador)

module.exports = router