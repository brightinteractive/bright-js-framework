webpackJsonp([25881880502388],{513:function(e,t){e.exports={pathContext:{docs:{id:905,name:'"test-utils"',kind:1,kindString:"External module",flags:{isExported:!0},originalName:"/home/travis/build/brightinteractive/bright-js-framework/src/test-utils.ts",children:[{id:935,name:"ControllerTestFixture",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Utility class for providing the application context to a react component and mounting\ntest components using enzyme.",tags:[{tag:"class",text:"\n"}]},typeParameter:[{id:936,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],children:[{id:942,name:"instance",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"The subject of the test fixture (component, service, plugin, etc)"},sources:[{fileName:"test-utils.ts",line:35,character:19}],type:{type:"typeParameter",name:"T"},inheritedFrom:{type:"reference",name:"TestFixture.instance",id:915}},{id:953,name:"location",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Current page location"},sources:[{fileName:"test-utils.ts",line:54,character:10}],type:{type:"reference",name:"Location",id:632},inheritedFrom:{type:"reference",name:"TestFixture.location",id:926}},{id:943,name:"apply",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:944,name:"apply",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Apply a property decorator to instance and return the result of the decorated property."},typeParameter:[{id:945,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:946,name:"decorator",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"PropertyDecorator"}}],type:{type:"typeParameter",name:"T"},inheritedFrom:{type:"reference",name:"TestFixture.apply",id:916}}],sources:[{fileName:"test-utils.ts",line:40,character:7}],inheritedFrom:{type:"reference",name:"TestFixture.apply",id:916}},{id:947,name:"getPlugin",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:948,name:"getPlugin",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Get a plugin of a specified type. If it exists, it will be returned.\nIf it does not exist, an exception is thrown."},typeParameter:[{id:949,name:"T",kind:131072,kindString:"Type parameter",flags:{},type:{type:"reference",name:"PluginConfig",id:653}}],parameters:[{id:950,name:"constructor",kind:32768,kindString:"Parameter",flags:{},comment:{text:"Type of the plugins to search for.\n"},type:{type:"reference",name:"PluginConstructor",id:102,typeArguments:[{type:"typeParameter",name:"T",constraint:{type:"reference",name:"PluginConfig",id:653}}]}}],type:{type:"typeParameter",name:"T",constraint:{type:"reference",name:"PluginConfig",id:653}},inheritedFrom:{type:"reference",name:"TestFixture.getPlugin",id:920}}],sources:[{fileName:"test-utils.ts",line:48,character:11}],inheritedFrom:{type:"reference",name:"TestFixture.getPlugin",id:920}},{id:937,name:"render",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:938,name:"render",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Render the test case into an Enzyme wrapper suitable for performing assertions against"},type:{type:"intrinsic",name:"any"}}],sources:[{fileName:"test-utils.ts",line:70,character:8}]},{id:951,name:"unmount",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:952,name:"unmount",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Unmount the test case"},type:{type:"intrinsic",name:"void"},inheritedFrom:{type:"reference",name:"TestFixture.unmount",id:924}}],sources:[{fileName:"test-utils.ts",line:51,character:9}],inheritedFrom:{type:"reference",name:"TestFixture.unmount",id:924}},{id:939,name:"waitForController",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:940,name:"waitForController",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Return a promise that resolves when a controller of a specific type has finished loading.\nUseful for waiting until an async action has completed before making a test assertion."},parameters:[{id:941,name:"type",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"ComponentClass"}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"intrinsic",name:"void"}]}}],sources:[{fileName:"test-utils.ts",line:76,character:19}]}],groups:[{title:"Properties",kind:1024,children:[942,953]},{title:"Methods",kind:2048,children:[943,947,937,951,939]}],sources:[{fileName:"test-utils.ts",line:68,character:38}],extendedTypes:[{type:"reference",name:"TestFixture",id:913,typeArguments:[{type:"typeParameter",name:"T"}]}]},{id:927,name:"ControllerTestFixtureProps",kind:256,kindString:"Interface",flags:{isExported:!0},children:[{id:932,name:"host",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed host (including port)"},sources:[{fileName:"test-utils.ts",line:16,character:6}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]},inheritedFrom:{type:"reference",name:"TestFixtureProps.host",id:910}},{id:931,name:"hostname",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed hostname (not including port)"},sources:[{fileName:"test-utils.ts",line:13,character:10}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]},inheritedFrom:{type:"reference",name:"TestFixtureProps.hostname",id:909}},{id:930,name:"location",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Location string used to match route. Defaults to '/'"},sources:[{fileName:"test-utils.ts",line:10,character:10}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]},inheritedFrom:{type:"reference",name:"TestFixtureProps.location",id:908}},{id:928,name:"markup",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Markup to render in the specified fixture’s context"},sources:[{fileName:"test-utils.ts",line:59,character:8}],type:{type:"reference",name:"ReactElement",typeArguments:[{type:"reference",name:"__type"}]}},{id:929,name:"plugins",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Array of plugins to provide to the test context"},sources:[{fileName:"test-utils.ts",line:7,character:9}],type:{type:"array",elementType:{type:"reference",name:"PluginConstructor",id:102}},inheritedFrom:{type:"reference",name:"TestFixtureProps.plugins",id:907}},{id:934,name:"port",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed port"},sources:[{fileName:"test-utils.ts",line:22,character:6}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"number"}]},inheritedFrom:{type:"reference",name:"TestFixtureProps.port",id:912}},{id:933,name:"protocol",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed protocol (http/https/etc)"},sources:[{fileName:"test-utils.ts",line:19,character:10}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]},inheritedFrom:{type:"reference",name:"TestFixtureProps.protocol",id:911}}],groups:[{title:"Properties",kind:1024,children:[932,931,930,928,929,934,933]}],sources:[{fileName:"test-utils.ts",line:57,character:43}],extendedTypes:[{type:"reference",name:"TestFixtureProps",id:906}]},{id:964,name:"ServiceTestFixture",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Utility class for providing the application context to a service, including lifecycle hooks and injecting all dependencies",text:"You can optionally provide an array of plugins, which should generally be stub implementations\nof interfaces used in your applications. These can be stubbed using the `stub()` method.\n",tags:[{tag:"class",text:"\n"}]},typeParameter:[{id:965,name:"ServiceType",kind:131072,kindString:"Type parameter",flags:{},type:{type:"reference",name:"Service",id:636}}],children:[{id:974,name:"instance",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"The subject of the test fixture (component, service, plugin, etc)"},sources:[{fileName:"test-utils.ts",line:35,character:19}],type:{type:"typeParameter",name:"ServiceType",constraint:{type:"reference",name:"Service",id:636}},inheritedFrom:{type:"reference",name:"TestFixture.instance",id:915}},{id:973,name:"location",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Current page location"},sources:[{fileName:"test-utils.ts",line:111,character:10}],type:{type:"reference",name:"Location",id:632},overwrites:{type:"reference",name:"TestFixture.location",id:926}},{id:966,name:"service",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"test-utils.ts",line:97,character:18}],type:{type:"typeParameter",name:"ServiceType",constraint:{type:"reference",name:"Service",id:636}}},{id:975,name:"apply",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:976,name:"apply",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Apply a property decorator to instance and return the result of the decorated property."},typeParameter:[{id:977,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:978,name:"decorator",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"PropertyDecorator"}}],type:{type:"typeParameter",name:"T"},inheritedFrom:{type:"reference",name:"TestFixture.apply",id:916}}],sources:[{fileName:"test-utils.ts",line:40,character:7}],inheritedFrom:{type:"reference",name:"TestFixture.apply",id:916}},{id:967,name:"getPlugin",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:968,name:"getPlugin",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Get a plugin of a specified type. If it exists, it will be returned.\nIf it does not exist, an exception is thrown."},typeParameter:[{id:969,name:"PluginType",kind:131072,kindString:"Type parameter",flags:{},type:{type:"reference",name:"PluginConfig",id:653}}],parameters:[{id:970,name:"constructor",kind:32768,kindString:"Parameter",flags:{},comment:{text:"Type of the plugins to search for.\n"},type:{type:"reference",name:"PluginConstructor",id:102,typeArguments:[{type:"typeParameter",name:"PluginType",constraint:{type:"reference",name:"PluginConfig",id:653}}]}}],type:{type:"typeParameter",name:"PluginType",constraint:{type:"reference",name:"PluginConfig",id:653}},overwrites:{type:"reference",name:"TestFixture.getPlugin",id:920}}],sources:[{fileName:"test-utils.ts",line:105,character:11}],overwrites:{type:"reference",name:"TestFixture.getPlugin",id:920}},{id:971,name:"unmount",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:972,name:"unmount",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Unmount the test case"},type:{type:"intrinsic",name:"void"},overwrites:{type:"reference",name:"TestFixture.unmount",id:924}}],sources:[{fileName:"test-utils.ts",line:108,character:9}],overwrites:{type:"reference",name:"TestFixture.unmount",id:924}}],groups:[{title:"Properties",kind:1024,children:[974,973,966]},{title:"Methods",kind:2048,children:[975,967,971]}],sources:[{fileName:"test-utils.ts",line:96,character:35}],extendedTypes:[{type:"reference",name:"TestFixture",id:913,typeArguments:[{type:"typeParameter",name:"ServiceType",constraint:{type:"reference",name:"Service",id:636}}]}]},{id:954,name:"ServiceTestFixtureProps",kind:256,kindString:"Interface",flags:{isExported:!0},typeParameter:[{id:955,name:"ServiceType",kind:131072,kindString:"Type parameter",flags:{},type:{type:"reference",name:"Service",id:636,typeArguments:[{type:"intrinsic",name:"any"}]}}],children:[{id:961,name:"host",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed host (including port)"},sources:[{fileName:"test-utils.ts",line:16,character:6}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]},inheritedFrom:{type:"reference",name:"TestFixtureProps.host",id:910}},{id:960,name:"hostname",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed hostname (not including port)"},sources:[{fileName:"test-utils.ts",line:13,character:10}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]},inheritedFrom:{type:"reference",name:"TestFixtureProps.hostname",id:909}},{id:959,name:"location",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Location string used to match route. Defaults to '/'"},sources:[{fileName:"test-utils.ts",line:10,character:10}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]},inheritedFrom:{type:"reference",name:"TestFixtureProps.location",id:908}},{id:958,name:"plugins",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Array of plugins to provide to the test context"},sources:[{fileName:"test-utils.ts",line:7,character:9}],type:{type:"array",elementType:{type:"reference",name:"PluginConstructor",id:102}},inheritedFrom:{type:"reference",name:"TestFixtureProps.plugins",id:907}},{id:963,name:"port",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed port"},sources:[{fileName:"test-utils.ts",line:22,character:6}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"number"}]},inheritedFrom:{type:"reference",name:"TestFixtureProps.port",id:912}},{id:962,name:"protocol",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed protocol (http/https/etc)"},sources:[{fileName:"test-utils.ts",line:19,character:10}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]},inheritedFrom:{type:"reference",name:"TestFixtureProps.protocol",id:911}},{id:956,name:"service",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Tested service"},sources:[{fileName:"test-utils.ts",line:85,character:9}],type:{type:"reflection",declaration:{id:957,name:"__type",kind:65536,kindString:"Type literal",flags:{},sources:[{fileName:"test-utils.ts",line:85,character:10}]}}}],groups:[{title:"Properties",kind:1024,children:[961,960,959,958,963,962,956]}],sources:[{fileName:"test-utils.ts",line:83,character:40}],extendedTypes:[{type:"reference",name:"TestFixtureProps",id:906}]},{id:913,name:"TestFixture",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Utility class for providing the application context to classes that require it.",text:"You can optionally provide an array of plugins, which should generally be stub implementations\nof interfaces used in your applications. These can be stubbed using the `stub()` method.\n",tags:[{tag:"class",text:"\n"}]},typeParameter:[{id:914,name:"Instance",kind:131072,kindString:"Type parameter",flags:{}}],children:[{id:915,name:"instance",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"The subject of the test fixture (component, service, plugin, etc)"},sources:[{fileName:"test-utils.ts",line:35,character:19}],type:{type:"typeParameter",name:"Instance"}},{id:926,name:"location",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Current page location"},sources:[{fileName:"test-utils.ts",line:54,character:10}],type:{type:"reference",name:"Location",id:632}},{id:916,name:"apply",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:917,name:"apply",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Apply a property decorator to instance and return the result of the decorated property."},typeParameter:[{id:918,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:919,name:"decorator",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"PropertyDecorator"}}],type:{type:"typeParameter",name:"T"}}],sources:[{fileName:"test-utils.ts",line:40,character:7}]},{id:920,name:"getPlugin",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:921,name:"getPlugin",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Get a plugin of a specified type. If it exists, it will be returned.\nIf it does not exist, an exception is thrown."},typeParameter:[{id:922,name:"T",kind:131072,kindString:"Type parameter",flags:{},type:{type:"reference",name:"PluginConfig",id:653}}],parameters:[{id:923,name:"constructor",kind:32768,kindString:"Parameter",flags:{},comment:{text:"Type of the plugins to search for.\n"},type:{type:"reference",name:"PluginConstructor",id:102,typeArguments:[{type:"typeParameter",name:"T",constraint:{type:"reference",name:"PluginConfig",id:653}}]}}],type:{type:"typeParameter",name:"T",constraint:{type:"reference",name:"PluginConfig",id:653}}}],sources:[{fileName:"test-utils.ts",line:48,character:11}]},{id:924,name:"unmount",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:925,name:"unmount",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Unmount the test case"},type:{type:"intrinsic",name:"void"}}],sources:[{fileName:"test-utils.ts",line:51,character:9}]}],groups:[{title:"Properties",kind:1024,children:[915,926]},{title:"Methods",kind:2048,children:[916,920,924]}],sources:[{fileName:"test-utils.ts",line:33,character:28}],extendedBy:[{type:"reference",name:"ControllerTestFixture",id:935},{type:"reference",name:"ServiceTestFixture",id:964}]},{id:906,name:"TestFixtureProps",kind:256,kindString:"Interface",flags:{isExported:!0},children:[{id:910,name:"host",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed host (including port)"},sources:[{fileName:"test-utils.ts",line:16,character:6}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]}},{id:909,name:"hostname",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed hostname (not including port)"},sources:[{fileName:"test-utils.ts",line:13,character:10}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]}},{id:908,name:"location",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Location string used to match route. Defaults to '/'"},sources:[{fileName:"test-utils.ts",line:10,character:10}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]}},{id:907,name:"plugins",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Array of plugins to provide to the test context"},sources:[{fileName:"test-utils.ts",line:7,character:9}],type:{type:"array",elementType:{type:"reference",name:"PluginConstructor",id:102}}},{id:912,name:"port",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed port"},sources:[{fileName:"test-utils.ts",line:22,character:6}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"number"}]}},{id:911,name:"protocol",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Optional stubbed protocol (http/https/etc)"},sources:[{fileName:"test-utils.ts",line:19,character:10}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]}}],groups:[{title:"Properties",kind:1024,children:[910,909,908,907,912,911]}],sources:[{fileName:"test-utils.ts",line:5,character:33}],extendedBy:[{type:"reference",name:"ControllerTestFixtureProps",id:927},{type:"reference",name:"ServiceTestFixtureProps",id:954}]},{id:979,name:"controllerTestFixture",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:980,name:"controllerTestFixture",kind:4096,kindString:"Call signature",flags:{},typeParameter:[{id:981,name:"Controller",kind:131072,kindString:"Type parameter",flags:{},type:{type:"reference",name:"Component"}}],parameters:[{id:982,name:"props",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"ControllerTestFixtureProps",id:927}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"reference",name:"ControllerTestFixture",id:935,typeArguments:[{type:"typeParameter",name:"Controller",constraint:{type:"reference",name:"Component"}}]}]}}],sources:[{fileName:"test-utils.ts",line:79,character:37}]},{id:983,name:"serviceTestFixture",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:984,name:"serviceTestFixture",kind:4096,kindString:"Call signature",flags:{},typeParameter:[{id:985,name:"ServiceType",kind:131072,kindString:"Type parameter",flags:{},type:{type:"reference",name:"Service",id:636}}],parameters:[{id:986,name:"props",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"ServiceTestFixtureProps",id:954,typeArguments:[{type:"typeParameter",name:"ServiceType",constraint:{type:"reference",name:"Service",id:636}}]}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"reference",name:"ServiceTestFixture",id:964,typeArguments:[{type:"typeParameter",name:"ServiceType",constraint:{type:"reference",name:"Service",id:636}}]}]}}],sources:[{fileName:"test-utils.ts",line:114,character:34}]}],groups:[{title:"Interfaces",kind:256,children:[935,927,964,954,913,906]},{title:"Functions",kind:64,children:[979,983]}],sources:[{fileName:"test-utils.ts",line:1,character:0}]}}}}});
//# sourceMappingURL=path---modules-test-utils-78438efe3475da2085b4.js.map