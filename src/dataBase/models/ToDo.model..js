const Sequelize = require('sequelize');
const { sequelize } = require('..');
const Token = require('./Token.model');
const User = require('./User.model');

class ToDo extends Sequelize.Model {}

ToDo.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        userId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        title: {
            type: Sequelize.STRING,
            defaultValue: 'Title',
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: 'Description',
        },
        isDone: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isFavourite: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        priority: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    },
    { sequelize: sequelize, underscored: true, modelName: 'todos' }
);

User.hasMany(ToDo)
User.hasMany(Token)
ToDo.belongsTo(User, {foreignKey: "userId"})
Token.belongsTo(Token, {foreignKey: 'userId'})

module.exports = ToDo