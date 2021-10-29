const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const User = require('../dataBase/models/User.model');
const { asyncHandler } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.post('/registration', asyncHandler(createUser));
    //router.post('/login', asyncHandler(getToDoById));
}

async function createUser(req, res, next) {
    const {id, login, password, email, name} = req.body
    console.log(id)
    const user = await User.create({id, login, password, email, name})
    console.log(user)
    res.status(200).json(user);
}


initRoutes();

module.exports = router;