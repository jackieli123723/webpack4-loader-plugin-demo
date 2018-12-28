// module.exports = function (source) {
// 	const result = source.replace("vue","world")
// 	return result
// }

const loaderUtils = require('loader-utils');
module.exports = function (source) {
	const options = loaderUtils.getOptions(this);
	const result = source.replace("vue",options.name)
	return result
}