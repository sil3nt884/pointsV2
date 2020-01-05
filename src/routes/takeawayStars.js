


let config = require('../config')
let find  = config.find
let update = config.update


let takeAwayStars =  async (req, res) =>{
    let data = await find({})
    let dataObj =  data.filter(e => Object.keys(e).includes('collectedstarts'))
    let stars = parseInt(dataObj[0].collectedstarts)
    if(stars > 0) {
        let updated = stars - 1
        let currentObj = {collectedstarts: stars}
        let updatedObj = {collectedstarts: updated}
        await update(currentObj, updatedObj)
        res.write(String(updated))
    }
    res.end()


}

module.exports = takeAwayStars
