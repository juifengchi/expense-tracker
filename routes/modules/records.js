const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  let categoryFilters = []
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      categoryFilters = categories
      res.render('new', { categoryFilters })
    })
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  let categoryFilters = []
  const id = req.params.id
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => (categoryFilters = categories))
    .catch(error => console.log(error))
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record, categoryFilters }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
