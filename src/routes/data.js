const config = require('../config')
const find = config.find

let data =  async (req, res) =>{
    let data =  await find({})
    let d = data[0]
    let leo = d. leo
    let jacob = d.jacob
    res.send({leo, jacob})
}
module.exports = data;

