//Event: Welcome Message
socket.on('welcome', function(data) {
    console.log(data.message);

    //Respond with a message including this clients id sent from the server
    socket.emit('i am client', {data: 'foo!', id: data.id});
});

//Event: Signal Information
socket.on('signals', function(data) {
    setSignal(data.signals);
});

socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

var g_number = [];
function setSignal(signalInformation) {
    g_number = signalInformation;
}
 
//Initialize the charts
function init() {

    //meterlo dentro de un arreglo
    for (let index = 0; index < array.length; index++) {
        const element = array[index]; 
    }

    //Signal 1
    var signal1 = new SmoothieChart({millisPerPixel:5,labels:{precision:6},tooltip:true,timestampFormatter:SmoothieChart.timeFormatter}), 
        canvas = document.getElementById('signal-1'),
        series = new TimeSeries();
    setInterval(function() {
        series.append(new Date().getTime(), g_number[0]);
    }, 100);
    signal1.addTimeSeries(series, {lineWidth:1.6});
    signal1.streamTo(canvas, 500);
        
    //Signal 2
    var signal2 = new SmoothieChart({millisPerPixel:5,labels:{precision:6},tooltip:true,timestampFormatter:SmoothieChart.timeFormatter}), 
        canvas2 = document.getElementById('signal-2'),
        series2 = new TimeSeries();
    setInterval(function() {
        // series.append(new Date().getTime(), Math.random()*10000000000000);
        series2.append(new Date().getTime(), g_number[1]);
    }, 100);
    signal2.addTimeSeries(series2, {lineWidth:1.6});
    signal2.streamTo(canvas2, 500);
        
    //Signal 3
    var signal3 = new SmoothieChart({millisPerPixel:5,labels:{precision:6},tooltip:true,timestampFormatter:SmoothieChart.timeFormatter}), 
        canvas3 = document.getElementById('signal-3'),
        series3 = new TimeSeries();
    setInterval(function() {
        // series.append(new Date().getTime(), Math.random()*10000000000000);
        series3.append(new Date().getTime(), g_number[2]);
    }, 100);
    signal3.addTimeSeries(series3, {lineWidth:1.6});
    signal3.streamTo(canvas3, 500);

    //Signal 4
    var signal4 = new SmoothieChart({millisPerPixel:5,labels:{precision:6},tooltip:true,timestampFormatter:SmoothieChart.timeFormatter}), 
        canvas4 = document.getElementById('signal-4'),
        series4 = new TimeSeries();
    setInterval(function() {
        // series.append(new Date().getTime(), Math.random()*10000000000000);
        series4.append(new Date().getTime(), g_number[3]);
    }, 100);
    signal4.addTimeSeries(series4, {lineWidth:1.6});
    signal4.streamTo(canvas4, 500);

    //Signal 5
    var signal5 = new SmoothieChart({millisPerPixel:5,labels:{precision:6},tooltip:true,timestampFormatter:SmoothieChart.timeFormatter}), 
        canvas5 = document.getElementById('signal-5'),
        series5 = new TimeSeries();
    setInterval(function() {
        // series.append(new Date().getTime(), Math.random()*10000000000000);
        series5.append(new Date().getTime(), g_number[4]);
    }, 100);
    signal5.addTimeSeries(series5, {lineWidth:1.6});
    signal5.streamTo(canvas5, 500);

    //Signal 6
    var signal6 = new SmoothieChart({millisPerPixel:5,labels:{precision:6},tooltip:true,timestampFormatter:SmoothieChart.timeFormatter}), 
        canvas6 = document.getElementById('signal-6'),
        series6 = new TimeSeries();
    setInterval(function() {
        // series.append(new Date().getTime(), Math.random()*10000000000000);
        series6.append(new Date().getTime(), g_number[5]);
    }, 100);
    signal6.addTimeSeries(series6, {lineWidth:1.6});
    signal6.streamTo(canvas6, 500);

    //Signal 7
    var signal7 = new SmoothieChart({millisPerPixel:5,labels:{precision:6},tooltip:true,timestampFormatter:SmoothieChart.timeFormatter}), 
        canvas7 = document.getElementById('signal-7'),
        series7 = new TimeSeries();
    setInterval(function() {
        // series.append(new Date().getTime(), Math.random()*10000000000000);
        series7.append(new Date().getTime(), g_number[6]);
    }, 100);
    signal7.addTimeSeries(series7, {lineWidth:1.6});
    signal7.streamTo(canvas7, 500);

    //Signal 8
    var signal8 = new SmoothieChart({millisPerPixel:5,labels:{precision:6},tooltip:true,timestampFormatter:SmoothieChart.timeFormatter}), 
        canvas8 = document.getElementById('signal-8'),
        series8 = new TimeSeries();
    setInterval(function() {
        // series.append(new Date().getTime(), Math.random()*10000000000000);
        series8.append(new Date().getTime(), g_number[7]);
    }, 100);
    signal8.addTimeSeries(series8, {lineWidth:1.6});
    signal8.streamTo(canvas8, 500);
}