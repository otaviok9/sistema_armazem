const Funcionario = require('../models/Funcionario')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const login = async(req,res)=>{
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(400).json({message: 'informe email para realização do login'})
    }

    try{
        const funcionario = await Funcionario.findOne({where: {email: valores.email}})

        if(!funcionario){
            return res.status(404).json({message: 'funcionario nao encontrado'})
        }

        const senhaBD = CryptoJS.AES.decrypt(funcionario.senha, CHAVE_SECRETA).toString(CryptoJS.enc.Utf8)

        if(valores.senha !== senhaBD){
            return res.status(401).json({message: 'senha incorreta'})
        }

        const payload = {
            idFuncionario:funcionario.codFuncionario,
            nome: funcionario.nome,
            expiraEm: Date.now() + 240 * 60 * 1000 
        }

        const token = CryptoJS.AES.encrypt(JSON.stringify(payload),CHAVE_SECRETA).toString()

        return res.status(200).json({
            message: 'login realizado com sucesso',
            token: token,
            nome: funcionario.nome
        })
    }catch(err){
        return res.status(500).json({message: 'erro ao tentarv realizar o login'})
    }
}

module.exports = {login}