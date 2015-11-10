/*
	Api-caller
*/

function ApiCaller(endpoint, parameters) {
	this.requestUrl = this.buildRequestUrl(endpoint, parameters);
}

ApiCaller.prototype.buildRequestUrl = function (endpoint, parameters) {
	// Loop through the key and values to construct the URL
	var url = endpoint + "?";
	var keys = Object.keys(parameters);
	for (var i = 0; i < keys.length; i += 1) {
		var key = keys[i];
		var val = parameters[key];
		// Encode the key and value
		url += encodeURIComponent(key) + "=" + encodeURIComponent(val);
		// Add an ampersand, if this isn't the last key-value pair 
		if (i !== keys.length - 1) {
			url += "&";
		}
	}
	return url;
}

ApiCaller.prototype.getJson = function (callback) {
	var myRequest = new XMLHttpRequest();
	myRequest.open("GET", this.requestUrl, true);	
	myRequest.onreadystatechange = function () {
		if (myRequest.readyState === 4 && myRequest.status === 200) {
			var jsonResponse = JSON.parse(myRequest.responseText);
			callback(jsonResponse);
		}
	}
	myRequest.send();
}
