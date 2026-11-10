const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')

require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const fornecedorController = require('./controller/fornecedor.controller')

// ---middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Rotas publicas
app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API rodando' })
})

// Rotas privadas
app.use(authMiddleware)

app.post('/fornecedor', fornecedorController.cadastrar)



// app.post('/carga', cargaController.cadastrar)
// app.get('/cargas', cargaController.listar)

// app.post('/entrega', entregaController.cadastrar)
// app.get('/entregas', entregaController.listar)

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados!', err)
    })
