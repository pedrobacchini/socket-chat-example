var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    socket.on('disconnect', function(){
        console.log('user disconnected');
        socket.broadcast.emit('chat message', 'someone disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        socket.broadcast.emit('chat message', msg);
    });

    console.log('a user connected');

    socket.broadcast.emit('chat message', 'someone connect');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
