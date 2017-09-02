var _this = this;		// Required as `this` is no longer available in the functions invoked
// in response to the promise being satisfied

myLibrary.myAsyncFunction(myParameters)
.then(
function(myResults) {
// If the asynchronous operation eventually *succeeds* then the first of the `then`
// functions is invoked and this code block will be executed at that time.
// `myResults` is an arbitrary name and it is set to the result data sent back
// by `myAsyncFunction` when resolving the promise

_this.results = myReults;
},
function(myError) {
// If the asynchronous operation eventually *fails* then the second of the `then`
// functions is invoked and this code block will be executed at that time.
// `myError ` is an arbitrary name and it is set to the error data sent back
// by `myAsyncFunction` when rejecting the promise

console.log("Hit a problem: " + myError.message);
}
)