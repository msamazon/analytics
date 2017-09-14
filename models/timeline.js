var mongoose  = require("mongoose")
var Schema    = mongoose.Schema

var TimelineSchema = new Schema({
  Veiculo: String,
  Device: String,
  Data: String,
  Hora: String,
  Ignition: String
})

//Register schema to Mongoose
var Timeline = mongoose.model('Timeline', TimelineSchema);

module.exports = Timeline