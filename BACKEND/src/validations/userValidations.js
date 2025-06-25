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

exports.updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('O nome deve ter entre 2 e 100 caracteres'),

  body('phone')
    .optional()
    .trim()
    .isLength({ min: 9, max: 15 })
    .withMessage('O telefone deve ter entre 9 e 15 caracteres'),

  body('endereco')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('O endereço deve ter no máximo 255 caracteres'),

  body('avatar')
    .optional()
    .custom((value) => {
      if (value && typeof value === 'string' && value.length > 0) {
        const base64Regex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
        if (!base64Regex.test(value)) {
          throw new Error('Avatar deve ser uma imagem válida em formato base64');
        }
      }
      return true;
    })
]
