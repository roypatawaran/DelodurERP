var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var product = require("../models/products.js");
var batch = require("../models/batch.js");
var supplier = require("../models/supplier.js");
var moment = require("moment");


var router = express.Router();

router.get("/addBatch", function(req, res){
	res.render("prodValidation.ejs");
});

router.post("/addBatch", function(req,res){
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
					res.render("brandPartb.ejs", {prods: foundParts, pass: pass});
				}
			});
		}
	});
	
});

router.post("/addBatch2", function(req,res){
	product.findOne({productNum: req.body.prodNum}, function(err, foundProd){
		if(err){
			console.log("Product Does Not Exist Yet");
			res.redirect("/part/new");
		}
		else{
			console.log(foundProd)
			if(foundProd == null){
				console.log("Product Does Not Exist Yet");
				res.redirect("/part/new");
			}
			else {
				res.redirect("batch/new/"+foundProd.productNum);
			}
			
		}
	})
});

router.get("/batch/new/:id", function(req,res){
	var date = moment().format("MM/DD/YYYY");
	supplier.find({}, function(err, foundSuppliers){
		if(err){
			res.redirect("batch");
		}
		else {
			product.findOne({productNum: req.params.id}, function(err, foundProd){
				if(err){
					console.log("cannot create batch");
					res.redirect("/part/new");
				}
				else {
					res.render("inputBatch.ejs", {suppliers: foundSuppliers, date: date, prod: foundProd});
				}
			})
			
		}
	});
});

router.post("/batch", function(req,res){
	console.log(req.body);
	var newprod = {productNum: req.body.productNum, supplier: req.body.supplier, invoiceNum: req.body.invoiceNum,
		lineNum: req.body.lineNum, entryDate: req.body.entryDate, batchCode: req.body.batchCode, brand: req.body.brand,
		oemNum: req.body.oemNum, acqCost: req.body.acqCost, currency: req.body.currency, exRate: req.body.exRate,
		landedCost: req.body.landedCost, SRP: req.body.SRP, QTY: req.body.QTY, lastBatchCodeDate: req.body.lastBatchCodeDate, remarks: req.body.remarks,
	};
	product.findOne({productNum: req.body.productNum}, function(err, foundProd){
		if(err){
			console.log(err);
			res.redirect("/product/new");
		}
		else{
			var x = parseInt(foundProd.QTY) + parseInt(req.body.QTY);
			console.log(x);
			foundProd.update({QTY: x}, function(err,doc){
				if(err){
					console(err);
				}
				else{
					batch.create(newprod, function(err, newProduct){
						if(err){
							console.log(err);
							res.redirect("/batch/new");
						}
						else{
							console.log("Batch has been posted");
							res.redirect("/batch");
						}
					});
				}
			});
			
		}
	});
	
});

router.get("/batch", function(req,res){
	batch.find({}, function(err, foundBatches){
		if(err){
			console.log(err);
		}
		else{
			res.render("viewBatches.ejs", {prods: foundBatches});
		}
	});
});



//batchsearch

// product search

router.get("/batch/search", function(req,res){
	res.render("batchSearch.ejs");
});

router.post("/batch/search", function(req,res){
	batch.find({batchCode: req.body.batchCode}, function(err, foundBatches){
		if (err){
			console.log(err);
			res.redirect("/batch/search");
		}
		else {
			res.render("viewBatches.ejs", {prods: foundBatches});
		}
	})
});

router.get("/batch/show/:id", function(req,res){
	batch.findOne({batchCode: req.params.id}, function(err, foundBatches){
		if(err){
			console.log(err);
		}
		else {
			res.render("showBatches.ejs",{prod: foundBatches});
		}
	})
	
});

module.exports = router;