const config = require('../config')
const find = config.find
const fs = require('fs')

let data =  async (req, res) =>{
    let data =  await find({})
    let d = data[0]
    let leo = d. leo
    let jacob = d.jacob
    let money = fs.readFileSync('jacobMoney.txt', 'utf8')
    res.send({leo, jacob, money})
}
module.exports = data;

