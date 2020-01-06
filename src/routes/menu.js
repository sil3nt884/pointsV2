let fs = require('fs')

let menu = (req, res) => {
    let url = req.originalUrl

    req.on('data', (data)=>{
       let body = String(data)
       if(url === '/savemenu'){
            let menuItem = Object.keys(JSON.parse(body))
            let list =  menuItem.map(e => e.split('_')[0])
            let menu = {items: list}
            fs.writeFileSync('menu.json', JSON.stringify(menu))
       }
    })

    if(url === '/menu'){
        let data = fs.readFileSync('menu.json')
        res.write(data)
    }

   res.end()
}


module.exports = menu
