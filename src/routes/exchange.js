const config = require('../config')
const update = config.update
const find  = config.find
const fs = require('fs')



const exchange = async (req, res) => {
	 let data = await find({})
	 if(!data){
	 	return res.send('ok')
	 }
	 let currentJacobPoints = data[0].jacob
	 let currentLeo = data[0].leo
	 let jacobPoints = parseInt(currentJacobPoints)
	 let currentObj = {leo: currentLeo, jacob: currentJacobPoints}
	 let money =  parseInt(fs.readFileSync('jacobMoney.txt', 'utf8'))
	if(jacobPoints >= 30) {
		jacobPoints = (jacobPoints - 30)
		money += 15
	}
	 update(currentObj, {leo: currentLeo, jacob: jacobPoints})
	 fs.writeFileSync( 'jacobMoney.txt' ,money,'utf8')
	 res.send(String(money))
}


module.exports = exchange;
