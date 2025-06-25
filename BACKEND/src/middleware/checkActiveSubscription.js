const db = require('../db/db')
const UserPlanSubscription = db.models.UserPlanSubscription

const checkActiveSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id

    const activeSubscription = await UserPlanSubscription.findOne({
      where: {
        userId,
        status: 'ativo'
      }
    })

    if (!activeSubscription) {
      return res.status(403).json({
        error: 'Acesso negado. Você precisa de uma subscrição ativa.'
      })
    }

    // Verificar se expirou
    if (activeSubscription.isExpired()) {
      activeSubscription.status = 'expirado'
      await activeSubscription.save()

      return res.status(403).json({
        error: 'Sua subscrição expirou. Renove para continuar.'
      })
    }

    req.activeSubscription = activeSubscription
    next()
  } catch (error) {
    console.error('Erro ao verificar subscrição:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

module.exports = { checkActiveSubscription }
