webpackJsonp([37692960299797],{505:function(e,t){e.exports={pathContext:{docs:{id:625,name:'"index"',kind:1,kindString:"External module",flags:{isExported:!0},originalName:"/home/travis/build/brightinteractive/bright-js-framework/src/index.ts",children:[{id:672,name:"Action",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Object describing a mutation to the application datastore."},indexSignature:[{id:674,name:"__index",kind:8192,kindString:"Index signature",flags:{},comment:{shortText:"Object describing a mutation to the application datastore."},parameters:[{id:675,name:"key",kind:32768,kindString:"Parameter",flags:{},type:{type:"intrinsic",name:"string"}}],type:{type:"union",types:[{type:"intrinsic",name:"any"},{type:"intrinsic",name:"undefined"}]}}],children:[{id:673,name:"type",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:208,character:6}],type:{type:"intrinsic",name:"string"}}],groups:[{title:"Properties",kind:1024,children:[673]}],sources:[{fileName:"index.ts",line:207,character:23}]},{id:687,name:"BrowserActions",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Service for performing actions on the browser. Works across all environments.",tags:[{tag:"class",text:"\n"}]},children:[{id:694,name:"goBack",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:695,name:"goBack",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Equivalent to the browser back button"},type:{type:"intrinsic",name:"void"}}],sources:[{fileName:"index.ts",line:300,character:8}]},{id:696,name:"goForward",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:697,name:"goForward",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Equivalent to the browser forward button"},type:{type:"intrinsic",name:"void"}}],sources:[{fileName:"index.ts",line:303,character:11}]},{id:688,name:"pushLocation",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:689,name:"pushLocation",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Navigate to *location*, pushing a new entry onto the history stack"},parameters:[{id:690,name:"location",kind:32768,kindString:"Parameter",flags:{},type:{type:"union",types:[{type:"intrinsic",name:"string"},{type:"reference",name:"Partial",typeArguments:[{type:"reference",name:"Location",id:632}]}]}}],type:{type:"intrinsic",name:"void"}}],sources:[{fileName:"index.ts",line:294,character:14}]},{id:691,name:"replaceLocation",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:692,name:"replaceLocation",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Navigate to *location*, without pushing a new entry onto the history stack"},parameters:[{id:693,name:"location",kind:32768,kindString:"Parameter",flags:{},type:{type:"union",types:[{type:"intrinsic",name:"string"},{type:"reference",name:"Partial",typeArguments:[{type:"reference",name:"Location",id:632}]}]}}],type:{type:"intrinsic",name:"void"}}],sources:[{fileName:"index.ts",line:297,character:17}]}],groups:[{title:"Methods",kind:2048,children:[694,696,688,691]}],sources:[{fileName:"index.ts",line:292,character:31},{fileName:"index.ts",line:306,character:27}],defaultValue:" _BrowserActions"},{id:683,name:"Dispatcher",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Dispatcher function injected by the @dispatcher() decorator"},typeParameter:[{id:684,name:"A",kind:131072,kindString:"Type parameter",flags:{},type:{type:"reference",name:"Action",id:672}}],signatures:[{id:685,name:"__call",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Dispatcher function injected by the @dispatcher() decorator"},parameters:[{id:686,name:"action",kind:32768,kindString:"Parameter",flags:{},type:{type:"typeParameter",name:"A",constraint:{type:"reference",name:"Action",id:672}}}],type:{type:"intrinsic",name:"void"}}],sources:[{fileName:"index.ts",line:230,character:27}]},{id:632,name:"Location",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Components of parsed page location"},children:[{id:635,name:"hash",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Hash string extracted from page URL"},sources:[{fileName:"index.ts",line:73,character:6}],type:{type:"intrinsic",name:"string"}},{id:633,name:"pathname",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Path extracted from page URL"},sources:[{fileName:"index.ts",line:67,character:10}],type:{type:"intrinsic",name:"string"}},{id:634,name:"search",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Query string extracted from page URL"},sources:[{fileName:"index.ts",line:70,character:8}],type:{type:"intrinsic",name:"string"}}],groups:[{title:"Properties",kind:1024,children:[635,633,634]}],sources:[{fileName:"index.ts",line:65,character:25}]},{id:654,name:"PluginConfig",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Configuration class for providing additonal features (such as data-fetching, authentication\nproviders, etc) to an application.",text:"Plugins declare dependencies by using the @exported decorator.\n",tags:[{tag:"class",text:"\n"}]},typeParameter:[{id:655,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],children:[{id:670,name:"Service",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:161,character:20}],type:{type:"reflection",declaration:{id:671,name:"__type",kind:65536,kindString:"Type literal",flags:{},sources:[{fileName:"index.ts",line:161,character:21}]}},defaultValue:" _Service"},{id:668,name:"context",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:156,character:9}],type:{type:"reference",name:"ServiceContext",id:652},inheritedFrom:{type:"reference",name:"Service.context",id:650}},{id:669,name:"controllerProps",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:157,character:17}],type:{type:"reference",name:"__type"},inheritedFrom:{type:"reference",name:"Service.controllerProps",id:651}},{id:664,name:"state",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:153,character:16}],type:{type:"typeParameter",name:"T"},inheritedFrom:{type:"reference",name:"Service.state",id:646}},{id:660,name:"serviceDidMount",kind:2048,kindString:"Method",flags:{isExported:!0,isOptional:!0},signatures:[{id:661,name:"serviceDidMount",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Called after a service’s parent controller mounts. Not called when the component is statically rendered.",text:"Corresponds to React’s componentDidMount()\n"},type:{type:"intrinsic",name:"void"},inheritedFrom:{type:"reference",name:"Service.serviceDidMount",id:642}}],sources:[{fileName:"index.ts",line:144,character:17}],inheritedFrom:{type:"reference",name:"Service.serviceDidMount",id:642}},{id:656,name:"serviceWillLoad",kind:2048,kindString:"Method",flags:{isExported:!0,isOptional:!0},signatures:[{id:657,name:"serviceWillLoad",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Called recursively on all components that are due to be rendered before any of them is rendered.",text:"If this method is async (IE if it returns a promise) then serviceWillLoad will not be called on children until\nall parents have completed.\n"},type:{type:"union",types:[{type:"intrinsic",name:"void"},{type:"reference",name:"Promise",typeArguments:[{type:"union",types:[{type:"intrinsic",name:"void"},{type:"intrinsic",name:"undefined"},{type:"reference",name:"__type"}]}]}]},inheritedFrom:{type:"reference",name:"Service.serviceWillLoad",id:638}}],sources:[{fileName:"index.ts",line:130,character:17}],inheritedFrom:{type:"reference",name:"Service.serviceWillLoad",id:638}},{id:658,name:"serviceWillMount",kind:2048,kindString:"Method",flags:{isExported:!0,isOptional:!0},signatures:[{id:659,name:"serviceWillMount",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Called before a service’s parent controller mounts or before it is statically rendered.",text:"Corresponds to React’s componentWillMount()\n"},type:{type:"intrinsic",name:"void"},inheritedFrom:{type:"reference",name:"Service.serviceWillMount",id:640}}],sources:[{fileName:"index.ts",line:137,character:18}],inheritedFrom:{type:"reference",name:"Service.serviceWillMount",id:640}},{id:662,name:"serviceWillUnmount",kind:2048,kindString:"Method",flags:{isExported:!0,isOptional:!0},signatures:[{id:663,name:"serviceWillUnmount",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Called before a service’s parent controller unmounts. Not called when the component is statically rendered.",text:"Corresponds to React’s componentWillUnmount()\n"},type:{type:"intrinsic",name:"void"},inheritedFrom:{type:"reference",name:"Service.serviceWillUnmount",id:644}}],sources:[{fileName:"index.ts",line:151,character:20}],inheritedFrom:{type:"reference",name:"Service.serviceWillUnmount",id:644}},{id:665,name:"setState",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:666,name:"setState",kind:4096,kindString:"Call signature",flags:{},parameters:[{id:667,name:"state",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"Partial",typeArguments:[{type:"typeParameter",name:"T"}]}}],type:{type:"intrinsic",name:"void"},inheritedFrom:{type:"reference",name:"Service.setState",id:647}}],sources:[{fileName:"index.ts",line:154,character:10}],inheritedFrom:{type:"reference",name:"Service.setState",id:647}}],groups:[{title:"Properties",kind:1024,children:[670,668,669,664]},{title:"Methods",kind:2048,children:[660,656,658,662,665]}],sources:[{fileName:"index.ts",line:176,character:29},{fileName:"index.ts",line:177,character:25}],defaultValue:" _PluginConfig",extendedTypes:[{type:"reference",name:"Service",id:636,typeArguments:[{type:"typeParameter",name:"T"}]}]},{id:626,name:"RouteProps",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Props passed into a component annotated with @route",tags:[{tag:"param",text:"Types of route parameters",param:"Params"},{tag:"param",text:"Expected types of query params object\n",param:"Query"}]},typeParameter:[{id:627,name:"ParamKeys",kind:131072,kindString:"Type parameter",flags:{},type:{type:"intrinsic",name:"string"}},{id:628,name:"QueryKeys",kind:131072,kindString:"Type parameter",flags:{},type:{type:"intrinsic",name:"string"}}],children:[{id:629,name:"location",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Location of the current matched route"},sources:[{fileName:"index.ts",line:53,character:10}],type:{type:"reference",name:"Location",id:632}},{id:630,name:"pathParams",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Values extracted from path components"},sources:[{fileName:"index.ts",line:56,character:12}],type:{type:"reference",name:"Record",typeArguments:[{type:"typeParameter",name:"ParamKeys",constraint:{type:"intrinsic",name:"string"}},{type:"intrinsic",name:"string"}]}},{id:631,name:"queryParams",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Values extracted from url query params"},sources:[{fileName:"index.ts",line:59,character:13}],type:{type:"reference",name:"Record",typeArguments:[{type:"typeParameter",name:"QueryKeys",constraint:{type:"intrinsic",name:"string"}},{type:"intrinsic",name:"string"}]}}],groups:[{title:"Properties",kind:1024,children:[629,630,631]}],sources:[{fileName:"index.ts",line:51,character:27}]},{id:676,name:"SelectFn",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Function describing how to select data from the application datastore.",text:"Passed to the @select() decorator\n"},typeParameter:[{id:677,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],signatures:[{id:678,name:"__call",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Function describing how to select data from the application datastore.",text:"Passed to the @select() decorator\n"},parameters:[{id:679,name:"state",kind:32768,kindString:"Parameter",flags:{},type:{type:"intrinsic",name:"any"}}],type:{type:"typeParameter",name:"T"}}],sources:[{fileName:"index.ts",line:217,character:25}]},{id:636,name:"Service",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Base class for creating Services.",text:"Services are classes that have access to a subset of the React Component API.\nThey are owned by a parent component, and receive lifecycle events.\n",tags:[{tag:"class",text:"\n"}]},typeParameter:[{id:637,name:"State",kind:131072,kindString:"Type parameter",flags:{}}],children:[{id:650,name:"context",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:156,character:9}],type:{type:"reference",name:"ServiceContext",id:652}},{id:651,name:"controllerProps",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:157,character:17}],type:{type:"reference",name:"__type"}},{id:646,name:"state",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:153,character:16}],type:{type:"typeParameter",name:"State"}},{id:642,name:"serviceDidMount",kind:2048,kindString:"Method",flags:{isExported:!0,isOptional:!0},signatures:[{id:643,name:"serviceDidMount",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Called after a service’s parent controller mounts. Not called when the component is statically rendered.",text:"Corresponds to React’s componentDidMount()\n"},type:{type:"intrinsic",name:"void"}}],sources:[{fileName:"index.ts",line:144,character:17}]},{id:638,name:"serviceWillLoad",kind:2048,kindString:"Method",flags:{isExported:!0,isOptional:!0},signatures:[{id:639,name:"serviceWillLoad",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Called recursively on all components that are due to be rendered before any of them is rendered.",text:"If this method is async (IE if it returns a promise) then serviceWillLoad will not be called on children until\nall parents have completed.\n"},type:{type:"union",types:[{type:"intrinsic",name:"void"},{type:"reference",name:"Promise",typeArguments:[{type:"union",types:[{type:"intrinsic",name:"void"},{type:"intrinsic",name:"undefined"},{type:"reference",name:"__type"}]}]}]}}],sources:[{fileName:"index.ts",line:130,character:17}]},{id:640,name:"serviceWillMount",kind:2048,kindString:"Method",flags:{isExported:!0,isOptional:!0},signatures:[{id:641,name:"serviceWillMount",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Called before a service’s parent controller mounts or before it is statically rendered.",text:"Corresponds to React’s componentWillMount()\n"},type:{type:"intrinsic",name:"void"}}],sources:[{fileName:"index.ts",line:137,character:18}]},{id:644,name:"serviceWillUnmount",kind:2048,kindString:"Method",flags:{isExported:!0,isOptional:!0},signatures:[{id:645,name:"serviceWillUnmount",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Called before a service’s parent controller unmounts. Not called when the component is statically rendered.",text:"Corresponds to React’s componentWillUnmount()\n"},type:{type:"intrinsic",name:"void"}}],sources:[{fileName:"index.ts",line:151,character:20}]},{id:647,name:"setState",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:648,name:"setState",kind:4096,kindString:"Call signature",flags:{},parameters:[{id:649,name:"state",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"Partial",typeArguments:[{type:"typeParameter",name:"State"}]}}],type:{type:"intrinsic",name:"void"}}],sources:[{fileName:"index.ts",line:154,character:10}]}],groups:[{title:"Properties",kind:1024,children:[650,651,646]},{title:"Methods",kind:2048,children:[642,638,640,644,647]}],sources:[{fileName:"index.ts",line:123,character:24},{fileName:"index.ts",line:161,character:20}],defaultValue:" _Service",extendedBy:[{type:"reference",name:"PluginConfig",id:654}]},{id:652,name:"ServiceContext",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Opaque object passed into service constructors"},children:[{id:653,name:"@appContext",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:165,character:15}],type:{type:"intrinsic",name:"any"}}],groups:[{title:"Properties",kind:1024,children:[653]}],sources:[{fileName:"index.ts",line:164,character:31}]},{id:680,name:"StateSelection",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Service created by the @select decorator containing current value of\nan application state subscription."},typeParameter:[{id:681,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],children:[{id:682,name:"value",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:226,character:7}],type:{type:"typeParameter",name:"T"}}],groups:[{title:"Properties",kind:1024,children:[682]}],sources:[{fileName:"index.ts",line:225,character:31}]},{id:709,name:"PluginConstructor",kind:4194304,kindString:"Type alias",flags:{isExported:!0},sources:[{fileName:"index.ts",line:179,character:29}],type:{type:"reflection",declaration:{id:710,name:"__type",kind:65536,kindString:"Type literal",flags:{},sources:[{fileName:"index.ts",line:179,character:70}]}}},{id:707,name:"ServiceConstructor",kind:4194304,kindString:"Type alias",flags:{isExported:!0},sources:[{fileName:"index.ts",line:160,character:30}],type:{type:"reflection",declaration:{id:708,name:"__type",kind:65536,kindString:"Type literal",flags:{},sources:[{fileName:"index.ts",line:160,character:44}]}}},{id:701,name:"Link",kind:32,kindString:"Variable",flags:{isExported:!0},comment:{shortText:"Drop-in replacement for HTML anchor element that makes frontend page transitions\ninstead of forcing a new page load. The accepted properties and behavior of the Link\nelement are otherwise identical to the anchor element."},sources:[{fileName:"index.ts",line:81,character:17}],type:{type:"reference",name:"ComponentClass",typeArguments:[{type:"reference",name:"HTMLProps",typeArguments:[{type:"reference",name:"__type"}]}]},defaultValue:" _Link"},{id:726,name:"location",kind:32,kindString:"Variable",flags:{isExported:!0},comment:{shortText:"Select the current page location"},sources:[{fileName:"index.ts",line:311,character:21}],type:{type:"reference",name:"SelectFn",id:676,typeArguments:[{type:"reference",name:"Location",id:632}]},defaultValue:" locationSelect"},{id:702,name:"controller",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:703,name:"controller",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Declare that a component is a controller.",text:"You must annotate a React Component as a controller before attaching services to it.\nYou do not need to annotate a service before attaching other services to it.\n"},type:{type:"reference",name:"ClassDecorator"}}],sources:[{fileName:"index.ts",line:89,character:26}]},{id:724,name:"dispatcher",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:725,name:"dispatcher",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Injects the application’s action dispatcher into a controller or service"},type:{type:"reference",name:"PropertyDecorator"}}],sources:[{fileName:"index.ts",line:283,character:26}]},{id:711,name:"exported",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:712,name:"exported",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Declare that a property of a PluginConfig is available for injection into components\nand services."},parameters:[{id:713,name:"id",kind:32768,kindString:"Parameter",flags:{},comment:{text:"Identifier used to inject the dependency when provided to @inject decorator.\n"},type:{type:"intrinsic",name:"string"}}],type:{type:"reference",name:"PropertyDecorator"}}],sources:[{fileName:"index.ts",line:187,character:24}]},{id:714,name:"inject",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:715,name:"inject",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Declare that a property of a Controller, Service or PluginContext should be fulfilled\nusing dependency injection.",text:"Objects injected by plugins are shared between the whole application.\nThis differs from services, which are unique to each controller.\n"},parameters:[{id:716,name:"key",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"__type"}}],type:{type:"reference",name:"PropertyDecorator"}}],sources:[{fileName:"index.ts",line:200,character:22}]},{id:698,name:"route",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:699,name:"route",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Declare a component as a route and associate a path with it.\nAll components in your project's pages directory (by default, `src/pages`)\nthat are decorated with @route will be served to users.",text:"```\n  interface MyRouteParams {\n    name: string\n  }\n\n  @route('/sayHello/:name')\n  class MyRoute extends React.PureComponent<RouteProps<MyRouteParams>> {\n    render() {\n      return <div>Hello, {this.props.pathParams.name}</div>\n    }\n  }\n```\n"},parameters:[{id:700,name:"path",kind:32768,kindString:"Parameter",flags:{},comment:{text:"Path pattern to serve the route from\n"},type:{type:"intrinsic",name:"string"}}],type:{type:"reference",name:"ClassDecorator"}}],sources:[{fileName:"index.ts",line:39,character:21}]},{id:720,name:"select",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:721,name:"select",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Injects a StateSelector into the component",text:"```\n class Counter extends React.PureComponent {\n   @select(Counter.getValue)\n   counter: StateSelector<number>\n\n   render() {\n     return <div>{this.counter.value}</div>\n   }\n }\n```\n"},typeParameter:[{id:722,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:723,name:"selectFn",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"SelectFn",id:676,typeArguments:[{type:"typeParameter",name:"T"}]}}],type:{type:"reference",name:"PropertyDecorator"}}],sources:[{fileName:"index.ts",line:276,character:22}]},{id:704,name:"service",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:705,name:"service",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Attach a service to a property of a controller or other service.",text:"You must annotate a React Component as a controller before attaching services to it.\nYou do not need to annotate a service before attaching other services to it.\n\nServices are unique to the controller that they are attached to.\nThis differs from dependencies injected using plugins, which are shared amongst the whole\napplication.\n\n```\n @controller()\n class Foo extends React.Component {\n   @service(MyService)\n   myService: MyService\n }\n```\n"},parameters:[{id:706,name:"constructor",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"ServiceConstructor",id:707}}],type:{type:"reference",name:"PropertyDecorator"}}],sources:[{fileName:"index.ts",line:111,character:23}]},{id:717,name:"state",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:718,name:"state",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Declare how to manage state changes for an aspect of application state.",text:"State changes are managed using reducer functions, which take the previous state\nof part of the application store and an action describing a mutation, then return\nthe next state of the store.\n\nState reducers are defined by decorating a static method of a plugin with a `@state()` decorator.\n\n```\n class CounterPlugin extends PluginConfig {\n   @state()\n   static update(state: number = 0, action: Action) {\n     if (action.type === 'counter:increment') {\n       return state + 1\n     }\n\n     return state\n   }\n }\n```\n"},parameters:[{id:719,name:"key",kind:32768,kindString:"Parameter",flags:{},comment:{text:"Key of the application’s store to manage using the decorated function\n"},type:{type:"intrinsic",name:"string"}}],type:{type:"reference",name:"PropertyDecorator"}}],sources:[{fileName:"index.ts",line:258,character:21}]}],groups:[{title:"Interfaces",kind:256,children:[672,687,683,632,654,626,676,636,652,680]},{title:"Type aliases",kind:4194304,children:[709,707]},{title:"Variables",kind:32,children:[701,726]},{title:"Functions",kind:64,children:[702,724,711,714,698,720,704,717]}],sources:[{fileName:"index.ts",line:1,character:0}]}}}}});
//# sourceMappingURL=path---modules-index-5756b33d87e8c579fe51.js.map