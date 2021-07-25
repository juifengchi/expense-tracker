const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const sumUpAmount = require('../../controller/sumUpAmount')

router.get('/', (req, res) => {
  const filter = {}
  const category = req.query.category
  if (category) filter.category = category
  Record.find(filter)
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => {
          const totalAmount = sumUpAmount(records)
          res.render('index', { records, totalAmount, categories, category })
        })
    })
    .catch(error => console.log(error))
})

module.exports = router
