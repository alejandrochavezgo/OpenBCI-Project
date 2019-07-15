const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

//Database settings
const { url } = require('./config/database');
mongoose.connect(url, {
    useNewUrlParser: true
});

// require('./config/passport')(passport);

//Server settings
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'apollo',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routes
require('./routes/routes')(app, passport);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});


// var http = require('http'),
//     fs = require('fs')
// var _dirname = 'C:/Users/Alejandro Chávez/Documents/Testing/OpenBCI/OpenBCI-Project';
// var index = fs.readFileSync(_dirname + '/Index.html');

// //Send index.html to all requests
// var app = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(index);
// });

// //Socket.io server listens to our app
// var io = require('socket.io').listen(app);

// // Send current time to all connected clients
// function sendTime() {
//     io.emit('time', { time: new Date().toJSON() });
// }

// // Send current time every 10 secs
// // setInterval(sendTime, 10000);

// // Emit welcome message on connection
// io.on('connection', function(socket) {
//     // Use socket to communicate with this particular client only, sending it it's own id
//     socket.emit('welcome', { message: 'Welcome!', id: socket.id });

//     socket.on('i am client', console.log);
// });

// app.listen(3000);




// // OPENBCI...............................................................................................................
// const Cyton = require('./node_modules/openbci-cyton');
// const {constants} = require('./node_modules/openbci-utilities');

// var ourBoard =  new Cyton ({
//     // hardSet:true,
//     // verbose: true
//     simulate: true
// });
// var g_data = 0;
// var g_text = "";

// var portName = constants.OBCISimulatorPortName;

// ourBoard.connect().then(function () {
//     ourBoard.streamStart();
//     ourBoard.on('sample', function (sample) {
//         for(var i = 0; i < 8; i++) {
//             console.log("[" + i + "] -> " + sample.channelData[i]);
//             g_data = sample.channelData[i];
//             g_text += sample.channelData[i] + ", "
//         }
//         console.log(g_text);
//         io.emit('time', { time: g_text });
//         g_text = "";
//         console.log("................................................................................................");
//     });
// });
