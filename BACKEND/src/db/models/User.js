const { DataTypes } = require('sequelize')

const User = (connection, sequelize) => {
  const User = connection.define(
    'User',
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
          notEmpty: {
            msg: 'Nome é obrigatório'
          },
          len: {
            args: [2, 100],
            msg: 'Nome deve ter entre 2 e 100 caracteres'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email já está em uso'
        },
        validate: {
          isEmail: {
            msg: 'Email deve ter um formato válido'
          },
          notEmpty: {
            msg: 'Email é obrigatório'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Senha é obrigatória'
          },
          len: {
            args: [6, 255],
            msg: 'Senha deve ter pelo menos 6 caracteres'
          }
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [9, 15],
            msg: 'Telefone deve ter entre 9 e 15 caracteres'
          }
        }
      },
      endereco: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      planId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'plans',
          key: 'id'
        }
      }
    },
    {
      tableName: 'users',
      timestamps: true, // Adiciona createdAt e updatedAt automaticamente
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return User
}

module.exports = User
