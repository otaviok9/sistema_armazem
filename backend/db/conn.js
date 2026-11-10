const { Sequelize } = require('sequelize')

const db = new Sequelize('db_logistock', 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

db.authenticate()
    .then(() => {
        console.log('banco de dados coenctwdo ')
    })
    .catch((err) => {
        console.error('erro de conexão com bd', err)
    })

module.exports = db