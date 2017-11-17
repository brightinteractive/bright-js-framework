webpackJsonp([0xef1b4ff5aa2e],{'./node_modules/babel-loader/lib/index.js?{"plugins":["/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/babel-plugin-add-module-exports/lib/index.js","/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"presets":[["/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/babel-preset-env/lib/index.js",{"loose":true,"uglify":true,"modules":"commonjs","targets":{"browsers":["> 1%","last 2 versions","IE >= 9"]},"exclude":["transform-regenerator","transform-es2015-typeof-symbol"]}],"/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/babel-preset-stage-0/lib/index.js","/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./src/pages/docs/interacting-with-the-browser.js':function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}t.__esModule=!0;var i=n("./node_modules/react/react.js"),s=r(i),a=n("./node_modules/gatsby-link/index.js"),l=(o(a),n("./src/components/Section.js")),c=n("./src/components/Headers.js"),m=n("./src/components/CodeBlock.js");t.default=function(){return s.createElement("div",null,s.createElement(c.PageHeader,null,"Interacting with the Browser"),s.createElement(l.Section,{title:"Introduction"},s.createElement("p",null,"Components of your application are likely to need to interact with Browser APIs. Performing page transitions, reading and writing to cookies, opening and closing windows and getting information about the current location all require interaction with the DOM. React abstracts over some, but not all, of these APIs."),s.createElement("p",null,"This is a problem when we want to render controller components on the server or test them in a nodejs environment. If a controller needs to read and write to cookies, this requires it to interact with the DOM in the browser, or to interact with the http request and response on the server. In test environments, we would want an in-memory cookie store that the test can easily manipulate and check."),s.createElement("p",null,"To solve this problem, Bright-js-framework provides an abstraction around these APIs that handles different environments for you.")),s.createElement(l.Section,{title:"Getting page-level information"},s.createElement("p",null,"Bright-js-framework includes a number of state selectors that return information about browser state. You can use them like any other state selector."),s.createElement(m.CodeFile,{path:"src/pages/LocationDisplay.tsx"},n("./node_modules/raw-loader/index.js!../examples/interacting-with-the-browser/src/components/LocationDisplay.tsx")),s.createElement("p",null,"Check the API reference for a full list of page selectors and information about the data they return.")),s.createElement(l.Section,{title:"Performing page-level actions"},s.createElement("p",null,"In addition to getting information about page state, we might want to perform actions in a cross-environment way. Bright-js-framework provides a number of action services for this purpose."),s.createElement("p",null,"The ",s.createElement("code",null,"BrowserActions")," service provides a collection of methods to change the browser state and perform other actions that are outside the scope of React itself. In this example, we use it to programmatically navigate to another location:"),s.createElement(m.CodeFile,{path:"src/components/LocationChange.tsx"},n("./node_modules/raw-loader/index.js!../examples/interacting-with-the-browser/src/components/LocationChange.tsx")),s.createElement("p",null,"Check the API documentation of BrowserActions for more examples.")))},e.exports=t.default},"./node_modules/raw-loader/index.js!../examples/interacting-with-the-browser/src/components/LocationChange.tsx":function(e,t){e.exports="import * as React from 'react'\nimport { controller, service, BrowserActions } from '@brightinteractive/bright-js-framework'\n\n@controller()\nexport class LocationChange extends React.PureComponent {\n  @service(BrowserActions)\n  browser: BrowserActions\n\n  handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {\n    const input = event.currentTarget.querySelector('input')\n    if (input) {\n      this.browser.pushLocation(input.value)\n    }\n  }\n\n  render() {\n    return (\n      <form onSubmit={this.handleSubmit}>\n        Go to: <input />\n      </form>\n    )\n  }\n}\n"},"./node_modules/raw-loader/index.js!../examples/interacting-with-the-browser/src/components/LocationDisplay.tsx":function(e,t){e.exports="import * as React from 'react'\nimport { Location, StateSelection, controller, select, location } from '@brightinteractive/bright-js-framework'\n\n@controller()\nexport class LocationDisplay extends React.PureComponent {\n  @select(location)\n  location: StateSelection<Location>\n\n  render() {\n    return <div>You are on page: {this.location.value.pathname}</div>\n  }\n}\n"}});
//# sourceMappingURL=component---src-pages-docs-interacting-with-the-browser-js-3c35f39c5ce196e431b7.js.map