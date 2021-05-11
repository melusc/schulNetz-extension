(()=>{"use strict";var __webpack_exports__={};var preact_module_n,l,u,i,t,o,r={},f=[],e=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(n,l){for(var u in l)n[u]=l[u];return n}function s(n){var l=n.parentNode;l&&l.removeChild(n)}function a(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v(n,f,i,t,null)}function v(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++preact_module_n.__v:o};return null!=preact_module_n.vnode&&preact_module_n.vnode(r),r}function h(){return{current:null}}function y(n){return n.children}function p(n,l){this.props=n,this.context=l}function d(n,l){if(null==l)return n.__?d(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?d(n):null}function _(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return _(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!b.__r++||t!==preact_module_n.debounceRendering)&&((t=preact_module_n.debounceRendering)||i)(b)}function b(){for(var n;b.__r=u.length;)n=u.sort((function(n,l){return n.__v.__b-l.__v.__b})),u=[],n.some((function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=c({},t)).__v=t.__v+1,I(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?d(t):o,t.__h),T(u,t),t.__e!=o&&_(t)))}))}function m(n,l,u,i,t,o,e,c,s,a){var h,p,_,k,b,m,w,A=i&&i.__k||f,P=A.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k||"bigint"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(y,{children:k},null,null,null):k.__b>0?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(_=A[h])||_&&k.key==_.key&&k.type===_.type)A[h]=void 0;else for(p=0;p<P;p++){if((_=A[p])&&k.key==_.key&&k.type===_.type){A[p]=void 0;break}_=null}I(n,k,_=_||r,t,o,e,c,s,a),b=k.__e,(p=k.ref)&&_.ref!=p&&(w||(w=[]),_.ref&&w.push(_.ref,null,k),w.push(p,k.__c||b,k)),null!=b?(null==m&&(m=b),"function"==typeof k.type&&null!=k.__k&&k.__k===_.__k?k.__d=s=g(k,s,n):s=x(n,k,_,A,b,s),a||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&_.__e==s&&s.parentNode!=n&&(s=d(_))}for(u.__e=m,h=P;h--;)null!=A[h]&&("function"==typeof u.type&&null!=A[h].__e&&A[h].__e==u.__d&&(u.__d=d(i,h+1)),L(A[h],A[h]));if(w)for(h=0;h<w.length;h++)z(w[h],w[++h],w[++h])}function g(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,l="function"==typeof t.type?g(t,l,u):x(u,t,t,n.__k,t.__e,l));return l}function w(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some((function(n){w(n,l)})):l.push(n)),l}function x(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else{for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o}return void 0!==r?r:t.nextSibling}function A(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C(n,o,l[o],u[o],i)}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||e.test(l)?u:u+"px"}function C(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P(n.style,l,u[l])}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?H:$,o):n.removeEventListener(l,o?H:$,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l))}}function $(l){this.l[l.type+!1](preact_module_n.event?preact_module_n.event(l):l)}function H(l){this.l[l.type+!0](preact_module_n.event?preact_module_n.event(l):l)}function I(l,u,i,t,o,r,f,e,s){var a,v,h,d,_,k,b,g,w,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(s=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=preact_module_n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,w=(a=P.contextType)&&t[a.__c],x=a?w?w.props.value:a.__:t,i.__c?b=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(g,x):(u.__c=v=new p(g,x),v.constructor=P,v.render=M),w&&w.sub(v),v.props=g,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=c({},v.__s)),c(v.__s,P.getDerivedStateFromProps(g,v.__s))),d=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else{if(null==P.getDerivedStateFromProps&&g!==d&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(g,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(g,v.__s,x)||u.__v===i.__v){v.props=g,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach((function(n){n&&(n.__=u)})),v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(g,v.__s,x),null!=v.componentDidUpdate&&v.__h.push((function(){v.componentDidUpdate(d,_,k)}))}v.context=x,v.props=g,v.state=v.__s,(a=preact_module_n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=c(c({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(d,_)),A=null!=a&&a.type===y&&null==a.key?a.props.children:a,m(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,s),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),b&&(v.__E=v.__=null),v.__e=!1}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=j(i.__e,u,i,t,o,r,f,s);(a=preact_module_n.diffed)&&a(u)}catch(l){u.__v=null,(s||null!=r)&&(u.__e=e,u.__h=!!s,r[r.indexOf(e)]=null),preact_module_n.__e(l,u,i)}}function T(l,u){preact_module_n.__c&&preact_module_n.__c(u,l),l.some((function(u){try{l=u.__h,u.__h=[],l.some((function(n){n.call(u)}))}catch(l){preact_module_n.__e(l,u.__v)}}))}function j(n,l,u,i,t,o,e,c){var a,v,h,y,p=u.props,d=l.props,_=l.type,k=0;if("svg"===_&&(t=!0),null!=o)for(;k<o.length;k++)if((a=o[k])&&(a===n||(_?a.localName==_:3==a.nodeType))){n=a,o[k]=null;break}if(null==n){if(null===_)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",_):document.createElement(_,d.is&&d),o=null,c=!1}if(null===_)p===d||c&&n.data===d||(n.data=d);else{if(o=o&&f.slice.call(n.childNodes),v=(p=u.props||r).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""))}if(A(n,d,p,t,c),h)l.__k=[];else if(k=l.props.children,m(n,Array.isArray(k)?k:[k],l,u,i,t&&"foreignObject"!==_,o,e,n.firstChild,c),null!=o)for(k=o.length;k--;)null!=o[k]&&s(o[k]);c||("value"in d&&void 0!==(k=d.value)&&(k!==n.value||"progress"===_&&!k)&&C(n,"value",k,p.value,!1),"checked"in d&&void 0!==(k=d.checked)&&k!==n.checked&&C(n,"checked",k,p.checked,!1))}return n}function z(l,u,i){try{"function"==typeof l?l(u):l.current=u}catch(l){preact_module_n.__e(l,i)}}function L(l,u,i){var t,o,r;if(preact_module_n.unmount&&preact_module_n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||z(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount()}catch(l){preact_module_n.__e(l,u)}t.base=t.__P=null}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L(t[r],u,i);null!=o&&s(o)}function M(n,l,u){return this.constructor(n,u)}function N(l,u,i){var t,o,e;preact_module_n.__&&preact_module_n.__(l,u),o=(t="function"==typeof i)?null:i&&i.__k||u.__k,e=[],I(u,l=(!t&&i||u).__k=a(y,null,[l]),o||r,r,void 0!==u.ownerSVGElement,!t&&i?[i]:o?null:u.firstChild?f.slice.call(u.childNodes):null,e,!t&&i?i:o?o.__e:u.firstChild,t),T(e,l)}function O(n,l){N(n,l,O)}function S(n,l,u){var i,t,o,r=arguments,f=c({},n.props);for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);return null!=u&&(f.children=u),v(n.type,f,i||n.key,t||n.ref,null)}function q(n,l){var u={__c:l="__cC"+o++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}preact_module_n={__e:function(n,l){for(var u,i,t;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return u.__E=u}catch(l){n=l}throw n},__v:0},l=function(n){return null!=n&&void 0===n.constructor},p.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof n&&(n=n(c({},u),this.props)),n&&c(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this))},p.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this))},p.prototype.render=y,u=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,b.__r=0,o=0;function jsxRuntime_module_o(_,o,e,n,t){var f={};for(var l in o)"ref"!=l&&(f[l]=o[l]);var s,u,a={type:_,props:f,key:e,ref:o&&o.ref,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:++preact_module_n.__v,__source:n,__self:t};if("function"==typeof _&&(s=_.defaultProps))for(u in s)void 0===f[u]&&(f[u]=s[u]);return preact_module_n.vnode&&preact_module_n.vnode(a),a}var EMPTY$1={};function preact_router_es_assign(obj,props){for(var i in props){obj[i]=props[i]}return obj}function exec(url,route,opts){var reg=/(?:\?([^#]*))?(#.*)?$/,c=url.match(reg),matches={},ret;if(c&&c[1]){var p=c[1].split("&");for(var i=0;i<p.length;i++){var r=p[i].split("=");matches[decodeURIComponent(r[0])]=decodeURIComponent(r.slice(1).join("="))}}url=segmentize(url.replace(reg,""));route=segmentize(route||"");var max=Math.max(url.length,route.length);for(var i$1=0;i$1<max;i$1++){if(route[i$1]&&route[i$1].charAt(0)===":"){var param=route[i$1].replace(/(^:|[+*?]+$)/g,""),flags=(route[i$1].match(/[+*?]+$/)||EMPTY$1)[0]||"",plus=~flags.indexOf("+"),star=~flags.indexOf("*"),val=url[i$1]||"";if(!val&&!star&&(flags.indexOf("?")<0||plus)){ret=false;break}matches[param]=decodeURIComponent(val);if(plus||star){matches[param]=url.slice(i$1).map(decodeURIComponent).join("/");break}}else if(route[i$1]!==url[i$1]){ret=false;break}}if(opts.default!==true&&ret===false){return false}return matches}function pathRankSort(a,b){return a.rank<b.rank?1:a.rank>b.rank?-1:a.index-b.index}function prepareVNodeForRanking(vnode,index){vnode.index=index;vnode.rank=rankChild(vnode);return vnode.props}function segmentize(url){return url.replace(/(^\/+|\/+$)/g,"").split("/")}function rankSegment(segment){return segment.charAt(0)==":"?1+"*+?".indexOf(segment.charAt(segment.length-1))||4:5}function rank(path){return segmentize(path).map(rankSegment).join("")}function rankChild(vnode){return vnode.props.default?0:rank(vnode.props.path)}var customHistory=null;var ROUTERS=[];var subscribers=[];var EMPTY={};function setUrl(url,type){if(type===void 0)type="push";if(customHistory&&customHistory[type]){customHistory[type](url)}else if(typeof history!=="undefined"&&history[type+"State"]){history[type+"State"](null,null,url)}}function getCurrentUrl(){var url;if(customHistory&&customHistory.location){url=customHistory.location}else if(customHistory&&customHistory.getCurrentLocation){url=customHistory.getCurrentLocation()}else{url=typeof location!=="undefined"?location:EMPTY}return""+(url.pathname||"")+(url.search||"")}function route(url,replace){if(replace===void 0)replace=false;if(typeof url!=="string"&&url.url){replace=url.replace;url=url.url}if(canRoute(url)){setUrl(url,replace?"replace":"push")}return routeTo(url)}function canRoute(url){for(var i=ROUTERS.length;i--;){if(ROUTERS[i].canRoute(url)){return true}}return false}function routeTo(url){var didRoute=false;for(var i=0;i<ROUTERS.length;i++){if(ROUTERS[i].routeTo(url)===true){didRoute=true}}for(var i$1=subscribers.length;i$1--;){subscribers[i$1](url)}return didRoute}function routeFromLink(node){if(!node||!node.getAttribute){return}var href=node.getAttribute("href"),target=node.getAttribute("target");if(!href||!href.match(/^\//g)||target&&!target.match(/^_?self$/i)){return}return route(href)}function handleLinkClick(e){if(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button!==0){return}routeFromLink(e.currentTarget||e.target||this);return prevent(e)}function prevent(e){if(e){if(e.stopImmediatePropagation){e.stopImmediatePropagation()}if(e.stopPropagation){e.stopPropagation()}e.preventDefault()}return false}function delegateLinkHandler(e){if(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button!==0){return}var t=e.target;do{if(String(t.nodeName).toUpperCase()==="A"&&t.getAttribute("href")){if(t.hasAttribute("native")){return}if(routeFromLink(t)){return prevent(e)}}}while(t=t.parentNode)}var eventListenersInitialized=false;function initEventListeners(){if(eventListenersInitialized){return}if(typeof addEventListener==="function"){if(!customHistory){addEventListener("popstate",(function(){routeTo(getCurrentUrl())}))}addEventListener("click",delegateLinkHandler)}eventListenersInitialized=true}var Router=function(Component$$1){function Router(props){Component$$1.call(this,props);if(props.history){customHistory=props.history}this.state={url:props.url||getCurrentUrl()};initEventListeners()}if(Component$$1)Router.__proto__=Component$$1;Router.prototype=Object.create(Component$$1&&Component$$1.prototype);Router.prototype.constructor=Router;Router.prototype.shouldComponentUpdate=function shouldComponentUpdate(props){if(props.static!==true){return true}return props.url!==this.props.url||props.onChange!==this.props.onChange};Router.prototype.canRoute=function canRoute(url){var children=w(this.props.children);return this.getMatchingChildren(children,url,false).length>0};Router.prototype.routeTo=function routeTo(url){this.setState({url});var didRoute=this.canRoute(url);if(!this.updating){this.forceUpdate()}return didRoute};Router.prototype.componentWillMount=function componentWillMount(){ROUTERS.push(this);this.updating=true};Router.prototype.componentDidMount=function componentDidMount(){var this$1=this;if(customHistory){this.unlisten=customHistory.listen((function(location){this$1.routeTo(""+(location.pathname||"")+(location.search||""))}))}this.updating=false};Router.prototype.componentWillUnmount=function componentWillUnmount(){if(typeof this.unlisten==="function"){this.unlisten()}ROUTERS.splice(ROUTERS.indexOf(this),1)};Router.prototype.componentWillUpdate=function componentWillUpdate(){this.updating=true};Router.prototype.componentDidUpdate=function componentDidUpdate(){this.updating=false};Router.prototype.getMatchingChildren=function getMatchingChildren(children,url,invoke){return children.filter(prepareVNodeForRanking).sort(pathRankSort).map((function(vnode){var matches=exec(url,vnode.props.path,vnode.props);if(matches){if(invoke!==false){var newProps={url,matches};preact_router_es_assign(newProps,matches);delete newProps.ref;delete newProps.key;return S(vnode,newProps)}return vnode}})).filter(Boolean)};Router.prototype.render=function render(ref,ref$1){var children=ref.children;var onChange=ref.onChange;var url=ref$1.url;var active=this.getMatchingChildren(w(children),url,true);var current=active[0]||null;var previous=this.previousUrl;if(url!==previous){this.previousUrl=url;if(typeof onChange==="function"){onChange({router:this,url,previous,active,current})}}return current};return Router}(p);var Link=function(props){return a("a",preact_router_es_assign({onClick:handleLinkClick},props))};var Route=function(props){return a(props.component,props)};Router.subscribers=subscribers;Router.getCurrentUrl=getCurrentUrl;Router.route=route;Router.Router=Router;Router.Route=Route;Router.Link=Link;Router.exec=exec;const preact_router_es=null&&Router;const ERRORS={INCORRECT_CREDS:"ERROR_INCORRECT_CREDS"};const login=async({url,username,password})=>{const loginhashRequest=await fetch(`https://www.schul-netz.com/${url}/loginto.php?mode=0&lang=`);if(!loginhashRequest.ok){throw new Error(loginhashRequest.statusText)}const loginHashText=await loginhashRequest.text();const loginhash=(new DOMParser).parseFromString(loginHashText,"text/html").querySelector('input[name="loginhash"]');if(!loginhash){throw new Error("Failed to get loginhash input")}const loginRequestBody=new URLSearchParams({login:username,passwort:password,loginhash:loginhash.value}).toString();const marksPageRequest=await fetch(`https://www.schul-netz.com/${url}/index.php?pageid=21311`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:loginRequestBody});if(!marksPageRequest.ok){throw new Error(marksPageRequest.statusText)}const marksPageURL=new URL(marksPageRequest.url);if(marksPageURL.pathname!==`/${url}/index.php`){throw new Error(ERRORS.INCORRECT_CREDS)}const marksPageText=await marksPageRequest.text();const parsedMarksPage=(new DOMParser).parseFromString(marksPageText,"text/html");const marksTable=[...parsedMarksPage.querySelectorAll("h3")].find((element=>/aktuelle noten/i.test(element.textContent??"")))?.nextElementSibling?.querySelector("table");if(!marksTable){throw new Error("Could not find marks table.")}const logoutURL=parsedMarksPage.querySelector('a[href^="index.php?pageid=9999"]')?.getAttribute?.("href");if(logoutURL){const fullLogoutURL=`https://www.schul-netz.com/${url}/${logoutURL}`;await fetch(fullLogoutURL,{method:"HEAD"})}return[...marksTable.rows].slice(1).filter((element=>element.style.display!=="none"&&Number.isFinite(Number.parseFloat(element.children?.[1]?.textContent?.trim()??"NaN"))))};const script_login=login;let counter=0;const uniqueId=()=>`${counter++}`;const Main=()=>jsxRuntime_module_o(Router,{children:[jsxRuntime_module_o(Default,{path:"/popup.html"},void 0),jsxRuntime_module_o(Default,{path:"/"},void 0),jsxRuntime_module_o(Settings,{path:"/settings"},void 0)]},void 0);class Settings extends p{constructor(){super(...arguments);this.state={};this.render=(_properties,{username,password,ignoring,url,validSaved,errorMsg})=>jsxRuntime_module_o("div",Object.assign({class:"margin"},{children:[jsxRuntime_module_o("div",{children:[jsxRuntime_module_o("button",Object.assign({type:"button",class:"btn",onClick:()=>{route("/")}},{children:"Go back"}),void 0),jsxRuntime_module_o("hr",{},void 0)]},void 0),jsxRuntime_module_o("div",Object.assign({onKeyDown:this.handleKeydownSave},{children:[jsxRuntime_module_o("div",Object.assign({class:"input-wrapper"},{children:[jsxRuntime_module_o("div",{children:"Username:"},void 0),jsxRuntime_module_o("input",{type:"text",placeholder:"Username",onInput:this.handleInput("username"),value:username},void 0)]}),void 0),jsxRuntime_module_o("div",Object.assign({class:"input-wrapper"},{children:[jsxRuntime_module_o("div",{children:"Password:"},void 0),jsxRuntime_module_o("input",{type:"password",placeholder:"Password",onInput:this.handleInput("password"),value:password},void 0)]}),void 0),jsxRuntime_module_o("div",Object.assign({class:"input-wrapper"},{children:[jsxRuntime_module_o("div",{children:"URL to schulNetz page"},void 0),jsxRuntime_module_o("p",{children:jsxRuntime_module_o("small",{children:"ausserschwyz, einsiedeln..."},void 0)},void 0),jsxRuntime_module_o("input",{type:"text",placeholder:"url",onInput:this.handleInput("url"),value:url},void 0)]}),void 0),jsxRuntime_module_o("div",Object.assign({class:"input-wrapper"},{children:[jsxRuntime_module_o("div",{children:"Ignore specific courses"},void 0),jsxRuntime_module_o("p",{children:jsxRuntime_module_o("small",{children:"seperated by commas"},void 0)},void 0),jsxRuntime_module_o("input",{type:"text",placeholder:"sport",onInput:this.handleInput("ignoring"),value:ignoring},void 0)]}),void 0)]}),void 0),errorMsg&&jsxRuntime_module_o("div",{children:typeof errorMsg==="string"?errorMsg:errorMsg.message},void 0),jsxRuntime_module_o("hr",{},void 0),jsxRuntime_module_o("div",Object.assign({class:"input-wrapper"},{children:jsxRuntime_module_o("button",Object.assign({onClick:this.handleSave,class:`btn${typeof validSaved==="boolean"?validSaved?" saved":" failed":""}`,onAnimationEnd:()=>{this.setState({validSaved:undefined})},type:"button"},{children:typeof validSaved==="boolean"?validSaved?"✓":"✗":"Save"}),void 0)}),void 0)]}),void 0);this.handleInput=type=>event_=>{if(event_.target instanceof HTMLInputElement){if(type==="password"){this.setState({[type]:event_.target.value})}else{this.setState({[type]:event_.target.value.trim()})}this.setState({errorMsg:undefined})}};this.handleKeydownSave=event_=>{if(event_.type==="keydown"&&event_.key==="Enter"){this.handleSave()}};this.handleSave=()=>{chrome.storage.local.get(["url","password","username"],(({password:origPassword,username:origUsername,url:origUrl})=>{const{state}=this;if(!state.password||!state.username||!state.url||!state.ignoring){return}const{password}=state;const url=state.url.trim();const username=state.username.trim();const ignoring=state.ignoring.split(",").map((item=>item.trim().toLowerCase())).filter((item=>item));if(password===origPassword&&username===origUsername&&origUrl===url){chrome.storage.local.set({ignoring});this.setState({validSaved:true})}else if(password!==""&&username!==""&&url!==""){script_login({url,username,password}).then((()=>{chrome.storage.local.set({url,password,username,ignoring});this.setState({validSaved:true})})).catch((error=>{this.setState({validSaved:false,errorMsg:error})}))}else{this.setState({validSaved:false,errorMsg:"A required input was empty"})}}))};this.componentDidMount=()=>{chrome.storage.local.get(["url","password","username","ignoring"],(({url,password,username,ignoring=[]})=>{if(typeof url==="string"&&typeof password==="string"&&typeof username==="string"&&Array.isArray(ignoring)){this.setState({url,password,username,ignoring:ignoring.join(", ")})}}))}}}class Default extends p{constructor(){super(...arguments);this.state={loading:true,loggedOut:false,noMarks:false,newVersion:false};this.render=(_properties,{loggedOut,loading,noMarks,newVersion,average,averageFailing,compDub,compDubFailing,failingAmount,failingAmountFailing,vals,failingVals,amountIsPlural,currentlyFailing,errorMsg})=>jsxRuntime_module_o("div",Object.assign({class:"margin"},{children:[jsxRuntime_module_o("div",{children:[jsxRuntime_module_o("button",Object.assign({class:"btn",onClick:()=>{route("/settings")},type:"button"},{children:"Open settings"}),void 0),jsxRuntime_module_o("hr",{},void 0)]},void 0),newVersion&&jsxRuntime_module_o("div",Object.assign({id:"new-version"},{children:jsxRuntime_module_o("a",Object.assign({href:"https://github.com/melusc/schulNetz-extension/releases/latest",rel:"noopener noreferrer"},{children:"New version available"}),void 0)}),void 0),loading&&jsxRuntime_module_o(y,{children:[jsxRuntime_module_o("div",Object.assign({class:"loading-outer"},{children:jsxRuntime_module_o("div",{class:"loading-inner"},void 0)}),void 0),jsxRuntime_module_o("hr",{},void 0)]},void 0),loggedOut&&jsxRuntime_module_o("div",{children:[jsxRuntime_module_o("div",{children:"You are logged out."},void 0),jsxRuntime_module_o("div",{children:["Login ",jsxRuntime_module_o("a",Object.assign({href:"/settings"},{children:"here"}),void 0),"."]},void 0)]},void 0),!loading&&!loggedOut&&!errorMsg&&!noMarks&&jsxRuntime_module_o("div",{children:[jsxRuntime_module_o("h3",Object.assign({class:currentlyFailing?"failing":"passing"},{children:["Summary:",jsxRuntime_module_o("div",{children:currentlyFailing?"Failing":"Passing"},void 0)]}),void 0),jsxRuntime_module_o("hr",{},void 0),jsxRuntime_module_o("h3",Object.assign({class:averageFailing?"failing":"passing"},{children:["Average:",jsxRuntime_module_o("div",{children:average},void 0)]}),void 0),jsxRuntime_module_o("hr",{},void 0),jsxRuntime_module_o("h3",Object.assign({class:compDubFailing?"failing":"passing"},{children:["Compensate double:",jsxRuntime_module_o("div",{children:compDub},void 0)]}),void 0),jsxRuntime_module_o("hr",{},void 0),jsxRuntime_module_o("h3",Object.assign({class:failingAmountFailing?"failing":"passing"},{children:["Failing in ",failingAmount," course",amountIsPlural?"s":""]}),void 0),failingVals&&failingVals.length>0?jsxRuntime_module_o(Table,{vals:failingVals},void 0):jsxRuntime_module_o("hr",{},void 0),Array.isArray(vals)&&jsxRuntime_module_o(y,{children:[jsxRuntime_module_o("h3",{children:"All marks"},void 0),jsxRuntime_module_o("div",{children:["Amount: ",vals.length]},void 0),jsxRuntime_module_o(Table,{vals},void 0)]},void 0)]},void 0),noMarks&&jsxRuntime_module_o(y,{children:[jsxRuntime_module_o("div",{children:"You don't have any marks"},void 0),jsxRuntime_module_o("hr",{},void 0)]},void 0),errorMsg&&jsxRuntime_module_o(y,{children:[jsxRuntime_module_o("div",{children:typeof errorMsg==="string"?errorMsg:errorMsg.message},void 0),jsxRuntime_module_o("hr",{},void 0)]},void 0),jsxRuntime_module_o("small",{children:chrome.runtime.getManifest().version},void 0)]}),void 0);this.componentDidMount=()=>{chrome.storage.local.get(["url","password","username","ignoring"],(({url,password,username,ignoring=[]})=>{if(url&&password&&username){script_login({url,username,password}).then((rows=>{const vals=[];for(const row of rows){const courseName=row.firstElementChild?.lastChild?.textContent?.trim();const stringMark=row.children[1]?.textContent;if(courseName&&stringMark){const mark=roundMark(stringMark);vals.push({courseName,mark,key:uniqueId()})}}const filteredRows=rows.map((currentRow=>({courseName:currentRow.firstElementChild?.lastChild?.textContent?.trim(),mark:roundMark(currentRow?.children?.[1]?.textContent??""),key:uniqueId()}))).filter((({courseName})=>typeof courseName==="string"&&!ignoring.includes(courseName.toLowerCase())));if(filteredRows.length<=0){this.setState({loading:false,noMarks:true});return}let avg=0;for(const{mark}of filteredRows){avg+=mark}avg/=filteredRows.length;const average=avg.toFixed(3);const averageFailing=avg<4;let compDub=0;for(const{mark}of filteredRows){compDub+=(mark-4)*(mark<4?2:1)}const compDubFailing=compDub<0;const failingVals=filteredRows.filter((({mark})=>mark<4));const failingAmount=failingVals.length;const failingAmountFailing=failingAmount>3;const amountIsPlural=failingAmount!==1;const currentlyFailing=averageFailing||compDubFailing||failingAmountFailing;this.setState({average,averageFailing,compDub,compDubFailing,failingAmount,failingAmountFailing,vals:filteredRows,failingVals,amountIsPlural,currentlyFailing,loading:false})})).catch((error=>{if(error.message===ERRORS.INCORRECT_CREDS){this.setState({loggedOut:true,loading:false})}else{this.setState({loading:false,errorMsg:error})}}));void fetch("https://api.github.com/repos/melusc/schulnetz-extension/releases/latest").then((async response=>response.json())).then((responseJSON=>{const newVersion=responseJSON.tag_name;if(typeof newVersion!=="string"){return}const oldVersion=chrome.runtime.getManifest().version;if(newVersion>oldVersion){this.setState({newVersion:true})}}))}else{this.setState({loggedOut:true,loading:false})}}))}}}const Table=({vals})=>Array.isArray(vals)?jsxRuntime_module_o("div",Object.assign({class:"table"},{children:[jsxRuntime_module_o("div",Object.assign({class:"thead"},{children:jsxRuntime_module_o("div",Object.assign({class:"tr"},{children:[jsxRuntime_module_o("div",{children:"Course"},void 0),jsxRuntime_module_o("div",{children:"Mark"},void 0)]}),void 0)}),void 0),jsxRuntime_module_o("div",{children:vals.map((({mark,courseName,key})=>jsxRuntime_module_o("div",Object.assign({class:"tr"},{children:[jsxRuntime_module_o("div",{children:courseName},void 0),jsxRuntime_module_o("div",{children:mark},void 0)]}),key)))},void 0)]}),void 0):null;const roundMark=number=>{const parsedNumber=Number.parseFloat(number);return Math.round(parsedNumber*2)/2};N(jsxRuntime_module_o(Main,{},void 0),document.body)})();