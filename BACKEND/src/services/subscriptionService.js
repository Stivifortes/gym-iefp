const db = require('../db/db')
const UserPlanSubscription = db.models.UserPlanSubscription
const User = db.models.User
const { Op } = require('sequelize')

class SubscriptionService {
  // Verificar e atualizar subscrições expiradas
  static async checkExpiredSubscriptions() {
    try {
      const expiredSubscriptions = await UserPlanSubscription.findAll({
        where: {
          status: 'ativo',
          endDate: {
            [Op.lt]: new Date()
          }
        }
      })

      if (expiredSubscriptions.length > 0) {
        // Atualizar status para expirado
        await UserPlanSubscription.update(
          { status: 'expirado' },
          {
            where: {
              id: {
                [Op.in]: expiredSubscriptions.map((sub) => sub.id)
              }
            }
          }
        )

        // Remover planId dos usuários afetados
        const userIds = expiredSubscriptions.map((sub) => sub.userId)
        await User.update(
          { planId: null },
          {
            where: {
              id: {
                [Op.in]: userIds
              }
            }
          }
        )

        console.log(
          `${expiredSubscriptions.length} subscrições expiradas foram atualizadas`
        )
      }

      return expiredSubscriptions.length
    } catch (error) {
      console.error('Erro ao verificar subscrições expiradas:', error)
      throw error
    }
  }

  // Obter estatísticas de subscrições
  static async getSubscriptionStats() {
    try {
      const stats = await UserPlanSubscription.findAll({
        attributes: [
          'status',
          [db.connection.fn('COUNT', db.connection.col('id')), 'count']
        ],
        group: ['status']
      })

      return stats.reduce((acc, stat) => {
        acc[stat.status] = parseInt(stat.dataValues.count)
        return acc
      }, {})
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error)
      throw error
    }
  }

  // Renovar subscrição
  static async renewSubscription(subscriptionId, newEndDate) {
    const transaction = await db.connection.transaction()

    try {
      const subscription = await UserPlanSubscription.findByPk(subscriptionId)

      if (!subscription) {
        throw new Error('Subscrição não encontrada')
      }

      subscription.status = 'ativo'
      subscription.endDate = newEndDate
      await subscription.save({ transaction })

      // Atualizar planId do usuário
      await User.update(
        { planId: subscription.planId },
        {
          where: { id: subscription.userId },
          transaction
        }
      )

      await transaction.commit()
      return subscription
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = SubscriptionService
