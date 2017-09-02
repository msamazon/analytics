DB.prototype.close = function() {
	
	// Close the database connection. This if the connection isn't open
	// then just ignore, if closing a connection fails then log the fact
	// but then move on. This method returns nothing – the caller can fire
	// and forget.

	if (this.db) {
		this.db.close()
		.then(
			function() {},
			function(error) {
				console.log("Failed to close the database: " + error.message)
			}
		)	
	}
}