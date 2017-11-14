webpackJsonp([0x6ed22d977de3],{'./node_modules/babel-loader/lib/index.js?{"plugins":["/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/babel-plugin-add-module-exports/lib/index.js","/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"presets":[["/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/babel-preset-env/lib/index.js",{"loose":true,"uglify":true,"modules":"commonjs","targets":{"browsers":["> 1%","last 2 versions","IE >= 9"]},"exclude":["transform-regenerator","transform-es2015-typeof-symbol"]}],"/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/babel-preset-stage-0/lib/index.js","/home/travis/build/brightinteractive/bright-js-framework/docs-site/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./src/pages/docs/test-support.js':function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}t.__esModule=!0;var s=n("./node_modules/react/react.js"),l=r(s),a=n("./node_modules/gatsby-link/index.js"),i=(o(a),n("./src/components/Section.js")),c=n("./src/components/Headers.js"),d=n("./src/components/CodeBlock.js");t.default=function(){return l.createElement("div",null,l.createElement(c.PageHeader,null,"Test Support"),l.createElement(i.Section,{alwaysExpanded:!0,title:"Testing Controllers"},l.createElement("p",null,"Previously, we looked at using plugins to add application-level behavior. This presents us with a problem when we come to test components that depend on plugins."),l.createElement("p",null,"Let’s take a look at the ControlPanel component that we built previously:"),l.createElement(d.CodeFile,{path:"src/components/ControlPanel.tsx"},n("./node_modules/raw-loader/index.js!../examples/test-controller-with-plugin/src/components/ControlPanel.tsx")),l.createElement("p",null,"As a slightly contrived example of a test, let’s imagine that we want to verify that when the button is clicked, it dispatches the appropriate event."),l.createElement(d.CodeFile,{path:"src/components/ControlPanel.test.before.tsx"},n("./node_modules/raw-loader/index.js!../examples/test-controller-with-plugin/src/components/ControlPanel.test.before.tsx")),l.createElement("p",null,"This test will throw an exception. The ControlPanel component is expecting to receive the EventManager instance from a plugin, but we haven't provided this plugin to the test case."),l.createElement("p",null,"Bright-js-framework provides the TestFixture class to help with this. Let’s rewrite this test case using the TestFixture class to provide an EventManager to the test:"),l.createElement(d.CodeFile,{path:"src/components/ControlPanel.test.tsx"},n("./node_modules/raw-loader/index.js!../examples/test-controller-with-plugin/src/components/ControlPanel.test.tsx"))))},e.exports=t.default},"./node_modules/raw-loader/index.js!../examples/test-controller-with-plugin/src/components/ControlPanel.test.before.tsx":function(e,t){e.exports="import * as React from 'react'\nimport { TestFixture } from '@brightinteractive/bright-js-framework/test-utils'\nimport { ControlPanel } from './ControlPanel'\nimport EventManagerPlugin from '../plugins/EventManagerPlugin'\n\ndescribe('ControlPanel', () => {\n  it('posts message when button is clicked', (done) => {\n    const fixture = new TestFixture({\n      plugins: [EventManagerPlugin],\n      markup: (\n        <ControlPanel />\n      )\n    })\n\n    fixture.stub(EventManagerPlugin, (plugin: EventManagerPlugin) => {\n      plugin.eventManager.registerHandler('request-open-pod-bay-doors', () => {\n        done()\n      })\n    })\n\n    fixture.render().closest('button').simulate('click')\n  })\n})\n"},"./node_modules/raw-loader/index.js!../examples/test-controller-with-plugin/src/components/ControlPanel.test.tsx":function(e,t){e.exports="import * as React from 'react'\nimport { mount } from 'enzyme'\nimport { ControlPanel } from './ControlPanel'\n\ndescribe('ControlPanel', () => {\n  it('posts message when button is clicked', () => {\n    const dom = mount(<ControlPanel />)\n    dom.closest('button').simulate('click')\n  })\n})\n"},"./node_modules/raw-loader/index.js!../examples/test-controller-with-plugin/src/components/ControlPanel.tsx":function(e,t){e.exports="import * as React from 'react'\nimport { controller } from '@brightinteractive/bright-js-framework'\nimport { eventManager, EventManager } from '../plugins/EventManagerPlugin'\n\n@controller()\nexport class ControlPanel extends React.PureComponent {\n  @eventManager\n  eventManager: EventManager\n\n  handleOpenClick = () => {\n    this.eventManager.emit('request-open-pod-bay-doors')\n  }\n\n  componentDidMount() {\n    this.eventManager.registerHandler('request-open-pod-bay-doors', () => {\n      console.error('I’m sorry but I can’t do that, Dave')\n    })\n  }\n\n  render() {\n    return (\n      <div>\n        <h3>Pod Bay doors:</h3>\n        <button onClick={this.handleOpenClick}>Open</button>\n      </div>\n    )\n  }\n}\n"}});
//# sourceMappingURL=component---src-pages-docs-test-support-js-483f4106d9115daf2b36.js.map