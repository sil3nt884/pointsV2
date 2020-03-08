const app = require('./app')
const http = require('http')
const config = require ('./config')



const server = http.createServer(app)
app.set('port', config.port)

server.listen(config.port)

server.on('listen', ()=>{
    console.log(`listening on port ${config.port}`)
})


http.createServer((req, res)=>{
   let host = req.headers.host
    res.writeHead(301,
        {Location: `https:///${host}`}
    );
    res.end()
}).listen(80)


