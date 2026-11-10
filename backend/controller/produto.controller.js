const Produto = require('../models/Produto')

const listar = async (req, res) => {
    try {
        const cargas = await Produto.findAll()
        return res.status(200).json(cargas)
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao listar produto' })
    }
}

module.exports = { cadastrar, listar }
