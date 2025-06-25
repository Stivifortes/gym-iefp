const { DataTypes } = require('sequelize')

const UserPlanSubscription = (connection, sequelize) => {
  const UserPlanSubscription = connection.define(
    'UserPlanSubscription',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      planId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'plans',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.ENUM(
          'ativo',
          'inativo',
          'pendente',
          'cancelado',
          'expirado'
        ),
        allowNull: false,
        defaultValue: 'pendente',
        validate: {
          isIn: {
            args: [['ativo', 'inativo', 'pendente', 'cancelado', 'expirado']],
            msg: 'Status deve ser: ativo, inativo, pendente, cancelado ou expirado'
          }
        }
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: 'Data de início deve ser uma data válida'
          }
        }
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: 'Data de fim deve ser uma data válida'
          },
          isAfterStartDate(value) {
            if (value && this.startDate && value <= this.startDate) {
              throw new Error('Data de fim deve ser posterior à data de início')
            }
          }
        }
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: 'user_plan_subscriptions',
      timestamps: true,
      indexes: [
        {
          unique: false,
          fields: ['userId']
        },
        {
          unique: false,
          fields: ['planId']
        },
        {
          unique: false,
          fields: ['status']
        },
        {
          unique: false,
          fields: ['userId', 'status']
        }
      ]
    }
  )

  // Método para verificar se a subscrição está ativa
  UserPlanSubscription.prototype.isActive = function () {
    return (
      this.status === 'ativo' && (!this.endDate || new Date() <= this.endDate)
    )
  }

  // Método para verificar se a subscrição expirou
  UserPlanSubscription.prototype.isExpired = function () {
    return this.endDate && new Date() > this.endDate
  }

  return UserPlanSubscription
}

module.exports = UserPlanSubscription
