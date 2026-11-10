const Fornecedor = require('./Fornecedor')
const Funcionario = require('./Funcionario')
const Movimento = require('./Movimento')
const Produto = require('./Produto')

Fornecedor.hasMany(Movimento,{
    foreignKey: 'idFornecedor',
    as: 'movimentoFornecedor',
    onDelete: 'CASCADE'
})

Movimento.belongsTo(Fornecedor,{
    foreignKey: 'idFornecedor',
    as: 'fornecedorMovimento',
    allowNull: false
})

Produto.hasMany(Movimento,{
    foreignKey: 'idProduto',
    as: 'movimentoProduto',
    onDelete: 'CASCADE'
})

Movimento.belongsTo(Produto,{
    foreignKey: 'idProduto',
    as: 'produtoMovimento',
    allowNull: false
})

module.exports = { Fornecedor, Funcionario, Produto, Movimento }