(()=>{"use strict";var e={807:(e,t,o)=>{o.d(t,{Z:()=>i});var r=o(645),n=o.n(r)()((function(e){return e[1]}));n.push([e.id,"@keyframes anim-show{from{height:0}to{height:200px}}@keyframes anim-hide{from{height:200px}to{height:0}}.place-groups{width:200px;cursor:pointer}.place-groups__caption{--caption-arrow-color: #444;padding:10px 15px;border-bottom:solid 1px #aaa;border:solid 2px rgba(0,0,0,0.2);position:relative;font-weight:bold}.place-groups__caption-arrow{position:absolute;right:10px;width:8px;height:8px;border-left:solid 2px var(--caption-arrow-color);border-bottom:solid 2px var(--caption-arrow-color);transition:.25s}.place-groups__caption.open .place-groups__caption-arrow{transform:rotate(45deg);top:14px}.place-groups__caption.closed .place-groups__caption-arrow{transform:rotate(-45deg);top:12px}.place-groups__list{--icon-color: #aaa;background-color:#fff;border:2px solid rgba(0,0,0,0.2);border-top:none}.place-groups__list--wrapper{height:0;overflow-y:auto;max-height:200px}.place-groups__list--wrapper.show{animation:anim-show .25s linear forwards}.place-groups__list--wrapper.hide{animation:anim-hide .25s linear forwards}.place-groups__list-item{padding:10px 15px;transition:.25s;cursor:pointer}.place-groups__list-item:hover{background-color:#eee}.place-groups__list-item:before{content:'';width:10px;height:10px;background-color:var(--icon-color);display:inline-block;margin-right:10px;border-radius:3px}.icon .icon-div{width:100%;height:100%}.icon .icon-div.icon-rounded{border-radius:5px}.icon .icon-div.icon-circle{border-radius:100%}\n",""]);const i=n},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var o=e(t);return t[2]?"@media ".concat(t[2]," {").concat(o,"}"):o})).join("")},t.i=function(e,o,r){"string"==typeof e&&(e=[[null,e,""]]);var n={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(n[a]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);r&&n[l[0]]||(o&&(l[2]?l[2]="".concat(o," and ").concat(l[2]):l[2]=o),t.push(l))}},t}},379:(e,t,o)=>{var r,n=function(){var e={};return function(t){if(void 0===e[t]){var o=document.querySelector(t);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(e){o=null}e[t]=o}return e[t]}}(),i=[];function a(e){for(var t=-1,o=0;o<i.length;o++)if(i[o].identifier===e){t=o;break}return t}function c(e,t){for(var o={},r=[],n=0;n<e.length;n++){var c=e[n],l=t.base?c[0]+t.base:c[0],s=o[l]||0,u="".concat(l," ").concat(s);o[l]=s+1;var p=a(u),d={css:c[1],media:c[2],sourceMap:c[3]};-1!==p?(i[p].references++,i[p].updater(d)):i.push({identifier:u,updater:g(d,t),references:1}),r.push(u)}return r}function l(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var i=o.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var a=n(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var s,u=(s=[],function(e,t){return s[e]=t,s.filter(Boolean).join("\n")});function p(e,t,o,r){var n=o?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=u(t,n);else{var i=document.createTextNode(n),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function d(e,t,o){var r=o.css,n=o.media,i=o.sourceMap;if(n?e.setAttribute("media",n):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var f=null,v=0;function g(e,t){var o,r,n;if(t.singleton){var i=v++;o=f||(f=l(t)),r=p.bind(null,o,i,!1),n=p.bind(null,o,i,!0)}else o=l(t),r=d.bind(null,o,t),n=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(o)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else n()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var o=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<o.length;r++){var n=a(o[r]);i[n].references--}for(var l=c(e,t),s=0;s<o.length;s++){var u=a(o[s]);0===i[u].references&&(i[u].updater(),i.splice(u,1))}o=l}}}}},t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={id:r,exports:{}};return e[r](n,n.exports,o),n.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,o){return(t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,o)}function r(t,o){return!o||"object"!==e(o)&&"function"!=typeof o?n(t):o}function n(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function c(e,t,o){var r=t.get(e);if(!r)throw new TypeError("attempted to set private field on non-instance");if(r.set)r.set.call(e,o);else{if(!r.writable)throw new TypeError("attempted to set read only private field");r.value=o}return o}function l(e,t){var o=t.get(e);if(!o)throw new TypeError("attempted to get private field on non-instance");return o.get?o.get.call(e):o.value}var s=o(379),u=o.n(s),p=o(807);u()(p.Z,{insert:"head",singleton:!1}),p.Z.locals,"undefined"!=typeof L&&function(e){var o=[30,30],s=new WeakMap,u=new WeakMap,p=new WeakMap,d=new WeakMap,f=new WeakMap,v=new WeakMap,g=new WeakMap,m=new WeakMap,h=new WeakMap,b=new WeakMap,w=new WeakMap,y=function(y){!function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(o&&o.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),o&&t(e,o)}(k,y);var x,_,S=(x=k,_=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=i(x);if(_){var o=i(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return r(this,e)});function k(t){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,k),a(n(r=S.call(this,t)),"groupsStates",{}),a(n(r),"groupsThemes",{}),a(n(r),"groupsRefs",{}),s.set(n(r),{writable:!0,value:void 0}),u.set(n(r),{writable:!0,value:!1}),p.set(n(r),{writable:!0,value:void 0}),d.set(n(r),{writable:!0,value:void 0}),f.set(n(r),{writable:!0,value:void 0}),v.set(n(r),{writable:!0,value:void 0}),a(n(r),"onAdd",(function(){return c(n(r),p,e.DomUtil.create("div","place-groups")),c(n(r),d,e.DomUtil.create("div","place-groups__caption",l(n(r),p))),c(n(r),f,e.DomUtil.create("div","place-groups__list--wrapper",l(n(r),p))),c(n(r),v,e.DomUtil.create("div","place-groups__list",l(n(r),f))),l(n(r),m).call(n(r)),e.DomUtil.disableTextSelection(),e.DomEvent.disableClickPropagation(l(n(r),p)),e.DomEvent.disableScrollPropagation(l(n(r),p)),e.DomEvent.on(l(n(r),d),"click",r.toggleList),e.DomEvent.on(l(n(r),v),"click",r.toggleListItem),l(n(r),p)})),a(n(r),"onRemove",(function(){e.DomEvent.off(l(n(r),d),"click",r.toggleList),e.DomEvent.off(l(n(r),v),"click",r.toggleListItem)})),a(n(r),"addGroup",(function(t,o){var i=o.color,a=o.map,c=e.featureGroup().addTo(a);Object.defineProperty(c,"linkedMap",{value:a}),r.groupsStates[t]=!0,r.groupsThemes[t]=i,r.groupsRefs[t]=c;var s=e.DomUtil.create("div","place-groups__list-item",l(n(r),v));return s.textContent=t,s.style.setProperty("--icon-color",i),s.dataset.groupName=t,c})),a(n(r),"addPoint",(function(t,o){var i=r.groupsThemes[t],a=l(n(r),b).call(n(r)),c=l(n(r),w).call(n(r)),u="background-color:".concat(i,"; box-shadow:").concat(a),p=e.divIcon({iconSize:l(n(r),s).iconSize,className:"icon",html:'<div class="'.concat(c,'" style="').concat(u,'"></div>')}),d=e.marker(o,{icon:p});return l(n(r),h).call(n(r),d,{groupName:t}),d.addTo(r.groupsRefs[t]),d})),a(n(r),"addPoints",(function(e,t){return t.map((function(t){return r.addPoint(e,t)}))})),a(n(r),"toggleList",(function(){c(n(r),u,!l(n(r),u)),l(n(r),u)?(e.DomUtil.addClass(l(n(r),f),"show"),e.DomUtil.removeClass(l(n(r),f),"hide"),e.DomUtil.addClass(l(n(r),d),"open"),e.DomUtil.removeClass(l(n(r),d),"closed")):(e.DomUtil.addClass(l(n(r),f),"hide"),e.DomUtil.removeClass(l(n(r),f),"show"),e.DomUtil.addClass(l(n(r),d),"closed"),e.DomUtil.removeClass(l(n(r),d),"open"))})),a(n(r),"toggleListItem",(function(e){var t=e.target,o=t.dataset.groupName;r.groupsStates[o]?(r.groupsStates[o]=!1,t.style.opacity=.25,r.groupsRefs[o].remove()):(r.groupsStates[o]=!0,t.style.opacity=1,r.groupsRefs[o].addTo(r.groupsRefs[o].linkedMap))})),g.set(n(r),{writable:!0,value:function(e){c(n(r),s,e),e.iconSize&&Array.isArray(e.iconSize)?l(n(r),s).iconSize=e.iconSize:l(n(r),s).iconSize=o}}),m.set(n(r),{writable:!0,value:function(){l(n(r),d).textContent=l(n(r),s).caption||"Groups",l(n(r),d).classList.add("closed"),l(n(r),d).style.color=l(n(r),s).captionColor||"#333",l(n(r),d).style.background=l(n(r),s).captionBackground||"rgba(255, 255, 255, .75)",e.DomUtil.create("div","place-groups__caption-arrow",l(n(r),d)),l(n(r),s).captionArrowColor&&l(n(r),d).style.setProperty("--caption-arrow-color",l(n(r),s).captionArrowColor)}}),h.set(n(r),{writable:!0,value:function(e,t){var o=t.groupName,i=n(r);Object.defineProperty(e,"removeFromGroup",{value:function(){this.removeFrom(i.groupsRefs[o])}})}}),b.set(n(r),{writable:!0,value:function(){var e="";return l(n(r),s).iconShadow||l(n(r),s).iconInnerShadow?(l(n(r),s).iconShadow&&(e+="#000 1px 1px 10px"),l(n(r),s).iconInnerShadow&&(l(n(r),s).iconShadow&&(e+=", "),e+="inset rgba(0, 0, 0, .5) 1px 1px 10px")):e="none",e}}),w.set(n(r),{writable:!0,value:function(){var e="icon-div";return l(n(r),s).iconStyle&&("rounded"==l(n(r),s).iconStyle?e+=" icon-rounded":"circle"==l(n(r),s).iconStyle&&(e+=" icon-circle")),e}}),l(n(r),g).call(n(r),t),r}return k}(e.Control);e.control.placeGroupsPicker=function(e){return new y(e)}}(L)})()})();