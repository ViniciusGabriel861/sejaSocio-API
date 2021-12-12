const express = require('express')
const app = express()

require('dotenv').config()

const db = require('./src/data/database')
db.connect()

app.use(express.json())

const clubeRouter = require('./src/routes/clube.routes')
app.use('/clube', clubeRouter)

const socioRouter = require('./src/routes/socio.routes')
app.use('/socio', socioRouter)

const jogadorRouter = require('./src/routes/jogador.routes')
app.use('/jogador', jogadorRouter)

const index = require('./src/routes/index.routes');
app.use('/', index)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})