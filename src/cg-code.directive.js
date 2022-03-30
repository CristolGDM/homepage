import '../css/prism.css';

import html from './cg-code.template.html';

export function codeDirective() {
	return {
		scope: {
			name: '@',
			language: '@'
		},
		transclude: true,
		template: html,
		controller: ['$scope', codeController],
		controllerAs: "code",
	}

	function codeController($scope){
		if(!angular.isDefined($scope.language)) {
			$scope.languageClass = "javascript";
		}
		else if(validLanguages.indexOf($scope.language) === -1) {
			$scope.languageClass = "clike";
		}
		else {
			$scope.languageClass = $scope.language
		}
	}
};

const validLanguages = [
  "atom",
  "bash",
  "clike",
  "cs",
  "csharp",
  "css",
  "DFS",
  "dotnet",
  "extend",
  "html",
  "insertBefore",
  "javascript",
  "js",
  "jsx",
  "markup",
  "mathml",
  "plain",
  "plaintext",
  "py",
  "python",
  "regex",
  "rss",
  "shell",
  "ssml",
  "svg",
  "text",
  "ts",
  "tsx",
  "txt",
  "typescript",
  "xml"
];