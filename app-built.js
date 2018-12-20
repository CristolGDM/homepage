function diapoComponentController(e,t){function n(){o.isLoading=!0,t(function(){e.selectNextImage(),o.isLoading=!1},200)}function a(){o.isLoading=!0,t(function(){e.selectPreviousImage(),o.isLoading=!1},200)}function r(n,a){o.isLoading=!0,t(function(){e.setCurrentImage(n,a),o.isLoading=!1},200)}var o=this;o.imageService=e,o.isLoading=!1,o.selectNextImage=n,o.selectPreviousImage=a,o.setCurrentImage=r}function figureComponentController(e){function t(){e.setCurrentImage(n.src,n.caption),e.showFullScreen()}var n=this;n.maximizePicture=t}function codeDirective(){function e(e){var t='<div class="code-component">';null!=i&&(t+='<div class="code-filename">'+i+"</div>");for(var n=0;n<e.length;n++)t+=r(e[n],n);return t+="</div>"}function t(e){return e=e.replace(" ",""),e=e.replace("	",""),e.indexOf("//")>-1||e.indexOf("/*")>-1||e.indexOf("*/")>-1||"*"===e[0]}function n(t,n){var a=n[0].innerHTML,r=a.split("\n");i=t.name;for(var o=[],s=0;s<r.length;s++)r[s].replace(" ","").replace(/\t/g,"").length>0&&o.push(r[s]);for(var l=o[o.length-1].match(/\t/g).length,c=[],s=0;s<o.length;s++)c.push(o[s].substring(l));var p=e(c);n[0].innerHTML=p}function a(e){for(var t=e.indexOf("function"),n=t+8,a=t+9,r=n;r<e.length;r++)if("("==e[r])n=r;else if(")"==e[r]){a=r;break}if(a-n>1){for(var o=e.substring(n+1,a),i=o.replace(" ","").split(","),r=0;r<i.length;r++)i[r]='<span class="function-arg">'+i[r]+"</span>";e=e.replace(o,i.join(", "))}if(n-t>9){var s=e.substring(t+9,n).replace(" ","");e=e.replace("function",'<span class="function-dec">function</span>'),e=e.replace(s,'<span class="function-name">'+s+"</span>")}return e}function r(e,n){if(t(e))e='<span class="comment">'+e+"</span>",e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>');else{if(e=e.replace("&gt;",">"),e=e.replace("&lt;","<"),e=e.replace(/[-=+*><]/g,function(e){return"<span class='symbol'>"+e+"</span>"}),e=e.replace(/\"(.+?)\"/g,function(e){return'"symbol"'==e?e:'<span class="string">'+e+"</span>"}),e=e.replace(/\'(.+?)\'/g,function(e){return"'symbol'"==e?e:'<span class="string">'+e+"</span>"}),e=e.replace("var ",'<span class="var">var</span> '),e=e.replace("return ",'<span class="return">return</span> '),e=e.replace("for (",'<span class="for">for</span> ('),e=e.replace("for(",'<span class="for">for</span>('),e=e.replace("if (",'<span class="if">if</span> ('),e=e.replace("if(",'<span class="if">if</span>('),e=e.replace("else ",'<span class="else">else</span> '),e=e.replace("else{",'<span class="else">else</span>{'),e=e.replace("	",'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>'),e.indexOf("\\")>-1){var r=e[e.indexOf("\\")+1];e=e.replace("\\"+r,'<span class="escape-char">\\'+r+"</span>")}e.indexOf("function")>-1&&(e=a(e)),e.indexOf("(")>-1&&-1===e.indexOf("function-name")&&(e=o(e)),-1===e.indexOf("function-arg")&&(e=e.replace(/\d+/g,function(t){var n=e[e.indexOf(t)-1],a=e[e.indexOf(t)+1];return n.toLowerCase()!=n.toUpperCase()?t:a.toLowerCase()!=a.toUpperCase()?t:'<span class="number">'+t+"</span>"}))}return'<div class="code-line"><div class="code--line-number">'+(n+1)+'</div><div class="code--line-content">'+e+"</div></div>"}function o(e){var t=e.indexOf("("),n=0,a="";e.substring(t+1,e.length-1).indexOf("(")>-1&&(e=e.substring(0,t)+"("+o(e.substring(t+1,e.length-1)));for(var r=t-1;r>0;r--)if(!/^[A-Z]$/i.test(e[r])&&" "!=e[r]){n=r+1,a=e[r];break}var i=e.substring(n,t);return e.replace(a+i+"(",a+'<span class="function">'+i+"</span>(")}var i="";return{scope:{name:"@"},link:n}}var varData={title:["Cristol GDM","Tokyo based JavaScript/Angular developer with a UX background"],articles:[{title:"Self-loading controllers in AngularJS",blurb:"In this article, we are going to talk about controllers, their parent app, and freedom. Should controllers be able to load themselves? And if so, how?",id:"self-loading-cont"},{title:"Joining the Dark Side of Internet - UX and SEO of an adult website",blurb:"This one is quite special. I was hired to redesign a website, whose main activity is media galleries, and that gets its profit through ads and partnerships. I was given full control of the site’s servers, statistics, and full power to change and modify anything I wanted. This was my first project with so much responsibilities, and it was amazing. It was also for an adult website.",id:"adult-seo"},{title:"Red Sox companion app (prototype)",blurb:"The objective for this project was to create a working high-def prototype for a Fenway companion app. The app would accompany supporters, help them buy food and drinks, and give them incentive to come back for later games.",id:"red-sox"},{title:"iMensana, social-fitness app (prototype)",blurb:"The objective for this project was to create a high-fidelity mockup design of a fitness app intended for tablet supports. The app would try to find a new niche to occupy in the already busy fitness apps market.",id:"imensana"},{title:"Red Cross donor app (prototype)",blurb:"Another project done for a teaching course by Wiklund & Kendler. The assignment was to design a tablet app for Red Cross’ Blood Drives.",id:"red-cross"},{title:"Robohat, an interface to make hats (prototype)",blurb:"This first project comes from a training course by Wiklund & Kendler. The task was to create an interface for an automatic hat-making machine. The user had to be able to design a hat, preview it, and buy it.",id:"robohat"}]};define("data",function(){});var MainController=function(e,t,n,a,r){function o(e){var t=document.getElementById("header-"+e),r=200;u.transitioning=!0,l(document.body,document.body.scrollTop,t.offsetTop,0,1/r,20,c),a(function(){n.go(e)},r+100)}function i(){u.titles.header=d.title;for(var e=0;e<d.articles.length;e++)u.titles[d.articles[e].id]=d.articles[e].title}function s(e){null==e&&(e=400),l(document.body,document.body.scrollTop,document.body.offsetTop,0,1/e,20,c)}function l(e,t,n,a,r,o,i){return 0>a||a>1||0>=r?void(e.scrollTop=n):(e.scrollTop=t-(t-n)*i(a),a+=r*o,void setTimeout(function(){l(e,t,n,a,r,o,i)},o))}function c(e){return e--,e*e*e+1}function p(){return!r.shouldShowFullscreen()}var u=this,d=varData;u.articles=d.articles,u.sideMenuOpened=!1,u.titles={},u.transitioning=!1,u.$onInit=i,u.goToArticle=o,u.scrollBackTop=s,u.shouldShowSideMenu=p,t.onStart({},function(){u.transitioning=!0}),t.onSuccess({},function(){window.scrollTo(0,0),u.sideMenuOpened=!1,a(function(){u.transitioning=!1},50)})};define("MainCtrl",function(){});var ImageServiceProvider=angular.module("ImageServiceProvider",[]).factory("ImageService",["$transitions",function(e){function t(){return c}function n(){return u}function a(){u={},d=!1}function r(){for(var e,t=0;t<c.length;t++)if(c[t].src===u.src){if(t===c.length-1){e=c[0];break}e=c[t+1];break}null!=e&&i(e.src,e.caption)}function o(){for(var e,t=0;t<c.length;t++)if(c[t].src===u.src){if(0===t){e=c[c.length-1];break}e=c[t-1];break}null!=e&&i(e.src,e.caption)}function i(e,t){t=null==t?"":t,u={src:e,caption:t}}function s(){return d}function l(){d=!0}var c=[],p={},u={},d=!1;return e.onSuccess({},function(){for(var e=document.getElementsByTagName("cg-figure"),t=0;t<e.length;t++)c.push({src:e[t].getAttribute("src"),caption:e[t].getAttribute("caption")}),p[e[t].getAttribute("src")]=e[t].getAttribute("caption")}),e.onStart({},function(){a()}),{getAllImages:t,getCurrentImage:n,hideFullScreen:a,selectNextImage:r,selectPreviousImage:o,setCurrentImage:i,shouldShowFullscreen:s,showFullScreen:l}}]);define("ImageService",function(){});var diapoComponent={controller:["ImageService","$timeout",diapoComponentController],controllerAs:"diaporama",bindings:{},templateUrl:"/js/cg-diapo.template.html"};define("cg-diapo.component",function(){});var figureComponent={controller:["ImageService",figureComponentController],controllerAs:"figure",bindings:{src:"@",caption:"@"},templateUrl:"/js/cg-figure.template.html"};define("cg-figure.component",function(){}),define("cg-code.directive",function(){}),require(["data","MainCtrl","ImageService","cg-diapo.component","cg-figure.component","cg-code.directive"]);var requiredServices=["ui.router","ImageServiceProvider"];angular.module("app",requiredServices).controller("MainController",["$scope","$transitions","$state","$timeout","ImageService",MainController]).component("cgDiapo",diapoComponent).component("cgFigure",figureComponent).directive("cgCode",codeDirective).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,n){t.otherwise(function(){return""}),e.state("home",{url:"/",templateUrl:"pages/home.template.html"}).state("resume",{url:"/resume",templateUrl:"pages/resume.template.html"}).state("contact",{url:"/contact",templateUrl:"pages/contact.template.html"}).state("adult-seo",{url:"/dark-side-internet-adult-seo",templateUrl:"articles/adult-seo/template.html"}).state("imensana",{url:"/imensana-social-fitness-app",templateUrl:"articles/imensana/template.html"}).state("red-cross",{url:"/red-cross-donor-app",templateUrl:"articles/red-cross/template.html"}).state("red-sox",{url:"/red-sox-companion-app",templateUrl:"articles/red-sox/template.html"}).state("robohat",{url:"/robohat-an-interface-to-make-hats",templateUrl:"articles/robohat/template.html"}).state("self-loading-cont",{url:"/self-loading-controller-angularjs",templateUrl:"articles/self-loading-cont/template.html"}),n.html5Mode(!0)}]),angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),define("app",function(){});