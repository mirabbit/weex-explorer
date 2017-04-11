const stream = weex.requireModule('stream');

function get(url, callback) {
	return stream.fetch({
		method: 'GET',
		type: 'jsonp',
		headers:{},
		body: 'framework=weex',
		url: url,
    }, callback);
}

module.exports = { 
	get,
};  