var mongoose = require("mongoose");

var supplierSchema = new mongoose.Schema({
	supplierName: String,
	supplierNum: String
});

module.exports = mongoose.model("Supplier", supplierSchema);