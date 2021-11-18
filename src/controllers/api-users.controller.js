const { Router } = require("express");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.get("/me", asyncHandler(requireToken), asyncHandler(getUser));
  router.patch("/me", asyncHandler(requireToken), asyncHandler(updateUser));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logout));
}

async function getUser(req, res) {
  const userId = req.userId;

  //Поиск пользователя по id
  const user = await User.findByPk(userId);

  res.json(user);
}

async function updateUser(req, res) {
  const userId = req.userId;
  const { name, login } = req.body;

  //Обновление имени и логина пользователя
  const user = await User.findOne({
    where: {
      userId,
    },
  });
  await user.update({
    name,
    login,
  });
  
  //корректно
  res.status(200).json(user);
}

async function logout(req, res) {
  const userId = req.userId;

  //Поиск токена по id пользователя
  const token = await Token.findOne({ where: { userId } });

  //Удаление токена из бд
  await token.destroy();

  res.status(200).json({ message: "ok" });
}

initRoutes();

module.exports = router;
