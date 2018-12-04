function codeDirective() {
	var fileName = "";

	return {
		scope: {
			name: "@"
		},
		link: parseCode
	}

	function createHtmlCode(rawCode) {
		var returnCode = '<div class="code-component">';
		if(fileName != null) returnCode += '<div class="code-filename">' + fileName + '</div>';

		for (var i = 0; i < rawCode.length; i++) {
			returnCode += processLine(rawCode[i], i);
		}

		returnCode += '</div>';

		return returnCode;
	}

	function isComment(line){
		line = line.replace(" ", "");
		line = line.replace("	", "");

		return line.indexOf("//") > -1 || line.indexOf("/*") > -1 || line.indexOf("*/") > -1 || line[0] === "*";
	}

	function parseCode(scope, element){
		var innerHTML = element[0].innerHTML;
		var textParsed = innerHTML.split("\n");
		fileName = scope.name;

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

	function processFunction(rawLine) {
		var functionPosition = rawLine.indexOf("function");
		var parenthesisPosition = functionPosition + 8;
		var endPosition = functionPosition + 9;

		for (var i = parenthesisPosition; i < rawLine.length; i++) {
			if (rawLine[i] == ("(")) {
				parenthesisPosition = i;
			}
			else if (rawLine[i] == (")")) {
				endPosition = i;
				break;
			}
		}

		if (endPosition - parenthesisPosition > 1) {
			var argsString = rawLine.substring(parenthesisPosition+1, endPosition);
			var args = argsString.replace(" ", "").split(",");

			for (var i = 0; i < args.length; i++) {
				args[i] = '<span class="function-arg">' + args[i] + "</span>";
			}

			rawLine = rawLine.replace(argsString, args.join(", "));
		}
		if (parenthesisPosition - functionPosition > 9) {
			var functionName = rawLine.substring(functionPosition + 9, parenthesisPosition).replace(" ", "");
			rawLine = rawLine.replace("function", '<span class="function-dec">function</span>')
			rawLine = rawLine.replace(functionName, '<span class="function-name">' + functionName + "</span>");
		}

		return rawLine;
	}

	function processLine(rawLine, lineNumber) {
		if(isComment(rawLine)) {
			rawLine = '<span class="comment">' + rawLine + '</span>';
			rawLine = rawLine.replace("\	", '<span class="tab">	</span>');
		}
		else{
			rawLine = rawLine.replace("&gt;", "<");
			rawLine = rawLine.replace("&lt;", ">");
			rawLine = rawLine.replace(/[-=+*><]/g, function(string){
				return "<span class='symbol'>" + string + '</span>';
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
			rawLine = rawLine.replace("\	", '<span class="tab">	</span>');

			if(rawLine.indexOf("\\") > -1) {
				var additionalChar = rawLine[rawLine.indexOf("\\") +1];
				rawLine = rawLine.replace("\\" + additionalChar, '<span class="escape-char">\\' + additionalChar + '</span>');
			}

			if(rawLine.indexOf("function") > -1) {
				rawLine = processFunction(rawLine);
			}

			if (rawLine.indexOf("(") > -1 && rawLine.indexOf("function-name") === -1) {
				rawLine = processParenthesis(rawLine);
			}

			if (rawLine.indexOf("function-arg") === -1) {

				rawLine = rawLine.replace(/\d+/g, function(string){
					var precLetter = rawLine[rawLine.indexOf(string) -1];
					var nextLetter = rawLine[rawLine.indexOf(string) +1];
					if(precLetter.toLowerCase() != precLetter.toUpperCase()) return string;
					if(nextLetter.toLowerCase() != nextLetter.toUpperCase()) return string;
					return '<span class="number">' + string + "</span>"
				})
			}
		}

		return '<div class="code-line"><div class="code--line-number">' + (lineNumber +1) + '</div><div class="code--line-content">' + rawLine + '</div></div>';
	}

	function processParenthesis(rawLine) {
		var parenthesisPosition = rawLine.indexOf("(");
		var endPosition = 0;
		var stopChar = "";

		if(rawLine.substring(parenthesisPosition+1, rawLine.length -1).indexOf("(") > -1 ) {
			rawLine = rawLine.substring(0, parenthesisPosition) + "(" + processParenthesis(rawLine.substring(parenthesisPosition +1, rawLine.length -1));
		};

		for (var i = parenthesisPosition -1; i > 0; i--) {
			if(!/^[A-Z]$/i.test(rawLine[i]) && rawLine[i] != " ") {
				endPosition = i+1;
				stopChar = rawLine[i];
				break;
			}
		}

		var foundWord = rawLine.substring(endPosition, parenthesisPosition);

		return rawLine.replace(stopChar + foundWord + "(", stopChar + '<span class="function">' + foundWord + '</span>(');

	}
};