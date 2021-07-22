const db = require('../../config/mongoose')
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

db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(category).then(() => {
    console.log('done inserting category')
    db.close()
  })
})
