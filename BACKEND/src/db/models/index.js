const db = require('../db');
// Sincronizar modelos com o banco de dados
const syncDatabase = async () => {
  try {
    await db.connection.sync({ alter: true }); // alter: true atualiza a estrutura sem perder dados
    console.log('Modelos sincronizados com sucesso');
  } catch (error) {
    console.error('Erro ao sincronizar modelos:', error);
  }
};

module.exports = {
  syncDatabase
};