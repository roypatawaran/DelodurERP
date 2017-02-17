var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var product = require("./models/products.js");
var batch = require("./models/batch.js");
var supplier = require("./models/supplier.js");
var moment = require("moment");
var batchRoutes = require("./routes/batch.js");
var productRoutes = require("./routes/products.js");

var app = express();

mongoose.connect("mongodb://127.0.0.1:27017/delodurdb");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//=============router decs
app.use(batchRoutes);
app.use(productRoutes);

app.get("/cleandb", function(req,res){
	product.find({productNum: {$type: "int"}}, function(err, resp){
		var n = 0;
		resp.forEach(function(x){
		x.productNum = new String(x.productNum);
		x.QTY = new String(x.QTY);
		x.stillValid = new String(x.stillValid);
		x.update({productNum: x.productNum, QTY: x.QTY, stillValid: x.stillValid}, function(err){
			if(err){
				console.log(err);
			}
			else {
				// console.log(n);
				// n++;
			}
		});
		console.log("complete");
	});
});
});


app.listen(3001, "172.16.21.131", function(){
	console.log("Server has started");
})