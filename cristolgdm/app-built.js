function diapoComponentController(e,t){function n(){r.isLoading=!0,t(function(){e.selectNextImage(),r.isLoading=!1},200)}function a(){r.isLoading=!0,t(function(){e.selectPreviousImage(),r.isLoading=!1},200)}function o(n,a){r.isLoading=!0,t(function(){e.setCurrentImage(n,a),r.isLoading=!1},200)}var r=this;r.imageService=e,r.isLoading=!1,r.selectNextImage=n,r.selectPreviousImage=a,r.setCurrentImage=o}function figureComponentController(e){function t(){e.setCurrentImage(n.src,n.caption),e.showFullScreen()}var n=this;n.maximizePicture=t}function headerComponentController(){function e(){var e,n=t.id,a=varData.articles;if(null!=t.id&&t.id.length>1){for(var o=0;o<a.length;o++)if(a[o].id===n){e=a[o];break}t.title=e.title,t.date=e.date}}var t=this;t.$onInit=e}function codeDirective(){function e(e){var t='<div class="code-component">';null!=i&&(t+='<div class="code-filename">'+i+"</div>");for(var n=0;n<e.length;n++)t+=o(e[n],n);return t+="</div>"}function t(e){return e=e.replace(" ",""),e=e.replace("	",""),e.indexOf("//")>-1||e.indexOf("/*")>-1||e.indexOf("*/")>-1||"*"===e[0]}function n(t,n){var a=n[0].innerHTML,o=a.split("\n");i=t.name;for(var r=[],s=0;s<o.length;s++)o[s].replace(" ","").replace(/\t/g,"").length>0&&r.push(o[s]);for(var l=r[r.length-1].match(/\t/g).length,c=[],s=0;s<r.length;s++)c.push(r[s].substring(l));var p=e(c);n[0].innerHTML=p}function a(e){for(var t=e.indexOf("function"),n=t+8,a=t+9,o=n;o<e.length;o++)if("("==e[o])n=o;else if(")"==e[o]){a=o;break}if(a-n>1){for(var r=e.substring(n+1,a),i=r.replace(" ","").split(","),o=0;o<i.length;o++)i[o]='<span class="function-arg">'+i[o]+"</span>";e=e.replace(r,i.join(", "))}if(n-t>9){var s=e.substring(t+9,n).replace(" ","");e=e.replace("function",'<span class="function-dec">function</span>'),e=e.replace(s,'<span class="function-name">'+s+"</span>")}return e}function o(e,n){if(t(e))e='<span class="comment">'+e+"</span>",e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>');else{if(e=e.replace("&gt;",">"),e=e.replace("&lt;","<"),e=e.replace(/[-=+*><]/g,function(e){return"<span class='symbol'>"+e+"</span>"}),e=e.replace(/\"(.+?)\"/g,function(e){return'"symbol"'==e?e:'<span class="string">'+e+"</span>"}),e=e.replace(/\'(.+?)\'/g,function(e){return"'symbol'"==e?e:'<span class="string">'+e+"</span>"}),e=e.replace("var ",'<span class="var">var</span> '),e=e.replace("return ",'<span class="return">return</span> '),e=e.replace("for (",'<span class="for">for</span> ('),e=e.replace("for(",'<span class="for">for</span>('),e=e.replace("if (",'<span class="if">if</span> ('),e=e.replace("if(",'<span class="if">if</span>('),e=e.replace("else ",'<span class="else">else</span> '),e=e.replace("else{",'<span class="else">else</span>{'),e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>'),e.indexOf("\\")>-1){var o=e[e.indexOf("\\")+1];e=e.replace("\\"+o,'<span class="escape-char">\\'+o+"</span>")}e.indexOf("function")>-1&&(e=a(e)),e.indexOf("(")>-1&&-1===e.indexOf("function-name")&&(e=r(e)),-1===e.indexOf("function-arg")&&(e=e.replace(/\d+/g,function(t){var n=e[e.indexOf(t)-1],a=e[e.indexOf(t)+1];return n.toLowerCase()!=n.toUpperCase()?t:a.toLowerCase()!=a.toUpperCase()?t:'<span class="number">'+t+"</span>"}))}return'<div class="code-line"><div class="code--line-number">'+(n+1)+'</div><div class="code--line-content">'+e+"</div></div>"}function r(e){var t=e.indexOf("("),n=0,a="";e.substring(t+1,e.length-1).indexOf("(")>-1&&(e=e.substring(0,t)+"("+r(e.substring(t+1,e.length-1)));for(var o=t-1;o>0;o--)if(!/^[A-Z]$/i.test(e[o])&&" "!=e[o]){n=o+1,a=e[o];break}var i=e.substring(n,t);return e.replace(a+i+"(",a+'<span class="function">'+i+"</span>(")}var i="";return{scope:{name:"@"},link:n}}var varData={title:["Cristol GDM","Tokyo based JavaScript/Angular developer with a UX background"],articles:[{title:"Self-loading controllers in AngularJS",blurb:"In this article, we are going to talk about controllers, their parent app, and freedom. Should controllers be able to load themselves? And if so, how?",id:"self-loading-cont",date:"March 2017"},{title:"Joining the Dark Side of Internet - UX and SEO of an adult website",blurb:"This one is quite special. I was hired to redesign a website, whose main activity is media galleries, and that gets its profit through ads and partnerships. I was given full control of the site’s servers, statistics, and full power to change and modify anything I wanted. This was my first project with so much responsibilities, and it was amazing. It was also for an adult website.",id:"adult-seo",date:"August 2015"},{title:"Red Sox companion app (prototype)",blurb:"The objective for this project was to create a working high-def prototype for a Fenway companion app. The app would accompany supporters, help them buy food and drinks, and give them incentive to come back for later games.",id:"red-sox",date:"January 2012"},{title:"iMensana, social-fitness app (prototype)",blurb:"The objective for this project was to create a high-fidelity mockup design of a fitness app intended for tablet supports. The app would try to find a new niche to occupy in the already busy fitness apps market.",id:"imensana",date:"December 2011"},{title:"Red Cross donor app (prototype)",blurb:"Another project done for a teaching course by Wiklund & Kendler. The assignment was to design a tablet app for Red Cross’ Blood Drives.",id:"red-cross",date:"November 2011"},{title:"Robohat, an interface to make hats (prototype)",blurb:"This first project comes from a training course by Wiklund & Kendler. The task was to create an interface for an automatic hat-making machine. The user had to be able to design a hat, preview it, and buy it.",id:"robohat",date:"October 2011"}]};define("data",function(){});var MainController=function(e,t,n){function a(){n.$http.get("https://www.reddit.com/r/ImaginaryWorlds/hot.json?sort=top&t=week").then(function(e){var t=s(e.data.data.children).data;if(f.coolImage=t,"cristolgdm"!==location.hostname&&"8081"!==location.port){var n=t.title,a="";if(n.toUpperCase().indexOf(" BY ")>-1){var o=n.toUpperCase().indexOf(" BY "),r=n.slice(0,o),i=n.slice(o+4,n.length);a="%c"+r+"%c by %c"+i}else a="%c%c%c"+n;var l="margin-top: 15px;padding-right:150px;padding-left: 150px;padding-top:90px;padding-bottom:90px;background:url("+t.url+") no-repeat;background-size: cover;background-position:50%;";navigator.userAgent.indexOf("Safari")>-1&&-1===navigator.userAgent.indexOf("Chrome")&&(l+="line-height: 225px"),console.log("%c %c\nHeader image is "+a+"%c.\n%cYou can find more at:\n\n%chttps://www.reddit.com"+t.permalink+"\n\n",l,"font-size: 14px; line-height: 25px; padding-top: 05px;","font-size: 14px; line-height: 25px; color: #45D3DD","font-size: 14px; line-height: 25px;","font-size: 14px; line-height: 25px; color: #45D3DD;","font-size: 14px; line-height: 25px;","font-size: 14px; line-height: 25px;","font-size: 12px; line-height: 25px; color: #FF5C92;"),setTimeout(function(){f.shouldHideForms=!0},2e3)}})}function o(){n.$timeout(function(){f.windowHeight=window.innerHeight+"px"},1)}function r(e){var t=document.getElementById("header-"+e),a=200;f.transitioning=!0,f.transitionTarget=e,c(document.body,document.body.scrollTop,t.offsetTop,0,1/a,20,p).then(function(){n.$state.go(e)})}function i(){f.titles.header=m.title,o(),a(),n.$timeout(function(){f.hasFinishedLoading=!0},1e3),document.cookie.indexOf("cgmDarkMode=true")>-1&&(f.darkMode=!0)}function s(e){var t=Math.floor(Math.random()*e.length);return e[t]}function l(e){null==e&&(e=400),c(document.body,document.body.scrollTop,document.body.offsetTop,0,1/e,20,p)}function c(e,t,n,a,o,r,i){var s=new Promise(function(s,l){return 0>a||a>1||0>=o?(e.scrollTop=n,void s()):(e.scrollTop=t-(t-n)*i(a),a+=o*r,void setTimeout(function(){c(e,t,n,a,o,r,i).then(function(){s()})},r))});return s}function p(e){return e--,e*e*e+1}function d(){return!t.shouldShowFullscreen()}function u(){f.darkMode=!f.darkMode,f.sideMenuOpened=!1;var e=new Date;e.setDate(e.getDate()+365),document.cookie="cgmDarkMode="+f.darkMode+"; expires="+e.toUTCString()}var f=this,m=varData;f.articles=m.articles,f.coolImage="",f.coolImageSrc="",f.currentState="",f.darkMode=!1,f.shouldHideForms=!1,f.sideMenuOpened=!1,f.titles={},f.transitioning=!1,f.windowHeight="",f.$onInit=i,f.goToArticle=r,f.scrollBackTop=l,f.shouldShowSideMenu=d,f.switchDarkMode=u,n.$transitions.onStart({},function(){f.transitioning=!0}),n.$transitions.onSuccess({},function(){window.scrollTo(0,0),f.sideMenuOpened=!1,f.currentState=n.$state.current.name,n.$timeout(function(){f.transitioning=!1},50)}),window.addEventListener("resize",o)};define("MainCtrl",function(){});var ImageServiceProvider=angular.module("ImageServiceProvider",[]).factory("ImageService",["$transitions",function(e){function t(){return c}function n(){return d}function a(){d={},u=!1}function o(){for(var e,t=0;t<c.length;t++)if(c[t].src===d.src){if(t===c.length-1){e=c[0];break}e=c[t+1];break}null!=e&&i(e.src,e.caption)}function r(){for(var e,t=0;t<c.length;t++)if(c[t].src===d.src){if(0===t){e=c[c.length-1];break}e=c[t-1];break}null!=e&&i(e.src,e.caption)}function i(e,t){t=null==t?"":t,d={src:e,caption:t}}function s(){return u}function l(){u=!0}var c=[],p={},d={},u=!1;return e.onSuccess({},function(){for(var e=document.getElementsByTagName("cg-figure"),t=0;t<e.length;t++)c.push({src:e[t].getAttribute("src"),caption:e[t].getAttribute("caption")}),p[e[t].getAttribute("src")]=e[t].getAttribute("caption")}),e.onStart({},function(){a()}),{getAllImages:t,getCurrentImage:n,hideFullScreen:a,selectNextImage:o,selectPreviousImage:r,setCurrentImage:i,shouldShowFullscreen:s,showFullScreen:l}}]);define("ImageService",function(){});var UtilServiceProvider=angular.module("UtilServiceProvider",[]).factory("UtilService",["$transitions","$state","$timeout","$http",function(e,t,n,a){return{$transitions:e,$state:t,$timeout:n,$http:a}}]);define("UtilService",function(){});var templateUrlPrefix="./";("pixel-breath"===location.hostname||"8080"===location.port)&&(templateUrlPrefix+="cristolgdm/");var diapoComponent={controller:["ImageService","$timeout",diapoComponentController],controllerAs:"diaporama",bindings:{},templateUrl:templateUrlPrefix+"js/cg-diapo.template.html"};define("cg-diapo.component",function(){});var templateUrlPrefix="./";("pixel-breath"===location.hostname||"8080"===location.port)&&(templateUrlPrefix+="cristolgdm/");var figureComponent={controller:["ImageService",figureComponentController],controllerAs:"figure",bindings:{src:"@",caption:"@"},templateUrl:templateUrlPrefix+"js/cg-figure.template.html"};define("cg-figure.component",function(){});var templateUrlPrefix="./";("pixel-breath"===location.hostname||"8080"===location.port)&&(templateUrlPrefix+="cristolgdm/");var headerComponent={controller:headerComponentController,controllerAs:"header",bindings:{id:"@"},templateUrl:templateUrlPrefix+"js/cg-header.template.html"};define("cg-header.component",function(){}),define("cg-code.directive",function(){}),require(["data","MainCtrl","ImageService","UtilService","cg-diapo.component","cg-figure.component","cg-header.component","cg-code.directive"]);var requiredServices=["ui.router","ImageServiceProvider","UtilServiceProvider"];angular.module("app",requiredServices).controller("MainController",["$scope","ImageService","UtilService",MainController]).component("cgDiapo",diapoComponent).component("cgFigure",figureComponent).component("cgHeader",headerComponent).directive("cgCode",codeDirective).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,n){t.otherwise(function(){return""});var a="localhost"===location.hostname||"127.0.0.1"===location.hostname||""===location.hostname,o=new Date(Date.now()),r="?v="+(o.getYear()+1900)+"|"+(o.getMonth()+1)+"|"+o.getDate()+"|"+o.getHours(),i="?v="+o.getTime(),s=a?i:r;e.state("home",{url:"/",cache:!a,templateUrl:"pages/home.template.html"+s}).state("resume",{url:"/resume",cache:!a,templateUrl:"pages/resume.template.html"+s}).state("contact",{url:"/contact",cache:!a,templateUrl:"pages/contact.template.html"+s}).state("about",{url:"/about",cache:!a,templateUrl:"pages/about.template.html"+s}).state("game-dat",{url:"/game-conversation-simulator",cache:!a,templateUrl:"articles/game-dat/template.html"+s}).state("adult-seo",{url:"/dark-side-internet-adult-seo",cache:!a,templateUrl:"articles/adult-seo/template.html"+s}).state("imensana",{url:"/imensana-social-fitness-app",cache:!a,templateUrl:"articles/imensana/template.html"+s}).state("red-cross",{url:"/red-cross-donor-app",cache:!a,templateUrl:"articles/red-cross/template.html"+s}).state("red-sox",{url:"/red-sox-companion-app",cache:!a,templateUrl:"articles/red-sox/template.html"+s}).state("robohat",{url:"/robohat-an-interface-to-make-hats",cache:!a,templateUrl:"articles/robohat/template.html"+s}).state("self-loading-cont",{url:"/self-loading-controller-angularjs",cache:!a,templateUrl:"articles/self-loading-cont/template.html"+s}),n.html5Mode(!a)}]),angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),define("app",function(){});