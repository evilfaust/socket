var http = require('http');
var fs = require('fs');
var url = require('url');
var io = require('socket.io')(http);

http.createServer(function(req, res) {
    var urlParsed = url.parse(req.url);

    switch (urlParsed.pathname) {
        case '/':
            sendFile("index.html", res);
            break;

        default:
            res.statusCode = 404;
            res.end("Not found");
    }

    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });

}).listen(3003, function(){
    console.log('server is srart on 3003')
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