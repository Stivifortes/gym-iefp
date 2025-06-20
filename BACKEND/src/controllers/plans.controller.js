const db = require('../db/db')
const Plan = db.models.Plans

exports.create = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: 'Corpo da requisição vazio. Nada para criar.' })
    }

    const plan = await Plan.create(req.body)
    return res.status(201).json(plan)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

exports.getAll = async (req, res) => {
  try {
    const plans = await Plan.findAll()
    return res.status(200).json(plans)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

exports.getById = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id)
    if (!plan) {
      return res.status(404).json({ error: 'Plano não encontrado' })
    }
    return res.status(200).json(plan)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

exports.update = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id)
    if (!plan) {
      return res.status(404).json({ error: 'Plano não encontrado' })
    }

    await plan.update(req.body)
    return res.status(200).json(plan)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

exports.remove = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id)
    if (!plan) {
      return res.status(404).json({ error: 'Plano não encontrado' })
    }

    await plan.destroy()
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
