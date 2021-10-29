const Sequelize = require('sequelize');
const { sequelize } = require('..');

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        login: {
            type: Sequelize.STRING,
            defaultValue: 'Login',
        },
        password: {
            type: Sequelize.STRING,
            defaultValue: 'Password',
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

module.exports = User