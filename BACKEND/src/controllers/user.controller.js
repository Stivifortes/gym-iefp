const db = require('../db/models/User'); // Importa o modelo User do Sequelize
const User = db.User;

// Obter todos os utilizadores
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um utilizador por ID
exports.findOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um utilizador
exports.update = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      return res.json(updatedUser);
    }
    throw new Error('Utilizador não encontrado');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar um utilizador
exports.delete = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.json({ message: 'Utilizador eliminado com sucesso' });
    }
    throw new Error('Utilizador não encontrado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// JuniorDelgado
// Este código define as funções do controlador para a gestão de utilizadores, permitindo operações CRUD.
// As funções incluem obter todos os utilizadores, obter um utilizador por ID, atualizar um utilizador e eliminar um utilizador.
// As respostas são enviadas em formato JSON e tratam erros de forma adequada.
// As funções utilizam o modelo User definido no Sequelize para interagir com a base de dados.
// Assegura que as operações são realizadas de forma assíncrona e que os erros são capturados e respondidos corretamente.
// JuniorDelgado