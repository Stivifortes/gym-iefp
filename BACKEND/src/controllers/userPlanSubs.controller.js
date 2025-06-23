const db = require('../db/db')
const User = db.models.User
const Plan = db.models.Plans

exports.subscribe = async (req, res) => {
  try {
    const { planId } = req.body
    const userId = req.user.id

    if (!planId) {
      return res.status(400).json({ error: 'ID do plano é obrigatório' })
    }

    const plan = await Plan.findByPk(planId)
    if (!plan) {
      return res.status(404).json({ error: 'Plano não encontrado' })
    }

    const user = await User.findByPk(userId)

    if (user.planId === planId) {
      return res
        .status(400)
        .json({ error: 'Você já está inscrito neste plano' })
    }

    user.planId = planId
    await user.save()

    res.status(200).json({ message: 'Inscrição realizada com sucesso', user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
