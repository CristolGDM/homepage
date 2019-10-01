function diapoComponentController(e,t){function n(){o.isLoading=!0,t(function(){e.selectNextImage(),o.isLoading=!1},200)}function r(){o.isLoading=!0,t(function(){e.selectPreviousImage(),o.isLoading=!1},200)}function i(n,r){n!==e.getCurrentImage().src&&(o.isLoading=!0,t(function(){e.setCurrentImage(n,r),o.isLoading=!1},200))}var o=this;o.imageService=e,o.isLoading=!1,o.selectNextImage=n,o.selectPreviousImage=r,o.setCurrentImage=i}function figureComponentController(e){function t(){e.setCurrentImage(n.src,n.caption),e.showFullScreen()}var n=this;n.maximizePicture=t}function headerComponentController(){function e(){var e="header";return i?e+="_portrait":r&&(e+="_small"),"articles/"+n.id+"/"+e+".jpg"}function t(){var e,t=n.id,r=varData.articles;if(null!=n.id&&n.id.length>1){for(var i=0;i<r.length;i++)if(r[i].id===t){e=r[i];break}n.title=e.title,n.date=e.date}}var n=this,r="none"!==getComputedStyle(document.getElementById("js-mobile-detection")).display,i=window.innerWidth<500;n.$onInit=t,n.getArticleBackground=e}function codeDirective(){function e(e){var t='<div class="code-component">';null!=a&&(t+='<div class="code-filename">'+a+"</div>");for(var n=0;n<e.length;n++)t+=i(e[n],n);return t+="</div>"}function t(e){return e=e.replace(" ",""),e=e.replace("	",""),e.indexOf("//")>-1||e.indexOf("/*")>-1||e.indexOf("*/")>-1||"*"===e[0]}function n(t,n){var r=n[0].innerHTML,i=r.split("\n");a=t.name;for(var o=[],c=0;c<i.length;c++)i[c].replace(" ","").replace(/\t/g,"").length>0&&o.push(i[c]);for(var l=o[o.length-1].match(/\t/g).length,s=[],c=0;c<o.length;c++)s.push(o[c].substring(l));var d=e(s);n[0].innerHTML=d}function r(e){for(var t=e.indexOf("function"),n=t+8,r=t+9,i=n;i<e.length;i++)if("("==e[i])n=i;else if(")"==e[i]){r=i;break}if(r-n>1){for(var o=e.substring(n+1,r),a=o.replace(" ","").split(","),i=0;i<a.length;i++)a[i]='<span class="function-arg">'+a[i]+"</span>";e=e.replace(o,a.join(", "))}if(n-t>9){var c=e.substring(t+9,n).replace(" ","");e=e.replace("function",'<span class="function-dec">function</span>'),e=e.replace(c,'<span class="function-name">'+c+"</span>")}return e}function i(e,n){if(t(e))e='<span class="comment">'+e+"</span>",e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>');else{if(e=e.replace("&gt;",">"),e=e.replace("&lt;","<"),e=e.replace(/[-=+*><]/g,function(e){return"<span class='symbol'>"+e+"</span>"}),e=e.replace(/\"(.+?)\"/g,function(e){return'"symbol"'==e?e:'<span class="string">'+e+"</span>"}),e=e.replace(/\'(.+?)\'/g,function(e){return"'symbol'"==e?e:'<span class="string">'+e+"</span>"}),e=e.replace("var ",'<span class="var">var</span> '),e=e.replace("return ",'<span class="return">return</span> '),e=e.replace("for (",'<span class="for">for</span> ('),e=e.replace("for(",'<span class="for">for</span>('),e=e.replace("if (",'<span class="if">if</span> ('),e=e.replace("if(",'<span class="if">if</span>('),e=e.replace("else ",'<span class="else">else</span> '),e=e.replace("else{",'<span class="else">else</span>{'),e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>'),e.indexOf("\\")>-1){var i=e[e.indexOf("\\")+1];e=e.replace("\\"+i,'<span class="escape-char">\\'+i+"</span>")}e.indexOf("function")>-1&&(e=r(e)),e.indexOf("(")>-1&&-1===e.indexOf("function-name")&&(e=o(e)),-1===e.indexOf("function-arg")&&(e=e.replace(/\d+/g,function(t){var n=e[e.indexOf(t)-1],r=e[e.indexOf(t)+1];return n.toLowerCase()!=n.toUpperCase()?t:r.toLowerCase()!=r.toUpperCase()?t:'<span class="number">'+t+"</span>"}))}return'<div class="code-line"><div class="code--line-number">'+(n+1)+'</div><div class="code--line-content">'+e+"</div></div>"}function o(e){var t=e.indexOf("("),n=0,r="";e.substring(t+1,e.length-1).indexOf("(")>-1&&(e=e.substring(0,t)+"("+o(e.substring(t+1,e.length-1)));for(var i=t-1;i>0;i--)if(!/^[A-Z]$/i.test(e[i])&&" "!=e[i]){n=i+1,r=e[i];break}var a=e.substring(n,t);return e.replace(r+a+"(",r+'<span class="function">'+a+"</span>(")}var a="";return{scope:{name:"@"},link:n}}var varData={title:["Pixel Breath","8-bit video game design and a sprinkle of tabletop"],articles:[{title:"Why you should do a MVP for your game",id:"wardogs-mvp",date:"August 2019"},{title:'A web-based conversation "simulator"',id:"game-dat",date:"August 2018"},{title:"Is there a good shonen tabletop?",id:"rpg-shonen",date:"November 2016"},{title:"Handling over-planning in Shadowrun",id:"shadowrun-overprep",date:"October 2014"},{title:"Hacking MHR affiliations",id:"mhr-hack-affil",date:"September 2014"}]};define("data",function(){});var MainController=function(e,t,n){function r(e){var t="header";return v?t+="_portrait":h&&(t+="_small"),"articles/"+e+"/"+t+".jpg"}function i(){n.$http.get("https://www.reddit.com/r/ImaginaryWorlds/hot.json?sort=top&t=week").then(function(e){var t=l(e.data.data.children).data;if(m.coolImage=t,!(location.hostname.indexOf("cristolgdm")>-1||"8081"===location.port)){var n=t.title,r="";if(n.toUpperCase().indexOf(" BY ")>-1){var i=n.toUpperCase().indexOf(" BY "),o=n.slice(0,i),a=n.slice(i+4,n.length);r="%c"+o+"%c by %c"+a}else r="%c%c%c"+n;var c="margin-top: 15px;padding-right:150px;padding-left: 150px;padding-top:90px;padding-bottom:90px;background:url("+t.url+") no-repeat;background-size: cover;background-position:50%;";navigator.userAgent.indexOf("Safari")>-1&&-1===navigator.userAgent.indexOf("Chrome")&&(c+="line-height: 225px"),console.log("%c %c\nHeader image is "+r+"%c.\n%cYou can find more at:\n\n%chttps://www.reddit.com"+t.permalink+"\n\n",c,"font-size: 14px; line-height: 25px; padding-top: 05px;","font-size: 14px; line-height: 25px; color: #45D3DD","font-size: 14px; line-height: 25px;","font-size: 14px; line-height: 25px; color: #45D3DD;","font-size: 14px; line-height: 25px;","font-size: 14px; line-height: 25px;","font-size: 12px; line-height: 25px; color: #FF5C92;"),setTimeout(function(){m.shouldHideForms=!0},2e3)}})}function o(){n.$timeout(function(){m.windowHeight=window.innerHeight+"px"},1)}function a(e){var t=document.getElementById("header-"+e),r=200;m.transitioning=!0,m.transitionTarget=e,d(document.body,document.body.scrollTop,t.offsetTop,0,1/r,20,p).then(function(){n.$state.go(e)})}function c(){m.titles.header=f.title,o(),i(),n.$timeout(function(){m.hasFinishedLoading=!0},1e3),document.cookie.indexOf("cgmDarkMode=true")>-1&&(m.darkMode=!0)}function l(e){var t=Math.floor(Math.random()*e.length);return e[t]}function s(e){null==e&&(e=400),d(document.body,document.body.scrollTop,document.body.offsetTop,0,1/e,20,p)}function d(e,t,n,r,i,o,a){var c=new Promise(function(c,l){return 0>r||r>1||0>=i?(e.scrollTop=n,void c()):(e.scrollTop=t-(t-n)*a(r),r+=i*o,void setTimeout(function(){d(e,t,n,r,i,o,a).then(function(){c()})},o))});return c}function p(e){return e--,e*e*e+1}function u(){return!t.shouldShowFullscreen()}function g(){m.darkMode=!m.darkMode,m.sideMenuOpened=!1;var e=new Date;e.setDate(e.getDate()+365),document.cookie="cgmDarkMode="+m.darkMode+"; expires="+e.toUTCString()}var m=this,f=varData,h="none"!==getComputedStyle(document.getElementById("js-mobile-detection")).display,v=window.innerWidth<500;m.articles=f.articles,m.coolImage="",m.coolImageSrc="",m.currentState="",m.darkMode=!1,m.shouldHideForms=!1,m.sideMenuOpened=!1,m.titles={},m.transitioning=!1,m.windowHeight="",m.$onInit=c,m.getArticleBackground=r,m.goToArticle=a,m.scrollBackTop=s,m.shouldShowSideMenu=u,m.switchDarkMode=g,n.$transitions.onStart({},function(){m.transitioning=!0}),n.$transitions.onSuccess({},function(){window.scrollTo(0,0),m.sideMenuOpened=!1,m.currentState=n.$state.current.name,n.$timeout(function(){m.transitioning=!1},50)}),window.addEventListener("resize",o)};define("../cristolgdm/js/MainCtrl",function(){});var ImageServiceProvider=angular.module("ImageServiceProvider",[]).factory("ImageService",["$transitions",function(e){function t(){return s}function n(){return p}function r(){p={},u=!1}function i(){for(var e,t=0;t<s.length;t++)if(s[t].src===p.src){if(t===s.length-1){e=s[0];break}e=s[t+1];break}null!=e&&a(e.src,e.caption)}function o(){for(var e,t=0;t<s.length;t++)if(s[t].src===p.src){if(0===t){e=s[s.length-1];break}e=s[t-1];break}null!=e&&a(e.src,e.caption)}function a(e,t){t=null==t?"":t,p={src:e,caption:t}}function c(){return u}function l(){u=!0}var s=[],d={},p={},u=!1;return e.onSuccess({},function(){var e=document.getElementsByTagName("cg-figure");s=[];for(var t=0;t<e.length;t++)s.push({src:e[t].getAttribute("src"),caption:e[t].getAttribute("caption")}),d[e[t].getAttribute("src")]=e[t].getAttribute("caption")}),e.onStart({},function(){r()}),{getAllImages:t,getCurrentImage:n,hideFullScreen:r,selectNextImage:i,selectPreviousImage:o,setCurrentImage:a,shouldShowFullscreen:c,showFullScreen:l}}]);define("../cristolgdm/js/ImageService",function(){});var UtilServiceProvider=angular.module("UtilServiceProvider",[]).factory("UtilService",["$transitions","$state","$timeout","$http",function(e,t,n,r){return{$transitions:e,$state:t,$timeout:n,$http:r}}]);define("../cristolgdm/js/UtilService",function(){});var templateUrlPrefix="./";(location.hostname.indexOf("pixel-breath")>-1||"8080"===location.port)&&(templateUrlPrefix+="cristolgdm/");var diapoComponent={controller:["ImageService","$timeout",diapoComponentController],controllerAs:"diaporama",bindings:{},templateUrl:templateUrlPrefix+"js/cg-diapo.template.html"};define("../cristolgdm/js/cg-diapo.component",function(){});var templateUrlPrefix="./";(location.hostname.indexOf("pixel-breath")>-1||"8080"===location.port)&&(templateUrlPrefix+="cristolgdm/");var figureComponent={controller:["ImageService",figureComponentController],controllerAs:"figure",bindings:{src:"@",caption:"@"},templateUrl:templateUrlPrefix+"js/cg-figure.template.html"};define("../cristolgdm/js/cg-figure.component",function(){});var templateUrlPrefix="./";(location.hostname.indexOf("pixel-breath")>-1||"8080"===location.port)&&(templateUrlPrefix+="cristolgdm/");var headerComponent={controller:headerComponentController,controllerAs:"header",bindings:{id:"@"},templateUrl:templateUrlPrefix+"js/cg-header.template.html"};define("../cristolgdm/js/cg-header.component",function(){}),define("../cristolgdm/js/cg-code.directive",function(){}),require(["./data","../cristolgdm/js/MainCtrl","../cristolgdm/js/ImageService","../cristolgdm/js/UtilService","../cristolgdm/js/cg-diapo.component","../cristolgdm/js/cg-figure.component","../cristolgdm/js/cg-header.component","../cristolgdm/js/cg-code.directive"]);var requiredServices=["ui.router","ImageServiceProvider","UtilServiceProvider"];angular.module("app",requiredServices).controller("MainController",["$scope","ImageService","UtilService",MainController]).component("cgDiapo",diapoComponent).component("cgFigure",figureComponent).component("cgHeader",headerComponent).directive("cgCode",codeDirective).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,n){t.otherwise(function(){return""});var r="localhost"===location.hostname||"127.0.0.1"===location.hostname||""===location.hostname,i=new Date(Date.now()),o="?v="+(i.getYear()+1900)+"|"+(i.getMonth()+1)+"|"+i.getDate()+"|"+i.getHours(),a="?v="+i.getTime(),c=r?a:o;e.state("home",{url:"/",cache:!r,templateUrl:"pages/home.template.html"+c}).state("about",{url:"/about",cache:!r,templateUrl:"pages/about.template.html"+c}).state("game-dat",{url:"/game-conversation-simulator",cache:!r,templateUrl:"articles/game-dat/template.html"+c}).state("mhr-hack-affil",{url:"/mhr-hacking-affiliations",cache:!r,templateUrl:"articles/mhr-hack-affil/template.html?v="+c}).state("rpg-shonen",{url:"/shonen-tabletop-analysis",cache:!r,templateUrl:"articles/rpg-shonen/template.html"+c}).state("shadowrun-overprep",{url:"/shadowrun-handling-overplanning",cache:!r,templateUrl:"articles/shadowrun-overprep/template.html?v="+c}).state("wardogs-mvp",{url:"/you-should-do-mvp",cache:!r,templateUrl:"articles/wardogs-mvp/template.html"+c}),n.html5Mode(!r)}]),angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),define("app",function(){});