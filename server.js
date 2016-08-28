'use strict';

const express = require('express');
const socketIO = require('socket.io');
var csv = require('csv');
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const server = express()
  .use((req, res) => {
  		res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  res.send("Server Running...");
	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

var companies; 

fs.readFile('nasdaq-company-list.csv', (err, data) => {
  

console.log("[SuperLoader] : Data File Read !");

	csv.parse(data, function(err, data){

	companies = data;

	console.log("[SuperLoader] : Data Loaded !");
    
  });

});


io.on('connection', function(socket){
  console.log('Search User Connected');
	socket.on('keyword', function(keyword){

		console.log(keyword);

		keyword = keyword.toLowerCase();
	  
		var resultcount = 0;
		var result = [];
		for(var i = 1 ; i < companies.length ; i++){

			

			if(companies[i][1].toLowerCase().indexOf(keyword)>=0){

				result.push(companies[i][1]);
				resultcount++;
			}


			if(resultcount > 7){
				break;
			}
		}

	console.log(JSON.stringify(result));

	socket.emit("result",JSON.stringify(result));


	});
});




setInterval(() => io.emit('time', new Date().toTimeString()), 1000);