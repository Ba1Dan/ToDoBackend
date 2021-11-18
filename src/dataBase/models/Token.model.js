const Sequelize = require('sequelize');
const { sequelize } = require('..');

class Token extends Sequelize.Model {}

Token.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: Sequelize.STRING,
            defaultValue: 'Value',
        },
    },
    { sequelize: sequelize, underscored: true, modelName: 'token' }
);


module.exports = Token