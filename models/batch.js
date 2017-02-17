var mongoose = require("mongoose");

var batchSchema = new mongoose.Schema({
	productNum: String,
	supplier: String,
	invoiceNum:String,
	lineNum: String,
	entryDate: String,
	batchCode: String,
	brand: String,
	oemNum: String,
	acqCost: String,
	currency: String,
	exRate: String,
	landedCost: String,
	SRP: String,
	QTY: String,
	lastBatchCodeDate: String,
	remarks: String,
});

module.exports = mongoose.model("Batch", batchSchema);