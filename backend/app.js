const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { validateCreateUser, validateLogin } = require('./middlewares/validation');
const errorHandler = require('./middlewares/handler');
const auth = require('./middlewares/auth');
const ErrorNotFound = require('./error/error-not-found');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);
app.use(auth);
app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
});

app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
