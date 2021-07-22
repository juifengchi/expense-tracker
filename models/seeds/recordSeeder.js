const mongoose = require('mongoose')
const Record = require('../record')
const record = [
  {
    name: '午餐',
    date: '2019-04-23',
    category: 'food',
    amount: 60
  },
  {
    name: '晚餐',
    date: '2019-04-23',
    category: 'food',
    amount: 60
  },
  {
    name: '捷運',
    date: '2019-04-23',
    category: 'traffic',
    amount: 120
  },
  {
    name: '電影：驚奇隊長',
    date: '2019-04-23',
    category: 'entertainment',
    amount: 220
  },
  {
    name: '租金',
    date: '2019-04-01',
    category: 'household',
    amount: 25000
  }
]

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(record)
  console.log('done')
})
