DB.prototype.countDocuments = function(coll) {
	
	// Returns a promise which resolves to the number of documents in the 
	// specified collection.

	var _this = this;

	return new Promise(function (resolve, reject){

		// {strict:true} means that the count operation will fail if the collection
		// doesn't yet exist

		_this.db.collection(coll, {strict:true}, function(error, collection){
			if (error) {
				console.log("Could not access collection: " + error.message);
				reject(error.message);
			} else {
				collection.count()
				.then(
					function(count) {
						// Resolve the promise with the count
						resolve(count);
					},
					function(err) {
						console.log("countDocuments failed: " + err.message);
						// Reject the promise with the error passed back by the count
						// function
						reject(err.message);
					}
				)
			}
		});
	})
}