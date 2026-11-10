const Fornecedor = require('../models/Fornecedor')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.cnpj || !valores.cpf) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    }

    if (valores.cpf.length !== 11) {
        return res.status(400).json({ message: 'O CPF tem q ter 11 dígitos' })
    }

    try {
        await Fornecedor.create({
            nome: valores.nome,
            email: valores.email,
            senha: CryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString(),
            cpf: CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString(),
            celular: valores.celular
        })
        return res.status(201).json({ message: 'fornecedor cadastrado com sucesso!' })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao cadastrar fornecedor' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const fornecedor = await Fornecedor.findByPk(id)
        if (!fornecedor) {
            return res.status(404).json({ message: 'fornecedor não encontrado!' })
        }

        return res.status(200).json({
            codFornecedor: fornecedor.codFornecedor,
            nome: fornecedor.nome,
            email: fornecedor.email,
            cpf: CryptoJS.AES.decrypt(fornecedor.cpf, CHAVE_SECRETA).toString(CryptoJS.enc.Utf8),
        })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao consultar fornecedor!' })
    }
}


module.exports = { cadastrar, consultar}