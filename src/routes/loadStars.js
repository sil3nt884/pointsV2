let config = require('../config')
let find  = config.find
let update = config.update


let loadStars = async (req, res) =>{
    let data = await find({})
    let dataObj =  data.filter(e => Object.keys(e).includes('collectedstarts'))
    res.write(String(dataObj[0].collectedstarts))
    res.end()
}


module.exports = loadStars
