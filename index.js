var http = require('http');
var fs = require('fs');
var url = require('url');
 
var app = http.createServer(function(req, res) {
	var urlParsed = url.parse(req.url);
 
	switch (urlParsed.pathname) {
		case '/':
			sendFile("index.html", res);
			break;
 
		default:
			res.statusCode = 404;
			res.end("Not found");
	}
 
}).listen(3003, function(){
	console.log('server is srart on 3003')
});
 
var io = require('socket.io')(app);
	io.on('connection', function(socket){
		socket.on('NameMessage', function(msg){
			console.log(msg.name + ' сказал: ' + msg.message);
			io.emit('chat name', name);

		});

	});
 
function sendFile(fileName, res) {
	var fileStream = fs.createReadStream(fileName);
	fileStream
		.on('error', function() {
			res.statusCode = 500;
			res.end("Server error");
		})
		.pipe(res)
		.on('close', function() {
			fileStream.destroy();
		});
}


	// io.on('connection', function(socket){
	// 	socket.on('chat message', function(msg){
	// 		io.emit('chat message', msg);
	// 		console.log('сообщение: ' + msg);

	// 	});
	// io.on('connections', function(socket){
	// 	socket.on('chat name', function(name){
	// 		io.emit('chat name', name);
	// 		console.log('Имя: ' + name)
	// 	});
	// });