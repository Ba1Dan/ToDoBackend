const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const User = require("../dataBase/models/User.model");
const Token = require("../dataBase/models/Token.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.post("/registration", asyncHandler(createUser));
  router.post("/login", asyncHandler(loginUser));
}

async function createUser(req, res) {
  const { login, password, email, name } = req.body; //что за операция
  if (!login || !password) {
    throw new ErrorResponse("Wrong email or password", 404);
  }
  const candidate = await User.findOne({ where: { email } });

  if (candidate) {
    throw new ErrorResponse("This email already in use", 400);
  }

  //Хэширование пароля
  const hashPassword = await bcrypt.hash(password, 5);
  console.log(hashPassword);

  //Создание пользователя
  const user = await User.create({
    login,
    password: hashPassword,
    email,
    name,
  });
  console.log(user);

  res.status(200).json({ message: "ok" });
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  //Отправлены ли почта и пароль
  if (!email || !password) {
    throw new ErrorResponse("Wrong email or password", 404);
  }
  const user = await User.findOne({ where: { email } });

  //Пользователь не найден
  if (!user) {
    throw new ErrorResponse("No user by email", 404);
  }

  //Проверка пароля
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    throw new ErrorResponse("Wrong password", 400);
  }

  //Создание токена
  const value = jwt.sign(
    { id: user.id, email: user.email },
    "random_secret_key",
    {
      expiresIn: "1200h",
    }
  ); //что такое jwt, как работает - sign принимает полезную инфу(email, id) и секретный ключ secretOrPrivateKey

  const token = await Token.create({ userId: user.id, value });

  res.status(200).json({ accessToken: token.value });
}

initRoutes();

module.exports = router;
