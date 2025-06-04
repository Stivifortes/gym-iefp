const { DataTypes } = require('sequelize')

const PlanModel = (connection, sequelize) => {
  const Plan = connection.define(
    'Plan',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'O nome é obrigatório' },
          len: {
            args: [2, 100],
            msg: 'O nome deve ter entre 2 e 100 caracteres'
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'A descrição é obrigatória' }
        }
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'A duração é obrigatória' },
          isInt: { msg: 'A duração deve ser um número inteiro' },
          min: {
            args: [1],
            msg: 'A duração deve ser no mínimo 1 (em semanas, dias, etc.)'
          }
        }
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          isDecimal: { msg: 'O preço deve ser um número decimal válido' },
          min: {
            args: [0],
            msg: 'O preço não pode ser negativo'
          }
        }
      }
    },
    {
      tableName: 'plans',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return Plan
}

module.exports = PlanModel
