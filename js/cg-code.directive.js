function codeDirective() {
	let fileName = "";

	return {
		scope: {
			name: "@"
		},
		link: parseCode
	}

	function createHtmlCode(rawCode) {
		let returnCode = '<div class="code-component">';
		if(fileName != null) returnCode += '<div class="code-filename">' + fileName + '</div>';

		for (let i = 0; i < rawCode.length; i++) {
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
		const innerHTML = element[0].innerHTML;
		const textParsed = innerHTML.split("\n");
		fileName = scope.name;

		let textWithoutEmptyLines = [];

		for (let i = 0; i < textParsed.length; i++) {
			if(textParsed[i].replace(" ","").replace(/\t/g, "").length > 0) {
				textWithoutEmptyLines.push(textParsed[i]);
			}
		}

		const lengthOfIndent = textWithoutEmptyLines[textWithoutEmptyLines.length - 1].match(/\t/g).length;

		let textWithoutIndent = [];

		for (let i = 0; i < textWithoutEmptyLines.length; i++) {
			textWithoutIndent.push(textWithoutEmptyLines[i].substring(lengthOfIndent));
		}

		const createdCode = createHtmlCode(textWithoutIndent);

		element[0].innerHTML = createdCode;
	}

	function processFunction(rawLine) {
		const functionPosition = rawLine.indexOf("function");
		let parenthesisPosition = functionPosition + 8;
		let endPosition = functionPosition + 9;

		for (let i = parenthesisPosition; i < rawLine.length; i++) {
			if (rawLine[i] == ("(")) {
				parenthesisPosition = i;
			}
			else if (rawLine[i] == (")")) {
				endPosition = i;
				break;
			}
		}

		if (endPosition - parenthesisPosition > 1) {
			const argsString = rawLine.substring(parenthesisPosition+1, endPosition);
			let args = argsString.replace(" ", "").split(",");

			for (let i = 0; i < args.length; i++) {
				args[i] = '<span class="function-arg">' + args[i] + "</span>";
			}

			rawLine = rawLine.replace(argsString, args.join(", "));
		}
		if (parenthesisPosition - functionPosition > 9) {
			const functionName = rawLine.substring(functionPosition + 9, parenthesisPosition).replace(" ", "");
			rawLine = rawLine.replace("function", '<span class="function-dec">function</span>')
			rawLine = rawLine.replace(functionName, '<span class="function-name">' + functionName + "</span>");
		}

		return rawLine;
	}

	function processLine(rawLine, lineNumber) {
		if(isComment(rawLine)) {
			rawLine = '<span class="comment">' + rawLine + '</span>';
			rawLine = rawLine.replace("\	", '<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
		}
		else{
			rawLine = rawLine.replace("&gt;", ">");
			rawLine = rawLine.replace("&lt;", "<");
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
			rawLine = rawLine.replace('const ', '<span class="var">const</span> ');
			rawLine = rawLine.replace('let ', '<span class="var">let</span> ');
			rawLine = rawLine.replace('return ', '<span class="return">return</span> ');
			rawLine = rawLine.replace('for (', '<span class="for">for</span> (');
			rawLine = rawLine.replace('for(', '<span class="for">for</span>(');
			rawLine = rawLine.replace('if (', '<span class="if">if</span> (');
			rawLine = rawLine.replace('if(', '<span class="if">if</span>(');
			rawLine = rawLine.replace('else ', '<span class="else">else</span> ');
			rawLine = rawLine.replace('else{', '<span class="else">else</span>{');
			rawLine = rawLine.replace("\	", '<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>');

			if(rawLine.indexOf("\\") > -1) {
				const additionalChar = rawLine[rawLine.indexOf("\\") +1];
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
					const precLetter = rawLine[rawLine.indexOf(string) -1];
					const nextLetter = rawLine[rawLine.indexOf(string) +1];
					if(precLetter.toLowerCase() != precLetter.toUpperCase()) return string;
					if(nextLetter.toLowerCase() != nextLetter.toUpperCase()) return string;
					return '<span class="number">' + string + "</span>"
				})
			}
		}

		return '<div class="code-line"><div class="code--line-number">' + (lineNumber +1) + '</div><div class="code--line-content">' + rawLine + '</div></div>';
	}

	function processParenthesis(rawLine) {
		const parenthesisPosition = rawLine.indexOf("(");
		let endPosition = 0;
		let stopChar = "";

		if(rawLine.substring(parenthesisPosition+1, rawLine.length -1).indexOf("(") > -1 ) {
			rawLine = rawLine.substring(0, parenthesisPosition) + "(" + processParenthesis(rawLine.substring(parenthesisPosition +1, rawLine.length -1));
		};

		for (let i = parenthesisPosition -1; i > 0; i--) {
			if(!/^[A-Z]$/i.test(rawLine[i]) && rawLine[i] != " ") {
				endPosition = i+1;
				stopChar = rawLine[i];
				break;
			}
		}

		const foundWord = rawLine.substring(endPosition, parenthesisPosition);

		return rawLine.replace(stopChar + foundWord + "(", stopChar + '<span class="function">' + foundWord + '</span>(');

	}
};