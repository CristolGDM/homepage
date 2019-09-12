function diapoComponentController(e,n){function t(){o.isLoading=!0,n(function(){e.selectNextImage(),o.isLoading=!1},200)}function r(){o.isLoading=!0,n(function(){e.selectPreviousImage(),o.isLoading=!1},200)}function a(t,r){o.isLoading=!0,n(function(){e.setCurrentImage(t,r),o.isLoading=!1},200)}var o=this;o.imageService=e,o.isLoading=!1,o.selectNextImage=t,o.selectPreviousImage=r,o.setCurrentImage=a}function figureComponentController(e){function n(){e.setCurrentImage(t.src,t.caption),e.showFullScreen()}var t=this;t.maximizePicture=n}function headerComponentController(){function e(){for(var e,t=n.id,r=varData.articles,a=0;a<r.length;a++)if(r[a].id===t){e=r[a];break}n.title=e.title,n.date=e.date}var n=this;n.$onInit=e}function codeDirective(){function e(e){var n='<div class="code-component">';null!=i&&(n+='<div class="code-filename">'+i+"</div>");for(var t=0;t<e.length;t++)n+=a(e[t],t);return n+="</div>"}function n(e){return e=e.replace(" ",""),e=e.replace("	",""),e.indexOf("//")>-1||e.indexOf("/*")>-1||e.indexOf("*/")>-1||"*"===e[0]}function t(n,t){var r=t[0].innerHTML,a=r.split("\n");i=n.name;for(var o=[],l=0;l<a.length;l++)a[l].replace(" ","").replace(/\t/g,"").length>0&&o.push(a[l]);for(var s=o[o.length-1].match(/\t/g).length,c=[],l=0;l<o.length;l++)c.push(o[l].substring(s));var p=e(c);t[0].innerHTML=p}function r(e){for(var n=e.indexOf("function"),t=n+8,r=n+9,a=t;a<e.length;a++)if("("==e[a])t=a;else if(")"==e[a]){r=a;break}if(r-t>1){for(var o=e.substring(t+1,r),i=o.replace(" ","").split(","),a=0;a<i.length;a++)i[a]='<span class="function-arg">'+i[a]+"</span>";e=e.replace(o,i.join(", "))}if(t-n>9){var l=e.substring(n+9,t).replace(" ","");e=e.replace("function",'<span class="function-dec">function</span>'),e=e.replace(l,'<span class="function-name">'+l+"</span>")}return e}function a(e,t){if(n(e))e='<span class="comment">'+e+"</span>",e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>');else{if(e=e.replace("&gt;",">"),e=e.replace("&lt;","<"),e=e.replace(/[-=+*><]/g,function(e){return"<span class='symbol'>"+e+"</span>"}),e=e.replace(/\"(.+?)\"/g,function(e){return'"symbol"'==e?e:'<span class="string">'+e+"</span>"}),e=e.replace(/\'(.+?)\'/g,function(e){return"'symbol'"==e?e:'<span class="string">'+e+"</span>"}),e=e.replace("var ",'<span class="var">var</span> '),e=e.replace("return ",'<span class="return">return</span> '),e=e.replace("for (",'<span class="for">for</span> ('),e=e.replace("for(",'<span class="for">for</span>('),e=e.replace("if (",'<span class="if">if</span> ('),e=e.replace("if(",'<span class="if">if</span>('),e=e.replace("else ",'<span class="else">else</span> '),e=e.replace("else{",'<span class="else">else</span>{'),e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>'),e.indexOf("\\")>-1){var a=e[e.indexOf("\\")+1];e=e.replace("\\"+a,'<span class="escape-char">\\'+a+"</span>")}e.indexOf("function")>-1&&(e=r(e)),e.indexOf("(")>-1&&-1===e.indexOf("function-name")&&(e=o(e)),-1===e.indexOf("function-arg")&&(e=e.replace(/\d+/g,function(n){var t=e[e.indexOf(n)-1],r=e[e.indexOf(n)+1];return t.toLowerCase()!=t.toUpperCase()?n:r.toLowerCase()!=r.toUpperCase()?n:'<span class="number">'+n+"</span>"}))}return'<div class="code-line"><div class="code--line-number">'+(t+1)+'</div><div class="code--line-content">'+e+"</div></div>"}function o(e){var n=e.indexOf("("),t=0,r="";e.substring(n+1,e.length-1).indexOf("(")>-1&&(e=e.substring(0,n)+"("+o(e.substring(n+1,e.length-1)));for(var a=n-1;a>0;a--)if(!/^[A-Z]$/i.test(e[a])&&" "!=e[a]){t=a+1,r=e[a];break}var i=e.substring(t,n);return e.replace(r+i+"(",r+'<span class="function">'+i+"</span>(")}var i="";return{scope:{name:"@"},link:t}}var varData={title:["Pixel Breath","8-bit video game design and a sprinkle of tabletop"],articles:[{title:'A web-based conversation "simulator"',id:"game-dat",date:"August 2018"},{title:"Is there a good shonen tabletop?",id:"rpg-shonen",date:"November 2016"},{title:"Handling over-planning in Shadowrun",id:"shadowrun-overprep",date:"October 2014"},{title:"Hacking MHR affiliations",id:"mhr-hack-affil",date:"September 2014"}]};define("data",function(){});var MainController=function(e,n,t,r,a){function o(e){var n=document.getElementById("header-"+e),r=200;u.transitioning=!0,s(document.body,document.body.scrollTop,n.offsetTop,0,1/r,20,c).then(function(){t.go(e)})}function i(){u.titles.header=d.title}function l(e){null==e&&(e=400),s(document.body,document.body.scrollTop,document.body.offsetTop,0,1/e,20,c)}function s(e,n,t,r,a,o,i){var l=new Promise(function(l,c){return 0>r||r>1||0>=a?(e.scrollTop=t,void l()):(e.scrollTop=n-(n-t)*i(r),r+=a*o,void setTimeout(function(){s(e,n,t,r,a,o,i).then(function(){l()})},o))});return l}function c(e){return e--,e*e*e+1}function p(){return!a.shouldShowFullscreen()}var u=this,d=varData;u.articles=d.articles,u.sideMenuOpened=!1,u.titles={},u.transitioning=!1,u.$onInit=i,u.goToArticle=o,u.scrollBackTop=l,u.shouldShowSideMenu=p,n.onStart({},function(){u.transitioning=!0}),n.onSuccess({},function(){window.scrollTo(0,0),u.sideMenuOpened=!1,r(function(){u.transitioning=!1},50)})};define("../cristolgdm/js/MainCtrl",function(){});var ImageServiceProvider=angular.module("ImageServiceProvider",[]).factory("ImageService",["$transitions",function(e){function n(){return c}function t(){return u}function r(){u={},d=!1}function a(){for(var e,n=0;n<c.length;n++)if(c[n].src===u.src){if(n===c.length-1){e=c[0];break}e=c[n+1];break}null!=e&&i(e.src,e.caption)}function o(){for(var e,n=0;n<c.length;n++)if(c[n].src===u.src){if(0===n){e=c[c.length-1];break}e=c[n-1];break}null!=e&&i(e.src,e.caption)}function i(e,n){n=null==n?"":n,u={src:e,caption:n}}function l(){return d}function s(){d=!0}var c=[],p={},u={},d=!1;return e.onSuccess({},function(){for(var e=document.getElementsByTagName("cg-figure"),n=0;n<e.length;n++)c.push({src:e[n].getAttribute("src"),caption:e[n].getAttribute("caption")}),p[e[n].getAttribute("src")]=e[n].getAttribute("caption")}),e.onStart({},function(){r()}),{getAllImages:n,getCurrentImage:t,hideFullScreen:r,selectNextImage:a,selectPreviousImage:o,setCurrentImage:i,shouldShowFullscreen:l,showFullScreen:s}}]);define("../cristolgdm/js/ImageService",function(){});var templateUrlPrefix="./";("pixel-breath"===location.hostname||"8080"===location.port)&&(templateUrlPrefix+="cristolgdm/");var diapoComponent={controller:["ImageService","$timeout",diapoComponentController],controllerAs:"diaporama",bindings:{},templateUrl:templateUrlPrefix+"js/cg-diapo.template.html"};define("../cristolgdm/js/cg-diapo.component",function(){});var templateUrlPrefix="./";("pixel-breath"===location.hostname||"8080"===location.port)&&(templateUrlPrefix+="cristolgdm/");var figureComponent={controller:["ImageService",figureComponentController],controllerAs:"figure",bindings:{src:"@",caption:"@"},templateUrl:templateUrlPrefix+"js/cg-figure.template.html"};define("../cristolgdm/js/cg-figure.component",function(){});var templateUrlPrefix="./";("pixel-breath"===location.hostname||"8080"===location.port)&&(templateUrlPrefix+="cristolgdm/");var headerComponent={controller:headerComponentController,controllerAs:"header",bindings:{id:"@"},templateUrl:templateUrlPrefix+"js/cg-header.template.html"};define("../cristolgdm/js/cg-header.component",function(){}),define("../cristolgdm/js/cg-code.directive",function(){}),require(["./data","../cristolgdm/js/MainCtrl","../cristolgdm/js/ImageService","../cristolgdm/js/cg-diapo.component","../cristolgdm/js/cg-figure.component","../cristolgdm/js/cg-header.component","../cristolgdm/js/cg-code.directive"]);var requiredServices=["ui.router","ImageServiceProvider"];angular.module("app",requiredServices).controller("MainController",["$scope","$transitions","$state","$timeout","ImageService",MainController]).component("cgDiapo",diapoComponent).component("cgFigure",figureComponent).component("cgHeader",headerComponent).directive("cgCode",codeDirective).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,n,t){n.otherwise(function(){return""});var r="localhost"===location.hostname||"127.0.0.1"===location.hostname||""===location.hostname,a=new Date(Date.now()),o="?v="+(a.getYear()+1900)+"|"+(a.getMonth()+1)+"|"+a.getDate()+"|"+a.getHours(),i="?v="+a.getTime(),l=r?i:o;e.state("home",{url:"/",cache:!r,templateUrl:"pages/home.template.html"+l}).state("game-dat",{url:"/game-conversation-simulator",cache:!r,templateUrl:"articles/game-dat/template.html"+l}).state("rpg-shonen",{url:"/shonen-tabletop-analysis",cache:!r,templateUrl:"articles/rpg-shonen/template.html"+l}).state("shadowrun-overprep",{url:"/shadowrun-handling-overplanning",cache:!r,templateUrl:"articles/shadowrun-overprep/template.html?v="+l}).state("mhr-hack-affil",{url:"/mhr-hacking-affiliations",cache:!r,templateUrl:"articles/mhr-hack-affil/template.html?v="+l}),t.html5Mode(!r)}]),angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),define("app",function(){});