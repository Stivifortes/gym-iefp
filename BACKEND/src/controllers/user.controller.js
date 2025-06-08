const db = require('../db/models/User');
const User = db.User;
const { validationResult } = require('express-validator');

// Obter todos os utilizadores
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obter um utilizador por ID
exports.findOne = async (req, res) => {
  try {
    // Validação do ID
    const id = req.params.id;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido. Deve ser um número.' });
    }

    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }
    
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Atualizar um utilizador
exports.update = async (req, res) => {
  try {
    // Validação do ID
    const id = req.params.id;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido. Deve ser um número.' });
    }

    // Validação do corpo da requisição
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Verificar se o corpo da requisição não está vazio
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Corpo da requisição vazio. Nada para atualizar.' });
    }

    // Campos permitidos para atualização
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Tentativa de atualização de campos não permitidos' });
    }

    const [updated] = await User.update(req.body, {
      where: { id: id }
    });
    
    if (updated) {
      const updatedUser = await User.findByPk(id);
      return res.json(updatedUser);
    }
    
    throw new Error('Utilizador não encontrado');
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Eliminar um utilizador
exports.delete = async (req, res) => {
  try {
    // Validação do ID
    const id = req.params.id;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido. Deve ser um número.' });
    }

    const deleted = await User.destroy({
      where: { id: id }
    });
    
    if (deleted) {
      return res.json({ message: 'Utilizador eliminado com sucesso' });
    }
    
    throw new Error('Utilizador não encontrado');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};