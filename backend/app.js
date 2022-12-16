const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config(); // импортирование - ранее на сервере не было
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const handlerErrors = require('./middlewares/handlerErrors');
const NotFoundError = require('./errors/NotFoundError');

const options = { // для cors настройки
  origin: [
    'http://localhost:3000',
    'https://api.mariarez.nomoredomains.club',
    'https://mariarez.nomoredomains.club',
    'http://api.mariarez.nomoredomains.club',
    'http://mariarez.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet()); // helmet для ограничения источников скриптов и других ресурсов

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.use('*', cors(options));

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, которым авторизация нужна
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.post('/signin', celebrate({ // POST /signin — авторизация пользователя
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({ // POST /signup — создаёт пользователя
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/http[s]?:\/\/(?:www\.)?([\w-]+\.)+\/?\S*$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth, (req, res, next) => {
  next(new NotFoundError('Page Not found 404'));
});

app.use(errorLogger); // подключаем логгер ошибок

// celebrate error handler
app.use(errors());
// функция обработки ошибок
app.use(handlerErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
