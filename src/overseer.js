const fs = require('fs')
const https = require('tls')
const net = require('net')
const http = require('http')


const options = {
	key: fs.readFileSync('/etc/letsencrypt/live/points884.com/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/points884.com/fullchain.pem')
};


const checkIpBlakcList = (ip) => {
	const ips = fs.readFileSync('blacklist.txt', 'utf8').split('\n')
	return ips.filter(remoteAddress => ip === remoteAddress).length > 0
}



https.createServer(options, (socket => {
	 let ip = socket.remoteAddress
	 console.log('connecting ip ' + ip)
	 if(!checkIpBlakcList(ip)){
				const to  = net.createConnection({
			 			host: '127.0.0.1',
						 port: 3000
		 });
		 socket.on('error', handleError)
		 socket.pipe(to)
		 to.pipe(socket)
		 to.on('error', handleError)
	 }
	 else{
	 	console.log('sending away bad person')
	 	socket.end('bye')
	 }

})).listen(443,(data)=>{
		console.log(data)
})


const handleError =  (error) =>{

	console.log(error)
}
