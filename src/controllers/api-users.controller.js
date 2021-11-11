const { Router } = require("express");
const ErrorResponse = require('../classes/error-response');
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
const { asyncHandler, requireToken } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/me', asyncHandler(requireToken), asyncHandler(getUser));
    router.patch('/me', asyncHandler(requireToken), asyncHandler(requireToken), asyncHandler(updateUser));
    router.post('/logout', asyncHandler(requireToken), asyncHandler(logout));
}

async function getUser(req, res) {
    const userId = req.userId
  
    const user = await User.findByPk(userId)
    if(!user) {
        throw new ErrorResponse("not found", 400)
    }
    res.status(200).json({user: user});
}

async function updateUser(req, res) {
    const userId = req.userId
    const {name, login} = req.body
    const user = await User.update({
        name, login
    }, {
        where: {
            id: userId
        }
    })
    if (!user) {
        throw new ErrorResponse('User not found', 404);
    }
    res.status(200).json({message: "ok"});
}


async function logout(req, res) {
    const userId = req.userId
    const token = await Token.findOne({where: {userId: userId}})
    token.destroy()
    res.status(200).json({message: "ok"});
}


initRoutes();

module.exports = router;