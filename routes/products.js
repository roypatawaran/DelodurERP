var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var product = require("../models/products.js");
var batch = require("../models/batch.js");
var supplier = require("../models/supplier.js");
var moment = require("moment");


var router = express.Router();

router.get("/part", function(req,res){
	product.find({}, function(err, foundProducts){
		if(err){
			console.log(err);
		}
		else{
			res.render("viewParts.ejs", {prods: foundProducts});
		}
	});
});

router.get("/part/new", function(req,res){
	var date = moment().format("MM/DD/YYYY");
	res.render("inputParts.ejs", {date: date});
});

router.post("/part", function(req,res){
	console.log(req.body);
	product.count({productNum: req.body.productNum}, function(err, count){
		if(!count){
			var newprod = {brand: req.body.brand, partNum: req.body.partNum, productNum: req.body.productNum, entryDate: req.body.entryDate, stillValid: req.body.stillValid, alternatives: req.body.alternatives, QTY: "0" };
				product.create(newprod, function(err, newProduct){
					if(err){
						console.log(err);
						res.redirect("/part/new");
					}
					else{
						console.log("Product has been posted")
						res.redirect("/part");
					}
				});
		}
		else {
			console.log("Product Already Exists!");
			res.redirect("part/new");
		}
	})
	
});

// part search

router.get("/part/search", function(req,res){
	res.render("partSearch.ejs");
});

router.post("/part/search", function(req,res){
	product.find({partNum: req.body.partNum}, function(err, foundParts){
		if (err){
			console.log(err);
			res.redirect("/part/search");
		}
		else {
			res.render("viewParts.ejs", {prods: foundParts});
		}
	})
});

router.get("/part/show/:id", function(req,res){
	product.findOne({partNum: req.params.id}, function(err, foundParts){
		if(err){
			console.log(err);
		}
		else {
			res.render("showParts.ejs",{prod: foundParts});
		}
	})
	
});

router.get("/part/activity/:id", function(req,res){
	batch.find({partNum: req.params.id}, function(err, foundBatches){
		if(err){
			console.log(err);
		}
		else {
			res.render("viewBatches.ejs",{prods: foundBatches});
		}
	})
	
});

// product search

router.get("/product/search", function(req,res){
	res.render("productSearch.ejs");
});

router.post("/product/search", function(req,res){
	product.count({partNum: req.body.partNum}, function(err, count){
		if(!count){
			console.log("no part found!");
			res.redirect("/part/new");
		}
		else {
			product.find({partNum: req.body.partNum}, function(err, foundParts){
				if (err){
					console.log(err);
					res.redirect("/product/search");
				}
				else {
					console.log(foundParts);
					var pass = req.body.partNum;
					res.render("brandPart.ejs", {prods: foundParts, pass: pass});
				}
			});
		}
	});
	
});

router.post("/product/search2", function(req,res){
	console.log(req.body.prodNum);
	product.find({productNum: req.body.prodNum}, function(err, foundParts){
		if (err){
			console.log(err);
			res.redirect("/product/search");
		}
		else {
			res.render("viewBatches.ejs", {prods: foundParts});
		}
	})
});

router.get("/product/show/:id", function(req,res){
	product.findOne({productNum: req.params.id}, function(err, foundParts){
		if(err){
			console.log(err);
		}
		else {
			res.render("showParts.ejs",{prod: foundParts});
		}
	})
	
});

router.get("/product/activity/:id", function(req,res){
	batch.find({productNum: req.params.id}, function(err, foundBatches){
		if(err){
			console.log(err);
		}
		else {
			res.render("viewBatches.ejs",{prods: foundBatches});
		}
	})
	
});



module.exports = router;