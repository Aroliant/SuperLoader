var csv = require('csv');
const fs = require("fs");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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




http.listen(80, function(){
  console.log('listening on *:80');
});
