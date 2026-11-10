const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Movimento = db.define('movimento', {
    codMovimento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dataOperacao: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    tipoMovimentacao: {
        type: DataTypes.ENUM('ENTRADA', 'SAIDA'),
        allowNull: false
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'codProduto'
        }
    }
}, {
    timestamps: false,
    tableName: 'movimentos'
})

module.exports = Movimento