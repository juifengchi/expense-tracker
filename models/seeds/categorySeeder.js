const mongoose = require('mongoose')
const Category = require('../category')
const category = [
  {
    name: '家居物業'
  },
  {
    name: '交通出行'
  },
  {
    name: '休閒娛樂'
  },
  {
    name: '餐飲食品'
  },
  {
    name: '其他'
  }
]

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(category)
  console.log('done')
})
