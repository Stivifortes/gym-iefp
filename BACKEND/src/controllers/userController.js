const db = require('../db/db')
const User = db.models.User

const { validationResult } = require('express-validator')

// Criar um novo utilizador
async function create(req, res) {
  try {
    // Validação do corpo da requisição
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Verificar se o corpo da requisição não está vazio
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: 'Corpo da requisição vazio. Nada para criar.' })
    }
    i

    const { isAdmin, ...userData } = req.body

    // Se estiver tentando criar um admin, verificar se o usuário atual é admin
    if (isAdmin) {
      // Verificar se o usuário atual é admin através do token JWT
      if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({
          error: 'Apenas administradores podem criar outros administradores'
        })
      }
    }

    // Criação do utilizador com o status de admin apropriado
    const user = await User.create({
      ...userData,
      isAdmin: isAdmin || false // Se não especificado, será falso por padrão
    })

    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// Obter todos os utilizadores
async function findAll(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    return res.json(users)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// Obter um utilizador por ID
async function findOne(req, res) {
  try {
    // Validação do ID
    const id = req.params.id

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido. Deve ser um número.' })
    }

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    })

    if (!user) {
      return res.status(404).json({ error: 'Utilizador não encontrado' })
    }

    return res.json(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// Atualizar um utilizador
async function update(req, res) {
  try {
    // Validação do ID
    const id = req.params.id

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido. Deve ser um número.' })
    }

    // Validação do corpo da requisição
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Verificar se o corpo da requisição não está vazio
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: 'Corpo da requisição vazio. Nada para atualizar.' })
    }

    // Campos permitidos para atualização
    const allowedUpdates = ['name', 'email', 'password', 'phone', 'endereco']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
      return res
        .status(400)
        .json({ error: 'Tentativa de atualização de campos não permitidos' })
    }

    const [updated] = await User.update(req.body, {
      where: { id: id }
    })

    if (updated) {
      const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      })

      return res.json(updatedUser)
    }

    throw new Error('Utilizador não encontrado')
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

// Eliminar um utilizador
async function deleteUser(req, res) {
  try {
    // Validação do ID
    const id = req.params.id

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido. Deve ser um número.' })
    }

    const deleted = await User.destroy({
      where: { id: id }
    })

    if (deleted) {
      return res.json({ message: 'Utilizador eliminado com sucesso' })
    }

    throw new Error('Utilizador não encontrado')
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// Atualizar perfil do usuário logado
async function updateProfile(req, res) {
  try {
    // O usuário logado está disponível em req.user através do middleware de autenticação
    const userId = req.user.id

    // Validação do corpo da requisição
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Verificar se o corpo da requisição não está vazio
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: 'Corpo da requisição vazio. Nada para atualizar.' })
    }

    // Campos permitidos para atualização do perfil
    const allowedUpdates = ['name', 'phone', 'endereco', 'avatar']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
      return res
        .status(400)
        .json({ error: 'Tentativa de atualização de campos não permitidos' })
    }

    // Validar avatar se fornecido
    if (req.body.avatar) {
      const base64Regex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/
      if (!base64Regex.test(req.body.avatar)) {
        return res.status(400).json({
          error: 'Avatar deve ser uma imagem válida em formato base64'
        })
      }
    }

    const [updated] = await User.update(req.body, {
      where: { id: userId }
    })

    if (updated) {
      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      })

      return res.json({
        message: 'Perfil atualizado com sucesso',
        user: updatedUser
      })
    }

    throw new Error('Usuário não encontrado')
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  findAll,
  create,
  findOne,
  update,
  delete: deleteUser,
  updateProfile
}
