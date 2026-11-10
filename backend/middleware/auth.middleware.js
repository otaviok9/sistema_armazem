const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({message: 'acesso negado'})
    }

    try{
        const bytes = CryptoJS.AES.decrypt(token,CHAVE_SECRETA)
        const dadosDescripto = bytes.toString(CryptoJS.enc.Utf8)

        if(!dadosDescripto){
            return res.status(401).json({message: 'token invalido'})
        }

        const payload = JSON.parse(dadosDescripto)

        if(Date.now() > payload.expiraEm){
            return res.status(401).json({message: 'sessao expirada, faça login novamente'})
        }

        req.usuario = payload
        next()
    }catch(err){
        return res.status(401).json({message: 'falha na autenticação do token'})
    }
}

module.exports = authMiddleware