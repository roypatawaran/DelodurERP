var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
	productNum: String,
	description: String,
	oemNum: String,
	entryDate: String,
	brand: String,
	stillValid: String,
	alternatives: String,
	QTY: String,
	SRP: String,
	partNum: String
	
});

module.exports = mongoose.model("Product", productSchema);