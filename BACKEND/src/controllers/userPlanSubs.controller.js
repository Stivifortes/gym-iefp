const db = require('../db/db')
const User = db.models.User
const Plan = db.models.Plans
const UserPlanSubscription = db.models.UserPlanSubscription
const { Op } = require('sequelize')

// Subscrever a um plano
exports.subscribe = async (req, res) => {
  const transaction = await db.connection.transaction()

  try {
    const { planId, startDate, endDate, notes } = req.body
    const userId = req.user.id

    if (!planId) {
      return res.status(400).json({ error: 'ID do plano é obrigatório' })
    }

    // Verificar se o plano existe
    const plan = await Plan.findByPk(planId)
    if (!plan) {
      return res.status(404).json({ error: 'Plano não encontrado' })
    }

    // Verificar se já existe uma subscrição ativa para este plano
    const existingActiveSubscription = await UserPlanSubscription.findOne({
      where: {
        userId,
        planId,
        status: 'ativo'
      }
    })

    if (existingActiveSubscription) {
      await transaction.rollback()
      return res.status(400).json({
        error: 'Você já possui uma subscrição ativa para este plano'
      })
    }

    // Criar nova subscrição
    const subscription = await UserPlanSubscription.create(
      {
        userId,
        planId,
        status: 'pendente',
        startDate: startDate || new Date(),
        endDate: endDate || null,
        notes: notes || null
      },
      { transaction }
    )

    // Atualizar o planId do usuário (referência ao plano atual)
    await User.update({ planId }, { where: { id: userId }, transaction })

    await transaction.commit()

    // Buscar a subscrição criada com os dados do plano
    const subscriptionWithPlan = await UserPlanSubscription.findByPk(
      subscription.id,
      {
        include: [
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'name', 'price', 'description']
          }
        ]
      }
    )

    res.status(201).json({
      message: 'Subscrição criada com sucesso',
      subscription: subscriptionWithPlan
    })
  } catch (error) {
    await transaction.rollback()
    console.error('Erro ao criar subscrição:', error)
    res.status(500).json({ error: error.message })
  }
}

// Ativar subscrição
exports.activateSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.params
    const userId = req.user.id

    const subscription = await UserPlanSubscription.findOne({
      where: {
        id: subscriptionId,
        userId
      }
    })

    if (!subscription) {
      return res.status(404).json({ error: 'Subscrição não encontrada' })
    }

    if (subscription.status === 'ativo') {
      return res.status(400).json({ error: 'Subscrição já está ativa' })
    }

    // Desativar outras subscrições ativas do mesmo usuário (se necessário)
    await UserPlanSubscription.update(
      { status: 'inativo' },
      {
        where: {
          userId,
          status: 'ativo',
          id: { [Op.ne]: subscriptionId }
        }
      }
    )

    // Ativar a subscrição
    subscription.status = 'ativo'
    subscription.startDate = subscription.startDate || new Date()
    await subscription.save()

    res.json({
      message: 'Subscrição ativada com sucesso',
      subscription
    })
  } catch (error) {
    console.error('Erro ao ativar subscrição:', error)
    res.status(500).json({ error: error.message })
  }
}

// Cancelar subscrição
exports.cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.params
    const userId = req.user.id
    const { reason } = req.body

    const subscription = await UserPlanSubscription.findOne({
      where: {
        id: subscriptionId,
        userId
      }
    })

    if (!subscription) {
      return res.status(404).json({ error: 'Subscrição não encontrada' })
    }

    if (subscription.status === 'cancelado') {
      return res.status(400).json({ error: 'Subscrição já está cancelada' })
    }

    subscription.status = 'cancelado'
    subscription.endDate = new Date()
    subscription.notes = reason
      ? `Cancelado: ${reason}`
      : 'Cancelado pelo usuário'
    await subscription.save()

    // Remover planId do usuário se esta era a subscrição ativa
    if (subscription.status === 'ativo') {
      await User.update({ planId: null }, { where: { id: userId } })
    }

    res.json({
      message: 'Subscrição cancelada com sucesso',
      subscription
    })
  } catch (error) {
    console.error('Erro ao cancelar subscrição:', error)
    res.status(500).json({ error: error.message })
  }
}

// Listar subscrições do usuário
exports.getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user.id
    const { status, page = 1, limit = 10 } = req.query

    const whereClause = { userId }
    if (status) {
      whereClause.status = status
    }

    const offset = (page - 1) * limit

    const { count, rows: subscriptions } =
      await UserPlanSubscription.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'name', 'price', 'description']
          }
        ],
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      })

    res.json({
      subscriptions,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    })
  } catch (error) {
    console.error('Erro ao buscar subscrições:', error)
    res.status(500).json({ error: error.message })
  }
}

// Obter subscrição ativa atual
exports.getActiveSubscription = async (req, res) => {
  try {
    const userId = req.user.id

    const activeSubscription = await UserPlanSubscription.findOne({
      where: {
        userId,
        status: 'ativo'
      },
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'name', 'price', 'description']
        }
      ],
      order: [['createdAt', 'DESC']]
    })

    if (!activeSubscription) {
      return res
        .status(404)
        .json({ error: 'Nenhuma subscrição ativa encontrada' })
    }

    // Verificar se expirou
    if (activeSubscription.isExpired()) {
      activeSubscription.status = 'expirado'
      await activeSubscription.save()

      return res.status(200).json({
        message: 'Subscrição expirou',
        subscription: activeSubscription
      })
    }

    res.json({ subscription: activeSubscription })
  } catch (error) {
    console.error('Erro ao buscar subscrição ativa:', error)
    res.status(500).json({ error: error.message })
  }
}

// Verificar status da subscrição
exports.checkSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.user.id

    const activeSubscription = await UserPlanSubscription.findOne({
      where: {
        userId,
        status: 'ativo'
      },
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'name', 'price']
        }
      ]
    })

    const hasActiveSubscription =
      activeSubscription && activeSubscription.isActive()

    res.json({
      hasActiveSubscription,
      subscription: activeSubscription,
      isExpired: activeSubscription ? activeSubscription.isExpired() : false
    })
  } catch (error) {
    console.error('Erro ao verificar status da subscrição:', error)
    res.status(500).json({ error: error.message })
  }
}
