let config = require('../config')
let find  = config.find
let update = config.update


let addStar = async (req, res) => {
    let data = await find({})
    let dataObj =  data.filter(e => Object.keys(e).includes('collectedstarts'))

    let stars = parseInt(dataObj[0].collectedstarts)
    if(stars < 10) {
        let updated = stars + 1
        let currentObj = {collectedstarts: stars}
        let updatedObj = {collectedstarts: updated}
        await update(currentObj, updatedObj)
        res.write(String(updated))
    }
    if(stars >= 10) {
        let updated = 0
        let currentObj = {collectedstarts: stars}
        let updatedObj = {collectedstarts: updated}
        await update(currentObj, updatedObj)
        res.write(String(updated))
    }


    res.end()

}

module.exports = addStar
