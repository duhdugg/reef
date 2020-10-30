/*! Reef v7.4.2 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/reef */
"use strict";var e=/([:*])(\w+)/g,t=/\*/g,r="([^/]+)",n="(?:.*)",o="(?:/$|$)",i="",a=!!window.history&&!!window.history.pushState,u=function(e){return"/"+function(e){return e.replace(/^(#!)\/?/g,"")}(function(e){return e.replace(/^\/|\/$/g,"")}(e))},c=function(a,c){if(!c||"array"!==Reef._.trueTypeOf(c))return[];if("/"===a){var f=function(e){var t=e.filter((function(e){return"/"===e.url}));if(t.length)return[{route:t[0],params:{}}]}(c);if(f)return f}return c.map((function(c){var f=function(a){var u=[];return{regexp:new RegExp(a.replace(e,(function(e,t,n){return u.push(n),r})).replace(t,n)+o,i),paramNames:u}}(u(c.url)),s=a.replace(/^\/+/,"/").match(f.regexp);if(s)return{route:c,params:function(e,t){return e&&0!==t.length?e.slice(1,e.length).reduce((function(e,r,n){return e[t[n]]=decodeURIComponent(r),e}),{}):{}}(s,f.paramNames)}})).filter((function(e){return e}))},f=function(e,t){t&&(window.location.hash="!"+u(t)+e),console.log(e);var r=document.getElementById(e.slice(1));r&&(r.scrollIntoView(),document.activeElement!==r&&(r.setAttribute("tabindex","-1"),r.focus()))},s=function(e,t,r,n){var o=function(e,t,r){var n=u(e.pathname);return t.length?(t=u(t),0===n.indexOf(t)&&(n=n.slice(t.length)),n):n}(e=function(e,t,r){return(r&&".html"===e.pathname.slice(-5)||0===e.hash.indexOf("#!"))&&(e=m(e.hash.slice(2),t)),e}(e,r,n),r),i=c(o,t);if(i.length){var a=Reef.clone(i[0].route);return a.redirect?s(m("function"==typeof a.redirect?a.redirect(a):a.redirect,r),t,r,n):(a.params=i[0].params,a.search=function(e){var t={},r=e.search.substring(1).split("&");if(r.length<1||r[0].length<1)return t;for(var n=0;n<r.length;n++){var o=r[n].split("=");t[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return t}(e),a)}},h=function(e,t){Reef.emit(window,"beforeRouteUpdated",{current:e,next:t})},l=function(e,t){Reef.emit(window,"routeUpdated",{current:e,previous:t})},d=function(e,t){if(e&&e.title){var r="function"==typeof t.title?t.title(e):t.title;document.title=r.replace("{{title}}",e.title)}},p=function(e,t,r){var n;t._components.forEach((function(e){"render"in e&&e.render()})),d(e,t),r?f(r):(n=document.querySelector("h1, h2, h3, h4, h5, h6"))&&(n.hasAttribute("tabindex")||n.setAttribute("tabindex","-1"),n.focus())},v=function(e,t){var r=s(e,t.routes,t.root,t.hash);if(r.redirect)return v(m("function"==typeof r.redirect?r.redirect(r):r.redirect,t.root),t);if(t.hash){t.hashing=!0;var n=w(e.hash);if(r.url===t.current.url&&n.length)return void f(n,r.url)}var o=t.current;h(o,r),t.current=r;var i=u(e.getAttribute("href"));t.hash?window.location.hash="!"+i:history.pushState(r||{},r&&r.title?r.title:"",i),p(r,t,t.hash?w(e.hash):e.hash),l(r,o)},m=function(e,t){var r=document.createElement("a");return r.href=(t.length?u(t):"")+u(e),r},w=function(e){var t=e.split("#");return t[2]?"#"+t[2]:""},g=function(e,t){if(!(e.metaKey||e.ctrlKey||e.shiftKey||e.defaultPrevented)){var r,n=function(e,t){var r=e.target;if("closest"in r)return r.closest("a");var n=e.path||(e.composedPath?e.composedPath():null);if(n)for(var o=0;o<n.length;o++)if(n[o].nodeName&&"a"===n[o].nodeName.toLowerCase()&&n[o].href)return n[o]}(e);if(!(!n||n.host!==window.location.host||n.hasAttribute("download")||"external"===n.getAttribute("rel")||n.href.indexOf("mailto:")>-1))if((r=n).pathname!==window.location.pathname||r.search!==window.location.search||t.hash||!n.hash.length)e.preventDefault(),v(n,t)}};Reef.Router=function(e){if(!e||!e.routes||"array"!==Reef._.trueTypeOf(e.routes)||!e.routes.length)return Reef._.err("Please provide an array of routes.");var t=this,r=e.routes,n=e.root?e.root:"",o=e.title?e.title:"{{title}}",i=[],u=e.useHash||!a||"file:"===window.location.protocol,c=s(window.location,r,n,u);t._hashing=!1;Object.defineProperties(t,{routes:{value:Reef.clone(r,!0)},root:{value:n},title:{value:o},hash:{value:u}}),Object.defineProperty(t,"current",{get:function(){return Reef.clone(c,!0)},set:function(e){return c=e,!0}}),Object.defineProperty(t,"_routes",{set:function(e){return r=e,!0}}),Object.defineProperty(t,"_components",{get:function(){return i}}),d(c,t),document.addEventListener("click",(function(e){g(e,t)})),u?window.addEventListener("hashchange",(function(e){!function(e,t){if(t.hashing)t.hashing=!1;else{var r=m(window.location.hash.slice(2),t.root),n=(r.getAttribute("href"),s(r,t.routes,t.root,t.hash)),o=t.current;h(o,n),t.current=n,p(n,t),l(n,o)}}(0,t)})):(history.replaceState(c,document.title,window.location.href),window.addEventListener("popstate",(function(e){!function(e,t){if(e.state){var r=t.current;h(r,e.state),t.current=e.state,p(t.current,t),l(e.state,r)}else history.replaceState(t.current,document.title,window.location.href)}(e,t)})))},Reef.Router.prototype.addRoutes=function(e){var t=Reef._.trueTypeOf(e);if(["array","object"].indexOf(t)<0)return Reef._.err("Please provide a valid route or routes.");var r=this.routes;"object"===t?r.push(e):r.concat(e),this._routes=r},Reef.Router.prototype.addComponent=function(e){this._components.push(e)},Reef.Router.prototype.navigate=function(e){v(m(e,this.root),this)},Reef.Router.prototype.updateTitle=function(){d(this.current,this)};
