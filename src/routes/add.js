const config = require('../config')
const update = config.update
const find  = config.find


let addJacob = async (res, data) => {
    let currentJacobPoints = data[0].jacob
    console.log(typeof currentJacobPoints)
    let currentLeo = data[0].leo
    if (currentJacobPoints < 101) {
        let currentObj = {leo: currentLeo, jacob: currentJacobPoints}
        let jacob = currentJacobPoints + 1
        let upatedObj = {leo: currentLeo, jacob: jacob}
        await update(currentObj, upatedObj)
        res.send(String(jacob))
    } else if (currentJacobPoints >= 101) {
        let jacob = 0
        let currentObj = {leo: currentLeo, jacob: currentJacobPoints}
        let upatedObj = {leo: currentLeo, jacob: 0}
        await update(currentObj, upatedObj)
        res.send(String(jacob))
    }

}

let addLeo = async (res, data) => {
    let currentLeoPoints = data[0].leo
    let currentJacob = data[0].jacob
    if (currentLeoPoints < 101) {
        let currentObj = {leo: currentLeoPoints, jacob:currentJacob }
        let leo = currentLeoPoints +1
        let upatedObj = {leo: leo, jacob: currentJacob}
        await update(currentObj, upatedObj)
        res.send(String(leo))
    } else if (currentLeoPoints >= 101) {
        let leo = 0
        let currentObj = {leo: currentLeoPoints, jacob: currentJacob}
        let upatedObj = {leo: leo, jacob: currentJacob}
        await update(currentObj, upatedObj)
        res.send(String(leo))
    }
}


let takeawayLeo = async (res, data) => {
    let currentLeoPoints = data[0].leo
    let currentJacob = data[0].jacob
        let currentObj = {leo: currentLeoPoints, jacob:currentJacob }
        let leo = currentLeoPoints - 1
        let upatedObj = {leo: leo, jacob: currentJacob}
        await update(currentObj, upatedObj)
        res.send(String(leo))

}


let takeAwayJacob = async (res, data) => {
    let currentJacobPoints = data[0].jacob
    console.log(typeof currentJacobPoints)
    let currentLeo = data[0].leo
        let currentObj = {leo: currentLeo, jacob: currentJacobPoints}
        let jacob = currentJacobPoints - 1
        let upatedObj = {leo: currentLeo, jacob: jacob}
        await update(currentObj, upatedObj)
        res.send(String(jacob))
}

let add  = async (req,res) =>{
    let url = req.originalUrl
    console.log(url)
    let data = await find({})
    if(url === '/jacobadd'){
       await addJacob(res, data)
    }
    if(url === '/leoadd'){
        await addLeo(res,data)
    }
    if(url === '/leotakeaway'){
       await takeawayLeo(res,data)
    }
    if(url === '/jacobtakeaway'){
        await takeAwayJacob(res,data)
    }



}

module.exports = add
