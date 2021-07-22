const mongoose = require('mongoose')
const Category = require('../category')
const category = [
  {
    name: '家居物業',
    value: 'household'
  },
  {
    name: '交通出行',
    value: 'traffic'
  },
  {
    name: '休閒娛樂',
    value: 'entertainment'
  },
  {
    name: '餐飲食品',
    value: 'food'
  },
  {
    name: '其他',
    value: 'other'
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
    .then(() => {
      console.log('done inserting category')
      db.close()
    })
})
