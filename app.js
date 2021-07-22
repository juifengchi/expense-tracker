const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Category = require('./models/category')
const Record = require('./models/record')
const isEqual = require('./controller/isEqual')
const sumUpAmount = require('./controller/sumUpAmount')
const methodOverride = require('method-override')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: { isEqual } }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  let categoryFilters = []
  const filter = {}
  const category = req.query.category
  if (category) filter.category = category
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => (categoryFilters = categories))
    .catch(error => console.log(error))
  Record.find(filter)
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const totalAmount = sumUpAmount(records)
      res.render('index', { records, totalAmount, categoryFilters, category })
    })
    .catch(error => console.log(error))
})

app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  const { name, date, category, amount } = req.body
  Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

app.put('/records/:id', (req, res) => {
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

app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
