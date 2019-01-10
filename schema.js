var mongoose = require('mongoose');

var putSanamSchema = new mongoose.Schema({
  BeaconID: String,
  Status: String,
  Timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BeaconData', putSanamSchema);