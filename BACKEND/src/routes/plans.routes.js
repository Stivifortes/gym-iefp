const express = require('express')
const router = express.Router()

router.post('/', plansController.create)
router.get('/', plansController.findAll)
router.get('/:id', plansController.findOne)
router.put('/:id', plansController.update)
router.delete('/:id', plansController.delete)

module.exports = router
