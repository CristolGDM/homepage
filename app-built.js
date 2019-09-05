function diapoComponentController(e,n){function t(){o.isLoading=!0,n(function(){e.selectNextImage(),o.isLoading=!1},200)}function r(){o.isLoading=!0,n(function(){e.selectPreviousImage(),o.isLoading=!1},200)}function a(t,r){o.isLoading=!0,n(function(){e.setCurrentImage(t,r),o.isLoading=!1},200)}var o=this;o.imageService=e,o.isLoading=!1,o.selectNextImage=t,o.selectPreviousImage=r,o.setCurrentImage=a}function figureComponentController(e){function n(){e.setCurrentImage(t.src,t.caption),e.showFullScreen()}var t=this;t.maximizePicture=n}function headerComponentController(){function e(){for(var e,t=n.id,r=varData.articles,a=0;a<r.length;a++)if(r[a].id===t){e=r[a];break}n.title=e.title,n.date=e.date}var n=this;n.$onInit=e}function codeDirective(){function e(e){var n='<div class="code-component">';null!=i&&(n+='<div class="code-filename">'+i+"</div>");for(var t=0;t<e.length;t++)n+=a(e[t],t);return n+="</div>"}function n(e){return e=e.replace(" ",""),e=e.replace("	",""),e.indexOf("//")>-1||e.indexOf("/*")>-1||e.indexOf("*/")>-1||"*"===e[0]}function t(n,t){var r=t[0].innerHTML,a=r.split("\n");i=n.name;for(var o=[],c=0;c<a.length;c++)a[c].replace(" ","").replace(/\t/g,"").length>0&&o.push(a[c]);for(var s=o[o.length-1].match(/\t/g).length,l=[],c=0;c<o.length;c++)l.push(o[c].substring(s));var u=e(l);t[0].innerHTML=u}function r(e){for(var n=e.indexOf("function"),t=n+8,r=n+9,a=t;a<e.length;a++)if("("==e[a])t=a;else if(")"==e[a]){r=a;break}if(r-t>1){for(var o=e.substring(t+1,r),i=o.replace(" ","").split(","),a=0;a<i.length;a++)i[a]='<span class="function-arg">'+i[a]+"</span>";e=e.replace(o,i.join(", "))}if(t-n>9){var c=e.substring(n+9,t).replace(" ","");e=e.replace("function",'<span class="function-dec">function</span>'),e=e.replace(c,'<span class="function-name">'+c+"</span>")}return e}function a(e,t){if(n(e))e='<span class="comment">'+e+"</span>",e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>');else{if(e=e.replace("&gt;",">"),e=e.replace("&lt;","<"),e=e.replace(/[-=+*><]/g,function(e){return"<span class='symbol'>"+e+"</span>"}),e=e.replace(/\"(.+?)\"/g,function(e){return'"symbol"'==e?e:'<span class="string">'+e+"</span>"}),e=e.replace(/\'(.+?)\'/g,function(e){return"'symbol'"==e?e:'<span class="string">'+e+"</span>"}),e=e.replace("var ",'<span class="var">var</span> '),e=e.replace("return ",'<span class="return">return</span> '),e=e.replace("for (",'<span class="for">for</span> ('),e=e.replace("for(",'<span class="for">for</span>('),e=e.replace("if (",'<span class="if">if</span> ('),e=e.replace("if(",'<span class="if">if</span>('),e=e.replace("else ",'<span class="else">else</span> '),e=e.replace("else{",'<span class="else">else</span>{'),e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>'),e.indexOf("\\")>-1){var a=e[e.indexOf("\\")+1];e=e.replace("\\"+a,'<span class="escape-char">\\'+a+"</span>")}e.indexOf("function")>-1&&(e=r(e)),e.indexOf("(")>-1&&-1===e.indexOf("function-name")&&(e=o(e)),-1===e.indexOf("function-arg")&&(e=e.replace(/\d+/g,function(n){var t=e[e.indexOf(n)-1],r=e[e.indexOf(n)+1];return t.toLowerCase()!=t.toUpperCase()?n:r.toLowerCase()!=r.toUpperCase()?n:'<span class="number">'+n+"</span>"}))}return'<div class="code-line"><div class="code--line-number">'+(t+1)+'</div><div class="code--line-content">'+e+"</div></div>"}function o(e){var n=e.indexOf("("),t=0,r="";e.substring(n+1,e.length-1).indexOf("(")>-1&&(e=e.substring(0,n)+"("+o(e.substring(n+1,e.length-1)));for(var a=n-1;a>0;a--)if(!/^[A-Z]$/i.test(e[a])&&" "!=e[a]){t=a+1,r=e[a];break}var i=e.substring(t,n);return e.replace(r+i+"(",r+'<span class="function">'+i+"</span>(")}var i="";return{scope:{name:"@"},link:t}}var varData={title:["Pixel Breath","8-bit video game design and a sprinkle of tabletop"],articles:[{title:'A web-based conversation "simulator"',blurb:"",id:"game-dat",date:"August 2018"},{title:"Shonen tabletop RPGs",blurb:"",id:"rpg-shonen",date:"November 2016"}]};define("data",function(){});var MainController=function(e,n,t,r,a){function o(e){var n=document.getElementById("header-"+e),r=200;p.transitioning=!0,s(document.body,document.body.scrollTop,n.offsetTop,0,1/r,20,l).then(function(){t.go(e)})}function i(){p.titles.header=f.title}function c(e){null==e&&(e=400),s(document.body,document.body.scrollTop,document.body.offsetTop,0,1/e,20,l)}function s(e,n,t,r,a,o,i){var c=new Promise(function(c,l){return 0>r||r>1||0>=a?(e.scrollTop=t,void c()):(e.scrollTop=n-(n-t)*i(r),r+=a*o,void setTimeout(function(){s(e,n,t,r,a,o,i).then(function(){c()})},o))});return c}function l(e){return e--,e*e*e+1}function u(){return!a.shouldShowFullscreen()}var p=this,f=varData;p.articles=f.articles,p.sideMenuOpened=!1,p.titles={},p.transitioning=!1,p.$onInit=i,p.goToArticle=o,p.scrollBackTop=c,p.shouldShowSideMenu=u,n.onStart({},function(){p.transitioning=!0}),n.onSuccess({},function(){window.scrollTo(0,0),p.sideMenuOpened=!1,r(function(){p.transitioning=!1},50)})};define("MainCtrl",function(){});var ImageServiceProvider=angular.module("ImageServiceProvider",[]).factory("ImageService",["$transitions",function(e){function n(){return l}function t(){return p}function r(){p={},f=!1}function a(){for(var e,n=0;n<l.length;n++)if(l[n].src===p.src){if(n===l.length-1){e=l[0];break}e=l[n+1];break}null!=e&&i(e.src,e.caption)}function o(){for(var e,n=0;n<l.length;n++)if(l[n].src===p.src){if(0===n){e=l[l.length-1];break}e=l[n-1];break}null!=e&&i(e.src,e.caption)}function i(e,n){n=null==n?"":n,p={src:e,caption:n}}function c(){return f}function s(){f=!0}var l=[],u={},p={},f=!1;return e.onSuccess({},function(){for(var e=document.getElementsByTagName("cg-figure"),n=0;n<e.length;n++)l.push({src:e[n].getAttribute("src"),caption:e[n].getAttribute("caption")}),u[e[n].getAttribute("src")]=e[n].getAttribute("caption")}),e.onStart({},function(){r()}),{getAllImages:n,getCurrentImage:t,hideFullScreen:r,selectNextImage:a,selectPreviousImage:o,setCurrentImage:i,shouldShowFullscreen:c,showFullScreen:s}}]);define("ImageService",function(){});var diapoComponent={controller:["ImageService","$timeout",diapoComponentController],controllerAs:"diaporama",bindings:{},templateUrl:"/js/cg-diapo.template.html"};define("cg-diapo.component",function(){});var figureComponent={controller:["ImageService",figureComponentController],controllerAs:"figure",bindings:{src:"@",caption:"@"},templateUrl:"/js/cg-figure.template.html"};define("cg-figure.component",function(){});var headerComponent={controller:headerComponentController,controllerAs:"header",bindings:{id:"@"},templateUrl:"/js/cg-header.template.html"};define("cg-header.component",function(){}),define("cg-code.directive",function(){}),require(["data","MainCtrl","ImageService","cg-diapo.component","cg-figure.component","cg-header.component","cg-code.directive"]);var requiredServices=["ui.router","ImageServiceProvider"];angular.module("app",requiredServices).controller("MainController",["$scope","$transitions","$state","$timeout","ImageService",MainController]).component("cgDiapo",diapoComponent).component("cgFigure",figureComponent).component("cgHeader",headerComponent).directive("cgCode",codeDirective).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,n,t){n.otherwise(function(){return""});var r=!0;e.state("home",{url:"/",cache:!r,templateUrl:"pages/home.template.html"}).state("game-dat",{url:"/game-conversation-simulator",cache:!r,templateUrl:"articles/game-dat/template.html"}).state("rpg-shonen",{url:"/shonen-tabletop-analysis",cache:!r,templateUrl:"articles/rpg-shonen/template.html"}),t.html5Mode(!r)}]),angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),define("app",function(){});