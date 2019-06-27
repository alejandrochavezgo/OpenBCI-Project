// // OPENBCI...............................................................................................................
// const Cyton = require('./node_modules/openbci-cyton');
// var ourBoard =  new Cyton ({
//     hardSet:true,
//     verbose: true
// });
// var g_data = 0;
// ourBoard.connect("COM3").then(function () {
//     ourBoard.streamStart();
//     ourBoard.on('sample', function (sample) {
//         for(var i = 0; i < 8; i++) {
//             console.log("[" + i + "] -> " + sample.channelData[i]);
//             g_data = sample.channelData[i];
//         }
//         console.log("................................................................................................");
//     });
// });



//SERVER NODE.JS................................................................................................................
//var http =  require('http');
//var fs = require('fs');
//var _dirname = 'C:/Users/ITT/Desktop/Servicio Social/OpenBCI';
//var server = http.createServer(function (req, res) {
//    console.log('request was made: ' + req.url);
//    res.writeHead(200, {'Content-Type': 'text/html'});
//    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
//    console.log("g_data: " + g_data);
//    myReadStream.pipe(res);
//});
//server.listen(3000, '127.0.0.1');
//console.log("Listening to port 3000");

//SERVER EXPRESS.JS

// var express = require('express');
// var app = express();
//
// app.get('/', function (req, res) {
//     res.send('Hello World');
// })
//
// var server = app.listen(8081, function () {
//     var host = server.address().address
//     var port = server.address().port
//
//     console.log("Example app listening at http://%s:%s", host, port)
// })


//.................................

var http = require('http'),
    fs = require('fs')
var _dirname = 'C:/Users/Alejandro Chávez/Documents/Testing/OpenBCI/OpenBCI-Project';
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(_dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
// setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('i am client', console.log);
});

app.listen(3000);




// OPENBCI...............................................................................................................
const Cyton = require('./node_modules/openbci-cyton');
const {constants} = require('./node_modules/openbci-utilities');

var ourBoard =  new Cyton ({
    // hardSet:true,
    // verbose: true
    simulate: true
});
var g_data = 0;
var g_text = "";

var portName = constants.OBCISimulatorPortName;

ourBoard.connect().then(function () {
    ourBoard.streamStart();
    ourBoard.on('sample', function (sample) {
        for(var i = 0; i < 8; i++) {
            console.log("[" + i + "] -> " + sample.channelData[i]);
            g_data = sample.channelData[i];
            g_text += sample.channelData[i] + ", "
        }
        console.log(g_text);
        io.emit('time', { time: g_text });
        g_text = "";
        console.log("................................................................................................");
    });
});
