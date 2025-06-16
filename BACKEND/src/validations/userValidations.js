const express = require('express')
const router = express.Router()
const { body, param } = require('express-validator')

exports.userIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('O ID é obrigatório')
    .isInt()
    .withMessage('O ID deve ser um número inteiro')
]

exports.updateUserValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('O nome deve ter entre 2 e 50 caracteres'),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Forneça um email válido'),

  body('password')
    .optional()
    .isLength({ min: 10 })
    .withMessage('A senha deve ter pelo menos 10 caracteres'),

  body('age')
    .optional()
    .isInt({ min: 12, max: 100 })
    .withMessage('A idade deve ser entre 12 e 100 anos')
]
