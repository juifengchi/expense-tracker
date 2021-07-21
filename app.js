const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/record')

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

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: {
      isEqual: function (x, y) {
        return x === y
      }
    }
  })
)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
})

app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  const { name, date, category, amount } = req.body
  Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.error(error))
})

app.post('/records/:id/edit', (req, res) => {
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
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
