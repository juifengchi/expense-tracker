function sumUpAmount (records) {
  let total = 0
  records.forEach(record => {
    total += record.amount
  })
  return total
}

module.exports = sumUpAmount
