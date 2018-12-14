const express = require('express'), 
      http = require('http'),
      socketIo = require('socket.io'),
      app = express(),
      server = http.Server(app);
      var cpuStats = require('cpu-stats');
      

app.get('/', (req, res) => res.send("Hello World"));

server.listen(5581);

const io = socketIo(server);


setInterval(function() {
    cpuStats(100, function(error, result) {
        if(error) return console.error('Oh noes!', error) // actually this will never happen
       var data;
       // console.info(result[1].cpu);
       // data = result[1].cpu;
        core1 = result[1].cpu;
        core2 = result[2].cpu;
        data =[core1,core2];

        
        
     //   console.log(data[1]);
      
        io.sockets.emit('hello', user_data);
    


      });

  }, 100);

  io.on('connection', function (socket) {
    console.log('a user connected');
  });





  var Buffer = require('buffer').Buffer;
  var Iconv = require('iconv').Iconv;
  
  var user = 4096;
  var array = [];
  var user_data = new Array();
  
  const socket1 = require(`zmq`).socket(`sub`); // SUB socket
  
  socket1.connect(`tcp://192.168.1.83:5581`);      // Connect to port 3000  // 148 83
  
   for(var user_count = 1; user_count <= user; user_count++ ){
       
     //eval("var a"+user_count+"=[];");
     // array[user_count]=[];
      user_data[user_count] = new Array();
     // user_data[user_count].push('a');
      
   }
  // Subscribe to 'heartbeat'
  socket1.subscribe('');
  console.log('connected!');
  
  
  var userId;
  var bandwith;
  socket1.on(`message`, function (topic, data) {
      
     
  
      for (var counter = 0; counter < topic.length; counter += 4) {
          if (counter === 0){
              userId = topic.readUInt32LE(counter);
          }
          else if (counter === 4){
              bandwith = topic.readUInt32LE(counter);
           
              user_data[userId].push(bandwith);
              console.log(userId);
          
          }
         // console.log("32 data : " + topic.readUInt32LE(counter));
       //   console.log(userId);
        //  console.log(user_data);
      }
  
      console.log("---------------------------------------"); 
     
  //  
  // // console.log(data.toString('utf32le'));
  //  var iconv = new Iconv('UTF-32', 'UTF-8//IGNORE');
  ////var buffer = iconv.convert((data));
  ////console.log(buffer);
  //var buffer1 = new Buffer('fe');
  //console.log(buffer1);
  ////var x = (data.toString());
  //var buffer = iconv.convert((topic));
  //
  //console.log(buffer);
  });