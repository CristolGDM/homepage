function diapoComponentController(e,t){function n(){o.isLoading=!0,t(function(){e.selectNextImage(),o.isLoading=!1},200)}function a(){o.isLoading=!0,t(function(){e.selectPreviousImage(),o.isLoading=!1},200)}function r(n,a){o.isLoading=!0,t(function(){e.setCurrentImage(n,a),o.isLoading=!1},200)}var o=this;o.imageService=e,o.isLoading=!1,o.selectNextImage=n,o.selectPreviousImage=a,o.setCurrentImage=r}function figureComponentController(e){function t(){e.setCurrentImage(n.src,n.caption),e.showFullScreen()}var n=this;n.maximizePicture=t}function headerComponentController(){function e(){for(var e,n=t.id,a=varData.articles,r=0;r<a.length;r++)if(a[r].id===n){e=a[r];break}t.title=e.title,t.date=e.date}var t=this;t.$onInit=e}function codeDirective(){function e(e){var t='<div class="code-component">';null!=i&&(t+='<div class="code-filename">'+i+"</div>");for(var n=0;n<e.length;n++)t+=r(e[n],n);return t+="</div>"}function t(e){return e=e.replace(" ",""),e=e.replace("	",""),e.indexOf("//")>-1||e.indexOf("/*")>-1||e.indexOf("*/")>-1||"*"===e[0]}function n(t,n){var a=n[0].innerHTML,r=a.split("\n");i=t.name;for(var o=[],s=0;s<r.length;s++)r[s].replace(" ","").replace(/\t/g,"").length>0&&o.push(r[s]);for(var c=o[o.length-1].match(/\t/g).length,l=[],s=0;s<o.length;s++)l.push(o[s].substring(c));var p=e(l);n[0].innerHTML=p}function a(e){for(var t=e.indexOf("function"),n=t+8,a=t+9,r=n;r<e.length;r++)if("("==e[r])n=r;else if(")"==e[r]){a=r;break}if(a-n>1){for(var o=e.substring(n+1,a),i=o.replace(" ","").split(","),r=0;r<i.length;r++)i[r]='<span class="function-arg">'+i[r]+"</span>";e=e.replace(o,i.join(", "))}if(n-t>9){var s=e.substring(t+9,n).replace(" ","");e=e.replace("function",'<span class="function-dec">function</span>'),e=e.replace(s,'<span class="function-name">'+s+"</span>")}return e}function r(e,n){if(t(e))e='<span class="comment">'+e+"</span>",e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>');else{if(e=e.replace("&gt;",">"),e=e.replace("&lt;","<"),e=e.replace(/[-=+*><]/g,function(e){return"<span class='symbol'>"+e+"</span>"}),e=e.replace(/\"(.+?)\"/g,function(e){return'"symbol"'==e?e:'<span class="string">'+e+"</span>"}),e=e.replace(/\'(.+?)\'/g,function(e){return"'symbol'"==e?e:'<span class="string">'+e+"</span>"}),e=e.replace("var ",'<span class="var">var</span> '),e=e.replace("return ",'<span class="return">return</span> '),e=e.replace("for (",'<span class="for">for</span> ('),e=e.replace("for(",'<span class="for">for</span>('),e=e.replace("if (",'<span class="if">if</span> ('),e=e.replace("if(",'<span class="if">if</span>('),e=e.replace("else ",'<span class="else">else</span> '),e=e.replace("else{",'<span class="else">else</span>{'),e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>'),e.indexOf("\\")>-1){var r=e[e.indexOf("\\")+1];e=e.replace("\\"+r,'<span class="escape-char">\\'+r+"</span>")}e.indexOf("function")>-1&&(e=a(e)),e.indexOf("(")>-1&&-1===e.indexOf("function-name")&&(e=o(e)),-1===e.indexOf("function-arg")&&(e=e.replace(/\d+/g,function(t){var n=e[e.indexOf(t)-1],a=e[e.indexOf(t)+1];return n.toLowerCase()!=n.toUpperCase()?t:a.toLowerCase()!=a.toUpperCase()?t:'<span class="number">'+t+"</span>"}))}return'<div class="code-line"><div class="code--line-number">'+(n+1)+'</div><div class="code--line-content">'+e+"</div></div>"}function o(e){var t=e.indexOf("("),n=0,a="";e.substring(t+1,e.length-1).indexOf("(")>-1&&(e=e.substring(0,t)+"("+o(e.substring(t+1,e.length-1)));for(var r=t-1;r>0;r--)if(!/^[A-Z]$/i.test(e[r])&&" "!=e[r]){n=r+1,a=e[r];break}var i=e.substring(n,t);return e.replace(a+i+"(",a+'<span class="function">'+i+"</span>(")}var i="";return{scope:{name:"@"},link:n}}var varData={title:["Cristol GDM","Tokyo based JavaScript/Angular developer with a UX background"],articles:[{title:"Self-loading controllers in AngularJS",blurb:"In this article, we are going to talk about controllers, their parent app, and freedom. Should controllers be able to load themselves? And if so, how?",id:"self-loading-cont",date:"March 2017"},{title:"Joining the Dark Side of Internet - UX and SEO of an adult website",blurb:"This one is quite special. I was hired to redesign a website, whose main activity is media galleries, and that gets its profit through ads and partnerships. I was given full control of the site’s servers, statistics, and full power to change and modify anything I wanted. This was my first project with so much responsibilities, and it was amazing. It was also for an adult website.",id:"adult-seo",date:"August 2015"},{title:"Red Sox companion app (prototype)",blurb:"The objective for this project was to create a working high-def prototype for a Fenway companion app. The app would accompany supporters, help them buy food and drinks, and give them incentive to come back for later games.",id:"red-sox",date:"January 2012"},{title:"iMensana, social-fitness app (prototype)",blurb:"The objective for this project was to create a high-fidelity mockup design of a fitness app intended for tablet supports. The app would try to find a new niche to occupy in the already busy fitness apps market.",id:"imensana",date:"December 2011"},{title:"Red Cross donor app (prototype)",blurb:"Another project done for a teaching course by Wiklund & Kendler. The assignment was to design a tablet app for Red Cross’ Blood Drives.",id:"red-cross",date:"November 2011"},{title:"Robohat, an interface to make hats (prototype)",blurb:"This first project comes from a training course by Wiklund & Kendler. The task was to create an interface for an automatic hat-making machine. The user had to be able to design a hat, preview it, and buy it.",id:"robohat",date:"October 2011"}]};define("data",function(){});var MainController=function(e,t,n,a,r){function o(e){var t=document.getElementById("header-"+e),a=200;u.transitioning=!0,c(document.body,document.body.scrollTop,t.offsetTop,0,1/a,20,l).then(function(){n.go(e)})}function i(){u.titles.header=d.title}function s(e){null==e&&(e=400),c(document.body,document.body.scrollTop,document.body.offsetTop,0,1/e,20,l)}function c(e,t,n,a,r,o,i){var s=new Promise(function(s,l){return 0>a||a>1||0>=r?(e.scrollTop=n,void s()):(e.scrollTop=t-(t-n)*i(a),a+=r*o,void setTimeout(function(){c(e,t,n,a,r,o,i).then(function(){s()})},o))});return s}function l(e){return e--,e*e*e+1}function p(){return!r.shouldShowFullscreen()}var u=this,d=varData;u.articles=d.articles,u.sideMenuOpened=!1,u.titles={},u.transitioning=!1,u.$onInit=i,u.goToArticle=o,u.scrollBackTop=s,u.shouldShowSideMenu=p,t.onStart({},function(){u.transitioning=!0}),t.onSuccess({},function(){window.scrollTo(0,0),u.sideMenuOpened=!1,a(function(){u.transitioning=!1},50)})};define("MainCtrl",function(){});var ImageServiceProvider=angular.module("ImageServiceProvider",[]).factory("ImageService",["$transitions",function(e){function t(){return l}function n(){return u}function a(){u={},d=!1}function r(){for(var e,t=0;t<l.length;t++)if(l[t].src===u.src){if(t===l.length-1){e=l[0];break}e=l[t+1];break}null!=e&&i(e.src,e.caption)}function o(){for(var e,t=0;t<l.length;t++)if(l[t].src===u.src){if(0===t){e=l[l.length-1];break}e=l[t-1];break}null!=e&&i(e.src,e.caption)}function i(e,t){t=null==t?"":t,u={src:e,caption:t}}function s(){return d}function c(){d=!0}var l=[],p={},u={},d=!1;return e.onSuccess({},function(){for(var e=document.getElementsByTagName("cg-figure"),t=0;t<e.length;t++)l.push({src:e[t].getAttribute("src"),caption:e[t].getAttribute("caption")}),p[e[t].getAttribute("src")]=e[t].getAttribute("caption")}),e.onStart({},function(){a()}),{getAllImages:t,getCurrentImage:n,hideFullScreen:a,selectNextImage:r,selectPreviousImage:o,setCurrentImage:i,shouldShowFullscreen:s,showFullScreen:c}}]);define("ImageService",function(){});var diapoComponent={controller:["ImageService","$timeout",diapoComponentController],controllerAs:"diaporama",bindings:{},templateUrl:"/js/cg-diapo.template.html"};define("cg-diapo.component",function(){});var figureComponent={controller:["ImageService",figureComponentController],controllerAs:"figure",bindings:{src:"@",caption:"@"},templateUrl:"/js/cg-figure.template.html"};define("cg-figure.component",function(){});var headerComponent={controller:headerComponentController,controllerAs:"header",bindings:{id:"@"},templateUrl:"/js/cg-header.template.html"};define("cg-header.component",function(){}),define("cg-code.directive",function(){}),require(["data","MainCtrl","ImageService","cg-diapo.component","cg-figure.component","cg-header.component","cg-code.directive"]);var requiredServices=["ui.router","ImageServiceProvider"];angular.module("app",requiredServices).controller("MainController",["$scope","$transitions","$state","$timeout","ImageService",MainController]).component("cgDiapo",diapoComponent).component("cgFigure",figureComponent).component("cgHeader",headerComponent).directive("cgCode",codeDirective).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,n){t.otherwise(function(){return""});var a=!0;e.state("home",{url:"/",cache:!a,templateUrl:"pages/home.template.html"}).state("resume",{url:"/resume",cache:!a,templateUrl:"pages/resume.template.html"}).state("contact",{url:"/contact",cache:!a,templateUrl:"pages/contact.template.html"}).state("about",{url:"/about",cache:!a,templateUrl:"pages/about.template.html"}).state("game-dat",{url:"/game-conversation-simulator",cache:!a,templateUrl:"articles/game-dat/template.html"}).state("adult-seo",{url:"/dark-side-internet-adult-seo",cache:!a,templateUrl:"articles/adult-seo/template.html"}).state("imensana",{url:"/imensana-social-fitness-app",cache:!a,templateUrl:"articles/imensana/template.html"}).state("red-cross",{url:"/red-cross-donor-app",cache:!a,templateUrl:"articles/red-cross/template.html"}).state("red-sox",{url:"/red-sox-companion-app",cache:!a,templateUrl:"articles/red-sox/template.html"}).state("robohat",{url:"/robohat-an-interface-to-make-hats",cache:!a,templateUrl:"articles/robohat/template.html"}).state("self-loading-cont",{url:"/self-loading-controller-angularjs",cache:!a,templateUrl:"articles/self-loading-cont/template.html"}),n.html5Mode(!a)}]),angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),define("app",function(){});