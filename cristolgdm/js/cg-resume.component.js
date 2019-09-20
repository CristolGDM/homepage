'use strict';

var templateUrlPrefix = "./";

if(location.hostname === "pixel-breath" || location.port === "8080") {
	templateUrlPrefix += "cristolgdm/";
}

var resumeComponent = {
	bindings: {
	},
	templateUrl: templateUrlPrefix + "js/cg-resume.template.html"
}

function resumeController(){
	/************** LOCAL VARIABLES **************/

	/************** SCOPE VARIABLES **************/

	/************** SCOPE FUNCTIONS **************/

	/***************** LISTENERS *****************/

	/********** FUNCTIONS DECLARATIONS ***********/
}