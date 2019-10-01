'use strict';

var templateUrlPrefix = "./";

if(location.hostname.indexOf("pixel-breath") > -1 || location.port === "8080") {
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