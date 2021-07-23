const db = require('../../config/mongoose')
const Category = require('../category')

const category = [
  {
    name: '家居物業',
    value: 'fas fa-home household'
  },
  {
    name: '交通出行',
    value: 'fas fa-shuttle-van traffic'
  },
  {
    name: '休閒娛樂',
    value: 'fas fa-grin-beam entertainment'
  },
  {
    name: '餐飲食品',
    value: 'fas fa-utensils food'
  },
  {
    name: '其他',
    value: 'fas fa-pen other'
  }
]

db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(category).then(() => {
    console.log('done inserting category')
    db.close()
  })
})
