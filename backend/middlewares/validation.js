const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateId = Joi.string().required().custom((value, helpers) => {
  if (ObjectId.isValid(value)) {
    return value;
  }
  return helpers.message('Неверный id');
});

const validateLink = Joi.string().custom((value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.message('Неверный формат ссылки');
});

const validateEmail = Joi.string().required().email();
const validatePassword = Joi.string().required();
const validateInfo = Joi.string().min(2).max(30);

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: validateEmail,
    password: validatePassword,
    name: validateInfo,
    about: validateInfo,
    avatar: validateLink,
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: validateEmail,
    password: validatePassword,
  }),
});

module.exports.validateUserById = celebrate({
  params: Joi.object().keys({
    userId: validateId,
  }),
});

module.exports.validateCardById = celebrate({
  params: Joi.object().keys({
    cardId: validateId,
  }),
});

module.exports.validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: validateInfo,
    about: validateInfo,
  }),
});

module.exports.validateupdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: validateLink,
  }),
});

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('Неверный формат ссылки');
    }),
  }),
});
