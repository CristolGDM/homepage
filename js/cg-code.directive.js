function codeDirective() {

	return {
		link: parseCode
	}

	function parseCode(scope, element){
		var innerHTML = element[0].innerHTML;
		var textParsed = innerHTML.split("\n");

		var textWithoutEmptyLines = [];

		for (var i = 0; i < textParsed.length; i++) {
			if(textParsed[i].length > 0) textWithoutEmptyLines.push(textParsed[i]);
		}

		var lengthOfIndent = textWithoutEmptyLines[textWithoutEmptyLines.length - 1].length +1;

		var textWithoutIndent = [];

		for (var i = 0; i < textWithoutEmptyLines.length -1; i++) {
			textWithoutIndent.push(textWithoutEmptyLines[i].substring(3));
		}
	};
};