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

		var createdCode = createHtmlCode(textWithoutIndent);

		element[0].innerHTML = createdCode;
	}

	function createHtmlCode(rawCode) {
		var returnCode = '<div class="code-component">';

		for (var i = 0; i < rawCode.length; i++) {
			returnCode += processLine(rawCode[i]);
		}

		returnCode += '</div>';

		return returnCode;
	}

	function processLine(rawLine) {
		if(rawLine.indexOf("//") > -1 || rawLine.indexOf("/*") > -1 || rawLine.indexOf("*/") > -1) {
			rawLine = '<span class="comment">' + rawLine + '</span>';
		}
		else{
			rawLine = rawLine.replace("&gt;", "<");
			rawLine = rawLine.replace("&lt;", ">");
			rawLine = rawLine.replace(/[-=+*><]/g, function(string){
				return '<span class="symbol">' + string + '</span>';
			});
			rawLine = rawLine.replace(/\"(.+?)\"/g, function(string){
				if(string == '"symbol"') return string;
				return '<span class="string">' + string + '</span>';
			})
			rawLine = rawLine.replace(/\'(.+?)\'/g, function(string){
				if(string == "'symbol'") return string;
				return '<span class="string">' + string + '</span>';
			})
			rawLine = rawLine.replace('var ', '<span class="var">var</span> ');
			rawLine = rawLine.replace('return ', '<span class="return">return</span> ');
			rawLine = rawLine.replace('for (', '<span class="for">for</span> (');
			rawLine = rawLine.replace('for(', '<span class="for">for</span>(');
			rawLine = rawLine.replace('if (', '<span class="if">if</span> (');
			rawLine = rawLine.replace('if(', '<span class="if">if</span>(');
			rawLine = rawLine.replace('else ', '<span class="else">else</span> ');
			rawLine = rawLine.replace('else{', '<span class="else">else</span>{');

			// rawLine = rawLine.replace('function', '<span class="function">function</span>');
		}

		return '<div class="code-line">' + rawLine + '</div>';
	}
};