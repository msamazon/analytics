return new Promise(function(resolve, reject) {
	// At this point, control has already been passed back to the calling function
  // and so we can safely perform operations that might take a little time (e.g.
	// a big database update) without the application hanging.

	var result = doSomethingThatTakesTime();

	// If the operation eventually succeeds then we can invoke `resolve` (the name is
	// arbitrary, it just has to patch the first function argument when the promise was
  // created) and optionally pass back the results of the operation

	if (result.everythingWentOK) {
		resolve(result.documentsReadFromDatabase);
	} else {
		
		// Call `reject` to fail the promise and optionally provide error information
		
		reject("Something went wrong: " + result.error.message);
	}
})