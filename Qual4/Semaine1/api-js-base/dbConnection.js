const {Sequelize} = require('sequelize')

//SQLITE 

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const checkConnection =async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

checkConnection()

module.exports = sequelize