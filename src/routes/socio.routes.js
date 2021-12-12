const express = require('express')
const router = express.Router()
const controller = require('../controllers/socioController')

router.post('/', controller.createSocio)

router.post('/loguin', controller.loguinSocio)

router.get('/', controller.getAll)

router.put('/atualizar', controller.updateOneSocio)

router.delete('/deletar', controller.deleteSocio)

module.exports = router