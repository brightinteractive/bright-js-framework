webpackJsonp([0xd2a57dc1d883],{113:function(n,e){"use strict";function o(n,e,o){var t=u.map(function(o){if(o.plugin[n]){var t=o.plugin[n](e,o.options);return t}});return t=t.filter(function(n){return"undefined"!=typeof n}),t.length>0?t:o?[o]:[]}function t(n,e,o){return u.reduce(function(o,t){return t.plugin[n]?o.then(function(){return t.plugin[n](e,t.options)}):o},Promise.resolve())}e.__esModule=!0,e.apiRunner=o,e.apiRunnerAsync=t;var u=[]},289:function(n,e,o){"use strict";var t;e.components={"component---src-templates-module-doc-js":o(442),"component---src-pages-404-js":o(430),"component---src-pages-index-js":o(441),"component---src-pages-docs-app-configuration-js":o(431),"component---src-pages-docs-cli-tool-js":o(432),"component---src-pages-docs-environmental-variables-js":o(433),"component---src-pages-docs-extending-with-plugins-js":o(434),"component---src-pages-docs-fetching-data-js":o(435),"component---src-pages-docs-getting-started-js":o(436),"component---src-pages-docs-interacting-with-the-browser-js":o(437),"component---src-pages-docs-services-and-controllers-js":o(438),"component---src-pages-docs-test-support-js":o(439),"component---src-pages-docs-writing-graphql-apis-js":o(440)},e.json=(t={"layout-index.json":o(18),"modules-index.json":o(456)},t["layout-index.json"]=o(18),t["modules-plugins-auth-auth.json"]=o(457),t["layout-index.json"]=o(18),t["modules-plugins-auth-index.json"]=o(458),t["layout-index.json"]=o(18),t["modules-plugins-browserstorage-index.json"]=o(459),t["layout-index.json"]=o(18),t["modules-plugins-graphql-server-http.json"]=o(461),t["layout-index.json"]=o(18),t["modules-plugins-graphql-server-index.json"]=o(462),t["layout-index.json"]=o(18),t["modules-plugins-graphql-index.json"]=o(460),t["layout-index.json"]=o(18),t["modules-plugins-graphql-test-utils.json"]=o(463),t["layout-index.json"]=o(18),t["modules-test-utils.json"]=o(464),t["layout-index.json"]=o(18),t["404.json"]=o(443),t["layout-index.json"]=o(18),t["index.json"]=o(455),t["layout-index.json"]=o(18),t["404-html.json"]=o(444),t["layout-index.json"]=o(18),t["docs-app-configuration.json"]=o(445),t["layout-index.json"]=o(18),t["docs-cli-tool.json"]=o(446),t["layout-index.json"]=o(18),t["docs-environmental-variables.json"]=o(447),t["layout-index.json"]=o(18),t["docs-extending-with-plugins.json"]=o(448),t["layout-index.json"]=o(18),t["docs-fetching-data.json"]=o(449),t["layout-index.json"]=o(18),t["docs-getting-started.json"]=o(450),t["layout-index.json"]=o(18),t["docs-interacting-with-the-browser.json"]=o(451),t["layout-index.json"]=o(18),t["docs-services-and-controllers.json"]=o(452),t["layout-index.json"]=o(18),t["docs-test-support.json"]=o(453),t["layout-index.json"]=o(18),t["docs-writing-graphql-apis.json"]=o(454),t),e.layouts={"layout---index":o(429)}},290:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}function u(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function r(n,e){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?n:e}function a(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(n,e):n.__proto__=e)}e.__esModule=!0;var s=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(n[t]=o[t])}return n},i=o(1),c=t(i),l=o(2),d=t(l),p=o(176),f=t(p),m=o(89),g=t(m),h=o(113),y=function(n){var e=n.children;return c.default.createElement("div",null,e())},j=function(n){function e(o){u(this,e);var t=r(this,n.call(this)),a=o.location;return f.default.getPage(a.pathname)||(a=s({},a,{pathname:"/404.html"})),t.state={location:a,pageResources:f.default.getResourcesForPathname(a.pathname)},t}return a(e,n),e.prototype.componentWillReceiveProps=function(n){var e=this;if(this.state.location.pathname!==n.location.pathname){var o=f.default.getResourcesForPathname(n.location.pathname);if(o)this.setState({location:n.location,pageResources:o});else{var t=n.location;f.default.getPage(t.pathname)||(t=s({},t,{pathname:"/404.html"})),f.default.getResourcesForPathname(t.pathname,function(n){e.setState({location:t,pageResources:n})})}}},e.prototype.componentDidMount=function(){var n=this;g.default.on("onPostLoadPageResources",function(e){f.default.getPage(n.state.location.pathname)&&e.page.path===f.default.getPage(n.state.location.pathname).path&&n.setState({pageResources:e.pageResources})})},e.prototype.shouldComponentUpdate=function(n,e){return!e.pageResources||(!(this.state.pageResources||!e.pageResources)||(this.state.pageResources.component!==e.pageResources.component||(this.state.pageResources.json!==e.pageResources.json||!(this.state.location.key===e.location.key||!e.pageResources.page||!e.pageResources.page.matchPath&&!e.pageResources.page.path))))},e.prototype.render=function(){var n=(0,h.apiRunner)("replaceComponentRenderer",{props:s({},this.props,{pageResources:this.state.pageResources}),loader:p.publicLoader}),e=n[0];return this.props.page?this.state.pageResources?e||(0,i.createElement)(this.state.pageResources.component,s({key:this.props.location.pathname},this.props,this.state.pageResources.json)):null:this.props.layout?e||(0,i.createElement)(this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:y,s({key:this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:"DefaultLayout"},this.props)):null},e}(c.default.Component);j.propTypes={page:d.default.bool,layout:d.default.bool,location:d.default.object},e.default=j,n.exports=e.default},89:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}var u=o(649),r=t(u),a=(0,r.default)();n.exports=a},291:function(n,e,o){"use strict";var t=o(112),u={};n.exports=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return function(o){var r=decodeURIComponent(o),a=r.slice(e.length);if(a.split("#").length>1&&(a=a.split("#").slice(0,-1).join("")),a.split("?").length>1&&(a=a.split("?").slice(0,-1).join("")),u[a])return u[a];var s=void 0;return n.some(function(n){if(n.matchPath){if((0,t.matchPath)(a,{path:n.path})||(0,t.matchPath)(a,{path:n.matchPath}))return s=n,u[a]=n,!0}else{if((0,t.matchPath)(a,{path:n.path,exact:!0}))return s=n,u[a]=n,!0;if((0,t.matchPath)(a,{path:n.path+"index.html"}))return s=n,u[a]=n,!0}return!1}),s}}},292:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}var u=o(136),r=t(u),a=o(113),s=(0,a.apiRunner)("replaceHistory"),i=s[0],c=i||(0,r.default)();n.exports=c},444:function(n,e,o){o(13),n.exports=function(n){return o.e(0xa2868bfb69fc,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(492)})})}},443:function(n,e,o){o(13),n.exports=function(n){return o.e(0xe70826b53c04,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(493)})})}},445:function(n,e,o){o(13),n.exports=function(n){return o.e(0xb7ae3edfe821,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(494)})})}},446:function(n,e,o){o(13),n.exports=function(n){return o.e(3787929269393,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(495)})})}},447:function(n,e,o){o(13),n.exports=function(n){return o.e(0xd9267863bd40,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(496)})})}},448:function(n,e,o){o(13),n.exports=function(n){return o.e(0xaf78fe560a32,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(497)})})}},449:function(n,e,o){o(13),n.exports=function(n){return o.e(0xbae2868f489a,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(498)})})}},450:function(n,e,o){o(13),n.exports=function(n){return o.e(82999037019505,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(499)})})}},451:function(n,e,o){o(13),n.exports=function(n){return o.e(0xb682f570de68,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(500)})})}},452:function(n,e,o){o(13),n.exports=function(n){return o.e(25147908435385,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(501)})})}},453:function(n,e,o){o(13),n.exports=function(n){return o.e(18236907480527,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(502)})})}},454:function(n,e,o){o(13),n.exports=function(n){return o.e(0x84c057f1e7da,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(503)})})}},455:function(n,e,o){o(13),n.exports=function(n){return o.e(0x81b8806e4260,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(504)})})}},18:function(n,e,o){o(13),n.exports=function(n){return o.e(60335399758886,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(139)})})}},456:function(n,e,o){o(13),n.exports=function(n){return o.e(37692960299797,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(505)})})}},457:function(n,e,o){o(13),n.exports=function(n){return o.e(0xf89fbfa852e0,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(506)})})}},458:function(n,e,o){o(13),n.exports=function(n){return o.e(0xf49d4a360bbd,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(507)})})}},459:function(n,e,o){o(13),n.exports=function(n){return o.e(0xd0131d25195e,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(508)})})}},460:function(n,e,o){o(13),n.exports=function(n){return o.e(0xb6b753138f7c,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(509)})})}},461:function(n,e,o){o(13),n.exports=function(n){return o.e(22811966469449,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(510)})})}},462:function(n,e,o){o(13),n.exports=function(n){return o.e(0xe6ef9f715449,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(511)})})}},463:function(n,e,o){o(13),n.exports=function(n){return o.e(55000651603237,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(512)})})}},464:function(n,e,o){o(13),n.exports=function(n){return o.e(25881880502388,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(513)})})}},429:function(n,e,o){o(13),n.exports=function(n){return o.e(0x67ef26645b2a,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(293)})})}},176:function(n,e,o){(function(n){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}e.__esModule=!0,e.publicLoader=void 0;var u=o(1),r=(t(u),o(291)),a=t(r),s=o(89),i=t(s),c=void 0,l={},d={},p={},f={},m={},g=[],h=[],y={},j=[],x={},v=function(n){return n&&n.default||n},R=void 0,b=!0;R=o(294)({getNextQueuedResources:function(){return j.slice(-1)[0]},createResourceDownload:function(n){w(n,function(){j=j.filter(function(e){return e!==n}),R.onResourcedFinished(n)})}}),i.default.on("onPreLoadPageResources",function(n){R.onPreLoadPageResources(n)}),i.default.on("onPostLoadPageResources",function(n){R.onPostLoadPageResources(n)});var C=function(n,e){return x[n]>x[e]?1:x[n]<x[e]?-1:0},N=function(n,e){return y[n]>y[e]?1:y[n]<y[e]?-1:0},w=function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(f[e])n.nextTick(function(){o(null,f[e])});else{var t=void 0;t="component---"===e.slice(0,12)?d.components[e]:"layout---"===e.slice(0,9)?d.layouts[e]:d.json[e],t(function(n,t){f[e]=t,o(n,t)})}},k=function(e,o){m[e]?n.nextTick(function(){o(null,m[e])}):w(e,function(n,t){if(n)o(n);else{var u=v(t());m[e]=u,o(n,u)}})},P=1,_={empty:function(){h=[],y={},x={},j=[],g=[]},addPagesArray:function(n){g=n;var e="";e="/bright-js-framework",c=(0,a.default)(n,e)},addDevRequires:function(n){l=n},addProdRequires:function(n){d=n},dequeue:function(n){return h.pop()},enqueue:function(n){if(!g.some(function(e){return e.path===n}))return!1;var e=1/P;P+=1,y[n]?y[n]+=1:y[n]=1,_.has(n)||h.unshift(n),h.sort(N);var o=c(n);return o.jsonName&&(x[o.jsonName]?x[o.jsonName]+=1+e:x[o.jsonName]=1+e,j.indexOf(o.jsonName)!==-1||f[o.jsonName]||j.unshift(o.jsonName)),o.componentChunkName&&(x[o.componentChunkName]?x[o.componentChunkName]+=1+e:x[o.componentChunkName]=1+e,j.indexOf(o.componentChunkName)!==-1||f[o.jsonName]||j.unshift(o.componentChunkName)),j.sort(C),R.onNewResourcesAdded(),!0},getResources:function(){return{resourcesArray:j,resourcesCount:x}},getPages:function(){return{pathArray:h,pathCount:y}},getPage:function(n){return c(n)},has:function(n){return h.some(function(e){return e===n})},getResourcesForPathname:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};b&&navigator&&navigator.serviceWorker&&navigator.serviceWorker.controller&&"activated"===navigator.serviceWorker.controller.state&&(c(e)||navigator.serviceWorker.getRegistrations().then(function(n){if(n.length){for(var e=n,o=Array.isArray(e),t=0,e=o?e:e[Symbol.iterator]();;){var u;if(o){if(t>=e.length)break;u=e[t++]}else{if(t=e.next(),t.done)break;u=t.value}var r=u;r.unregister()}window.location.reload()}})),b=!1;var t=c(e);if(!t)return console.log("A page wasn't found for \""+e+'"'),o();if(e=t.path,p[e])return n.nextTick(function(){o(p[e]),i.default.emit("onPostLoadPageResources",{page:t,pageResources:p[e]})}),p[e];i.default.emit("onPreLoadPageResources",{path:e});var u=void 0,r=void 0,a=void 0,s=function(){if(u&&r&&(!t.layoutComponentChunkName||a)){p[e]={component:u,json:r,layout:a,page:t};var n={component:u,json:r,layout:a,page:t};o(n),i.default.emit("onPostLoadPageResources",{page:t,pageResources:n})}};return k(t.componentChunkName,function(n,e){n&&console.log("Loading the component for "+t.path+" failed"),u=e,s()}),k(t.jsonName,function(n,e){n&&console.log("Loading the JSON for "+t.path+" failed"),r=e,s()}),void(t.layoutComponentChunkName&&k(t.layout,function(n,e){n&&console.log("Loading the Layout for "+t.path+" failed"),a=e,s()}))},peek:function(n){return h.slice(-1)[0]},length:function(){return h.length},indexOf:function(n){return h.length-h.indexOf(n)-1}};e.publicLoader={getResourcesForPathname:_.getResourcesForPathname};e.default=_}).call(e,o(106))},514:function(n,e){n.exports=[{componentChunkName:"component---src-templates-module-doc-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"modules-index.json",path:"/modules/index"},{componentChunkName:"component---src-templates-module-doc-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"modules-plugins-auth-auth.json",path:"/modules/plugins-auth-auth"},{componentChunkName:"component---src-templates-module-doc-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"modules-plugins-auth-index.json",path:"/modules/plugins-auth-index"},{componentChunkName:"component---src-templates-module-doc-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"modules-plugins-browserstorage-index.json",path:"/modules/plugins-browserstorage-index"},{componentChunkName:"component---src-templates-module-doc-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"modules-plugins-graphql-server-http.json",path:"/modules/plugins-graphql-server-http"},{componentChunkName:"component---src-templates-module-doc-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"modules-plugins-graphql-server-index.json",path:"/modules/plugins-graphql-server-index"},{componentChunkName:"component---src-templates-module-doc-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"modules-plugins-graphql-index.json",path:"/modules/plugins-graphql-index"},{componentChunkName:"component---src-templates-module-doc-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"modules-plugins-graphql-test-utils.json",path:"/modules/plugins-graphql-test-utils"},{componentChunkName:"component---src-templates-module-doc-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"modules-test-utils.json",path:"/modules/test-utils"},{componentChunkName:"component---src-pages-404-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"404.json",path:"/404/"},{componentChunkName:"component---src-pages-index-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"index.json",path:"/"},{componentChunkName:"component---src-pages-404-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"404-html.json",path:"/404.html"},{componentChunkName:"component---src-pages-docs-app-configuration-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"docs-app-configuration.json",path:"/docs/app-configuration/"},{componentChunkName:"component---src-pages-docs-cli-tool-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"docs-cli-tool.json",path:"/docs/cli-tool/"},{componentChunkName:"component---src-pages-docs-environmental-variables-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"docs-environmental-variables.json",path:"/docs/environmental-variables/"},{componentChunkName:"component---src-pages-docs-extending-with-plugins-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"docs-extending-with-plugins.json",path:"/docs/extending-with-plugins/"},{componentChunkName:"component---src-pages-docs-fetching-data-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"docs-fetching-data.json",path:"/docs/fetching-data/"},{componentChunkName:"component---src-pages-docs-getting-started-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"docs-getting-started.json",path:"/docs/getting-started/"},{componentChunkName:"component---src-pages-docs-interacting-with-the-browser-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"docs-interacting-with-the-browser.json",path:"/docs/interacting-with-the-browser/"},{componentChunkName:"component---src-pages-docs-services-and-controllers-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"docs-services-and-controllers.json",path:"/docs/services-and-controllers/"},{componentChunkName:"component---src-pages-docs-test-support-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"docs-test-support.json",path:"/docs/test-support/"},{componentChunkName:"component---src-pages-docs-writing-graphql-apis-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"docs-writing-graphql-apis.json",path:"/docs/writing-graphql-apis/"}]},294:function(n,e){"use strict";n.exports=function(n){var e=n.getNextQueuedResources,o=n.createResourceDownload,t=[],u=[],r=function(){var n=e();n&&(u.push(n),o(n))},a=function(n){switch(n.type){case"RESOURCE_FINISHED":u=u.filter(function(e){return e!==n.payload});break;case"ON_PRE_LOAD_PAGE_RESOURCES":t.push(n.payload.path);break;case"ON_POST_LOAD_PAGE_RESOURCES":t=t.filter(function(e){return e!==n.payload.page.path});break;case"ON_NEW_RESOURCES_ADDED":}setTimeout(function(){0===u.length&&0===t.length&&r()},0)};return{onResourcedFinished:function(n){a({type:"RESOURCE_FINISHED",payload:n})},onPreLoadPageResources:function(n){a({type:"ON_PRE_LOAD_PAGE_RESOURCES",payload:n})},onPostLoadPageResources:function(n){a({type:"ON_POST_LOAD_PAGE_RESOURCES",payload:n})},onNewResourcesAdded:function(){a({type:"ON_NEW_RESOURCES_ADDED"})},getState:function(){return{pagesLoading:t,resourcesDownloading:u}},empty:function(){t=[],u=[]}}}},0:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}var u=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(n[t]=o[t])}return n},r=o(113),a=o(1),s=t(a),i=o(19),c=t(i),l=o(112),d=o(468),p=o(411),f=t(p),m=o(292),g=t(m),h=o(89),y=t(h),j=o(514),x=t(j),v=o(515),R=t(v),b=o(290),C=t(b),N=o(289),w=t(N),k=o(176),P=t(k);o(401),window.___emitter=y.default,P.default.addPagesArray(x.default),P.default.addProdRequires(w.default),window.asyncRequires=w.default,window.___loader=P.default,window.matchPath=l.matchPath;var _=R.default.reduce(function(n,e){return n[e.fromPath]=e,n},{}),E=function(n){var e=_[n];return null!=e&&(g.default.replace(e.toPath),!0)};E(window.location.pathname),(0,r.apiRunnerAsync)("onClientEntry").then(function(){function n(n){window.___history||(window.___history=n,n.listen(function(n,e){E(n.pathname)||(0,r.apiRunner)("onRouteUpdate",{location:n,action:e})}))}function e(n,e){var o=e.location.pathname,t=(0,r.apiRunner)("shouldUpdateScroll",{prevRouterProps:n,pathname:o});if(t.length>0)return t[0];if(n){var u=n.location.pathname;if(u===o)return!1}return!0}(0,r.apiRunner)("registerServiceWorker").length>0&&o(295);var t=function(n){function e(o){o.page.path===P.default.getPage(n).path&&(y.default.off("onPostLoadPageResources",e),clearTimeout(t),window.___history.push(n))}var o=_[n];if(o&&(n=o.toPath),window.location.pathname!==n){var t=setTimeout(function(){y.default.off("onPostLoadPageResources",e),y.default.emit("onDelayedLoadPageResources",{pathname:n}),window.___history.push(n)},1e3);P.default.getResourcesForPathname(n)?(clearTimeout(t),window.___history.push(n)):y.default.on("onPostLoadPageResources",e)}};window.___navigateTo=t,(0,r.apiRunner)("onRouteUpdate",{location:g.default.location,action:g.default.action});var i=(0,r.apiRunner)("replaceRouterComponent",{history:g.default})[0],p=function(n){var e=n.children;return s.default.createElement(l.Router,{history:g.default},e)},m=(0,l.withRouter)(C.default);P.default.getResourcesForPathname(window.location.pathname,function(){var o=function(){return(0,a.createElement)(i?i:p,null,(0,a.createElement)(d.ScrollContext,{shouldUpdateScroll:e},(0,a.createElement)(m,{layout:!0,children:function(e){return(0,a.createElement)(l.Route,{render:function(o){n(o.history);var t=e?e:o;return P.default.getPage(t.location.pathname)?(0,a.createElement)(C.default,u({page:!0},t)):(0,a.createElement)(C.default,{page:!0,location:{pathname:"/404.html"}})}})}})))},t=(0,r.apiRunner)("wrapRootComponent",{Root:o},o)[0];(0,f.default)(function(){return c.default.render(s.default.createElement(t,null),"undefined"!=typeof window?document.getElementById("___gatsby"):void 0,function(){(0,r.apiRunner)("onInitialClientRender")})})})})},515:function(n,e){n.exports=[]},295:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}var u=o(89),r=t(u),a="/";a="/bright-js-framework/","serviceWorker"in navigator&&navigator.serviceWorker.register(a+"sw.js").then(function(n){n.addEventListener("updatefound",function(){var e=n.installing;console.log("installingWorker",e),e.addEventListener("statechange",function(){switch(e.state){case"installed":navigator.serviceWorker.controller?window.location.reload():(console.log("Content is now available offline!"),r.default.emit("sw:installed"));break;case"redundant":console.error("The installing service worker became redundant.")}})})}).catch(function(n){console.error("Error during service worker registration:",n)})},411:function(n,e,o){!function(e,o){n.exports=o()}("domready",function(){var n,e=[],o=document,t=o.documentElement.doScroll,u="DOMContentLoaded",r=(t?/^loaded|^c/:/^loaded|^i|^c/).test(o.readyState);return r||o.addEventListener(u,n=function(){for(o.removeEventListener(u,n),r=1;n=e.shift();)n()}),function(n){r?setTimeout(n,0):e.push(n)}})},13:function(n,e,o){"use strict";function t(){function n(n){var e=t.lastChild;return"SCRIPT"!==e.tagName?void("undefined"!=typeof console&&console.warn&&console.warn("Script is not a script",e)):void(e.onload=e.onerror=function(){e.onload=e.onerror=null,setTimeout(n,0)})}var e,t=document.querySelector("head"),u=o.e,r=o.s;o.e=function(t,a){var s=!1,i=!0,c=function(n){a&&(a(o,n),a=null)};return!r&&e&&e[t]?void c(!0):(u(t,function(){s||(s=!0,i?setTimeout(function(){c()}):c())}),void(s||(i=!1,n(function(){s||(s=!0,r?r[t]=void 0:(e||(e={}),e[t]=!0),c(!0))}))))}}t()},649:function(n,e){function o(n){return n=n||Object.create(null),{on:function(e,o){(n[e]||(n[e]=[])).push(o)},off:function(e,o){n[e]&&n[e].splice(n[e].indexOf(o)>>>0,1)},emit:function(e,o){(n[e]||[]).map(function(n){n(o)}),(n["*"]||[]).map(function(n){n(e,o)})}}}n.exports=o},430:function(n,e,o){o(13),n.exports=function(n){return o.e(0x9427c64ab85d,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(303)})})}},431:function(n,e,o){o(13),n.exports=function(n){return o.e(0xe73b6e906668,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(304)})})}},432:function(n,e,o){o(13),n.exports=function(n){return o.e(63621202927033,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(305)})})}},433:function(n,e,o){o(13),n.exports=function(n){return o.e(0x655d7c082bb7,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(306)})})}},434:function(n,e,o){o(13),n.exports=function(n){return o.e(77055595419222,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(307)})})}},435:function(n,e,o){o(13),n.exports=function(n){return o.e(57938557541115,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(308)})})}},436:function(n,e,o){o(13),n.exports=function(n){return o.e(84779536864874,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(309)})})}},437:function(n,e,o){o(13),n.exports=function(n){return o.e(0xef1b4ff5aa2e,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(310)})})}},438:function(n,e,o){o(13),n.exports=function(n){return o.e(0x6f52a7cdbf3c,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(311)})})}},439:function(n,e,o){o(13),n.exports=function(n){return o.e(0x6ed22d977de3,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(312)})})}},440:function(n,e,o){o(13),n.exports=function(n){return o.e(0xe343aefa089f,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(313)})})}},441:function(n,e,o){o(13),n.exports=function(n){return o.e(35783957827783,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(314)})})}},442:function(n,e,o){o(13),n.exports=function(n){return o.e(0x6dfb3c549d93,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(315)})})}}});
//# sourceMappingURL=app-d24d8260d624782a0178.js.map