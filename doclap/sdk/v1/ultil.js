
const utils_sdk = {
	encodeBase64String(input){
	},
	
	decodeBase64String(input) {
	},
	
	getUTCDateString() {
		const today = new Date();
		// Returns date format 'YYYY-MM-DD'
		return today.toISOString().substring(0, 10);
	},

    parse_query_string(name, url){
        name = name.replace(/[[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
};