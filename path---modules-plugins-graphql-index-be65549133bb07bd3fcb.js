webpackJsonp([0xb6b753138f7c],{503:function(e,t){e.exports={pathContext:{docs:{id:898,name:'"plugins/graphql/index"',kind:1,kindString:"External module",flags:{isExported:!0},originalName:"/home/travis/build/brightinteractive/bright-js-framework/src/plugins/graphql/index.ts",children:[{id:901,name:"GraphQLQuery",kind:256,kindString:"Interface",flags:{isExported:!0},typeParameter:[{id:902,name:"T",kind:131072,kindString:"Type parameter",flags:{}},{id:904,name:"State",kind:131072,kindString:"Type parameter",flags:{}}],children:[{id:920,name:"Service",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:153,character:20}],type:{type:"reflection",declaration:{id:921,name:"__type",kind:65536,kindString:"Type literal",flags:{},sources:[{fileName:"index.ts",line:153,character:21}]}},defaultValue:" _Service"},{id:918,name:"context",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:148,character:9}],type:{type:"reference",name:"ServiceContext",id:627},inheritedFrom:{type:"reference",name:"Service.context",id:625}},{id:919,name:"controllerProps",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:149,character:17}],type:{type:"reference",name:"__type"},inheritedFrom:{type:"reference",name:"Service.controllerProps",id:626}},{id:903,name:"data",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Current selected data for the query.",text:"This should not be called in componentWillMount or a constructor, as the data will\nnot yet be available. This will throw an exception.\n"},sources:[{fileName:"plugins/graphql/index.ts",line:21,character:15}],type:{type:"typeParameter",name:"T"}},{id:908,name:"serviceDidMount",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Called after a service’s parent controller mounts. Not called when the component is statically rendered.",text:"Corresponds to React’s componentDidMount()\n"},sources:[{fileName:"index.ts",line:136,character:17}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"reflection",declaration:{id:909,name:"__type",kind:65536,kindString:"Type literal",flags:{},signatures:[{id:910,name:"__call",kind:4096,kindString:"Call signature",flags:{},type:{type:"intrinsic",name:"void"}}]}}]},inheritedFrom:{type:"reference",name:"Service.serviceDidMount",id:615}},{id:905,name:"serviceWillMount",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Called before a service’s parent controller mounts or before it is statically rendered.",text:"Corresponds to React’s componentWillMount()\n"},sources:[{fileName:"index.ts",line:129,character:18}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"reflection",declaration:{id:906,name:"__type",kind:65536,kindString:"Type literal",flags:{},signatures:[{id:907,name:"__call",kind:4096,kindString:"Call signature",flags:{},type:{type:"intrinsic",name:"void"}}]}}]},inheritedFrom:{type:"reference",name:"Service.serviceWillMount",id:612}},{id:911,name:"serviceWillUnmount",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Called before a service’s parent controller unmounts. Not called when the component is statically rendered.",text:"Corresponds to React’s componentWillUnmount()\n"},sources:[{fileName:"index.ts",line:143,character:20}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"reflection",declaration:{id:912,name:"__type",kind:65536,kindString:"Type literal",flags:{},signatures:[{id:913,name:"__call",kind:4096,kindString:"Call signature",flags:{},type:{type:"intrinsic",name:"void"}}]}}]},inheritedFrom:{type:"reference",name:"Service.serviceWillUnmount",id:618}},{id:914,name:"state",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"index.ts",line:145,character:16}],type:{type:"typeParameter",name:"State"},inheritedFrom:{type:"reference",name:"Service.state",id:621}},{id:915,name:"setState",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:916,name:"setState",kind:4096,kindString:"Call signature",flags:{},parameters:[{id:917,name:"state",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"Partial",typeArguments:[{type:"typeParameter",name:"State"}]}}],type:{type:"intrinsic",name:"void"},inheritedFrom:{type:"reference",name:"Service.setState",id:622}}],sources:[{fileName:"index.ts",line:146,character:10}],inheritedFrom:{type:"reference",name:"Service.setState",id:622}}],groups:[{title:"Properties",kind:1024,children:[920,918,919,903,908,905,911,914]},{title:"Methods",kind:2048,children:[915]}],sources:[{fileName:"plugins/graphql/index.ts",line:14,character:29}],extendedTypes:[{type:"reference",name:"Service",id:610}]},{id:899,name:"GraphQlPluginOpts",kind:256,kindString:"Interface",flags:{isExported:!0},children:[{id:900,name:"backendUrl",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Remote backend URL to run queries against. Defaults to `/graphql`"},sources:[{fileName:"plugins/graphql/index.ts",line:9,character:12}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]}}],groups:[{title:"Properties",kind:1024,children:[900]}],sources:[{fileName:"plugins/graphql/index.ts",line:5,character:34}]},{id:922,name:"query",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:923,name:"query",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Decorate a controller or service property to add a GraphQL data dependency.",text:"The data will be installed on the property as type GraphQLQuery.\n"},parameters:[{id:924,name:"queryDoc",kind:32768,kindString:"Parameter",flags:{},type:{type:"intrinsic",name:"any"}}],type:{type:"reference",name:"PropertyDecorator"}}],sources:[{fileName:"plugins/graphql/index.ts",line:29,character:21}]}],groups:[{title:"Interfaces",kind:256,children:[901,899]},{title:"Functions",kind:64,children:[922]}],sources:[{fileName:"plugins/graphql/index.ts",line:1,character:0}]}}}}});
//# sourceMappingURL=path---modules-plugins-graphql-index-be65549133bb07bd3fcb.js.map