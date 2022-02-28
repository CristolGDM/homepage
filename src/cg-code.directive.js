import '../css/prism.css';

import html from './cg-code.template.html';
import Prism from './prism';

export function codeDirective() {
	return {
		scope: {
			name: "@"
		},
		transclude: true,
		template: html,
		link: init
	}

	function init(scope, element){
		Prism.highlightAll();
	}
};