const parseCopyrights = (html) => {
	let startIndex = html.lastIndexOf('©');
	let endIndex = Math.min(html.indexOf('\\', startIndex), html.indexOf('<', startIndex))

	if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
		return html.substring(startIndex, endIndex );
	} else {
		return 'Copyrights is not found';
	}
};

module.exports = { parseCopyrights };