const Sequelize = require('sequelize');
const { sequelize } = require('..');
const User = require('./User.model');

class Token extends Sequelize.Model {}

Token.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        value: {
            type: Sequelize.STRING,
            defaultValue: 'Value',
        },
    },
    { sequelize: sequelize, underscored: true, modelName: 'token' }
);

Token.belongsTo(User)
module.exports = Token