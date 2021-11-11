const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const User = require('../dataBase/models/User.model');
const Token = require('../dataBase/models/Token.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { asyncHandler } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.post('/registration',asyncHandler(createUser));
    router.post('/login', asyncHandler(loginUser));
}

async function createUser(req, res, next) {
    const {login, password, email, name} = req.body
    if(!login || !password ) {
        throw new ErrorResponse('Некорректный login или password', 404);
    }
    const candidate = await User.findOne({where: {login}})

    if(candidate) {
        throw new ErrorResponse('Пользователь существует', 404);
    }

    const hashPassword = await bcrypt.hash(password, 5)
    console.log(hashPassword)

    const user = await User.create({login, password: hashPassword, email, name})
    console.log(user)

    res.status(200).json({message: 'ok'});
}

async function loginUser(req, res, next) {
    const {email, password} = req.body
    if(!email || !password ) {
        throw new ErrorResponse('Некорректный login или password', 404);
    }
    const user = await User.findOne({where: {email}})

    //Пользователь не найден
    if(!user) {
        throw new ErrorResponse('Пользователь не найден', 404);
    }

    //Проверка пароля
    let comparePassword = bcrypt.compareSync(password, user.password)
    if(!comparePassword) {
        throw new ErrorResponse('Неправильный пароль', 404);
    }
    
    //Создание токена
    const value = jwt.sign({id: user.id, email:user.email}, "random_secret_key", {
        expiresIn: '1200h'
    })

    const token = await Token.create({userId: user.id, value})

    res.status(200).json({"token": token.value});
}


initRoutes();

module.exports = router;