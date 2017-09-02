var DB = require('./db');

function count (MongoDBURI, collectionName) {

	var database = new DB;

	database.connect(MongoDBURI)
	.then(
		function() {
			// Successfully connected to the database
			// Make the database call and pass the returned promise to the next stage
			return database.countDocuments(collectionName);
		},
		function(err) {
			// DB connection failed, add context to the error and throw it (it will be
			// converted to a rejected promise
			throw("Failed to connect to the database: " + err);
		})
	// The following `.then` clause uses the promise returned by the previous one.
	.then(
		function(count) {
			// Successfully counted the documents
			console.log(count + " documents");
			database.close();
		},
		function(err) {
			// Could have got here by either `database.connect` or `database.countDocuments`
			// failing
			console.log("Failed to count the documents: " + err);
			database.close();
		})
}

count("mongodb://localhost:27017/mongopop", "simples");