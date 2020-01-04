const config = require('../config')
const find = config.find
const fs = require('fs')


let getCurrentWeek = () =>{
    return fs.readFileSync('currentWeek.txt', 'utf8')
}

let updateWeek = (currentWeek, bool) => {
    fs.writeFileSync('currentWeek.txt', currentWeek+','+bool+'')
}
let rota  = async (req,res) =>{
    let data = await find({})
    let keysHash = {}
   let k = ['Kitchen', 'Laundry', 'Floor' ,'Bathroom' ]
        .forEach(e => keysHash[e] = e )

    let keys =Object.values(data).map(e => Object.keys(e))
    let keysFlattened = new Set([].concat.apply([],keys).filter(e => e in keysHash))
    let dataObj = []
    keysFlattened.forEach(key => {
        dataObj = data.filter(e => e[key])
    })
    let currentWeek = parseInt(getCurrentWeek().split(',')[0])
    let currentDay = new Date().toDateString().substring(0,3)
    let updated = getCurrentWeek().split(',')[1]
    if(currentDay === 'Mon' && updated === 'false'){
         updateWeek(currentWeek, true)
    }
    else if(currentDay === 'Tue'){
        updateWeek(currentWeek, false)
    }

    res.send(dataObj[currentWeek])

}
module.exports = rota
