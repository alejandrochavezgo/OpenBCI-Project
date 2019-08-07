//Modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const Cyton = require('./node_modules/openbci-cyton');
const {constants} = require('./node_modules/openbci-utilities');

//Database settings
const { url } = require('./config/database');
mongoose.connect(url, {
    useNewUrlParser: true
});

require('./config/passport')(passport);

//OpenBCI settings
var ourBoard =  new Cyton ({
    // hardSet:true,
    // verbose: true
    simulate: true
});
var portName = constants.OBCISimulatorPortName;

//Server and Socket.io settings
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 3000);
app.set('views', [path.join(__dirname, 'views'),
                  path.join(__dirname, 'views/signals'),
                  path.join(__dirname, 'views/signals/eeg'),
                  path.join(__dirname, 'views/panel/user/')]);
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

//Server listening
server.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});


//Socket.io functions .............................................................................................

//Emit OpenBCI data on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });
    socket.on('i am client', console.log);
});

// OpenBCI functions ..............................................................................................

var g_data = 0;
var g_text = "";

//Get the data flow from the OpenBCI device and emit it to all clients
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
