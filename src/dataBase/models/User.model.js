const Sequelize = require('sequelize');
const { sequelize } = require('..');
const ToDo = require('./ToDo.model.');
const Token = require('./Token.model');

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: Sequelize.STRING,
            defaultValue: 'Login',
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            defaultValue: 'Email',
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: 'Name',
        }
    },
    { sequelize: sequelize, underscored: true, modelName: 'user' }
);

User.hasMany(ToDo)
User.hasMany(Token)
ToDo.belongsTo(User, {foreignKey: "userId"})
Token.belongsTo(Token, {foreignKey: 'userId'})

module.exports = User