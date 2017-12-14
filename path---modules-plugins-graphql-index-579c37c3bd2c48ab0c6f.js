webpackJsonp([0xb6b753138f7c],{509:function(e,i){e.exports={pathContext:{docs:{id:1175,name:'"plugins/graphql/index"',kind:1,kindString:"External module",flags:{isExported:!0},originalName:"/home/travis/build/brightinteractive/bright-js-framework/src/plugins/graphql/index.ts",children:[{id:1187,name:"GraphQLClient",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"GraphQL client injectable into services.",text:"In general, you should use either @query or @mutation to interact with GraphQL APIs.\nHowever in some plugins and services, it may be necessary to perform queries and mutations\nwith an imperative API.\n"},children:[{id:1197,name:"performMutation",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:1198,name:"performMutation",kind:4096,kindString:"Call signature",flags:{},typeParameter:[{id:1199,name:"Variables",kind:131072,kindString:"Type parameter",flags:{}},{id:1200,name:"Result",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:1201,name:"queryDoc",kind:32768,kindString:"Parameter",flags:{},type:{type:"intrinsic",name:"any"}},{id:1202,name:"variables",kind:32768,kindString:"Parameter",flags:{},type:{type:"typeParameter",name:"Variables"}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"reference",name:"GraphQLResult",id:1214,typeArguments:[{type:"typeParameter",name:"Result"}]}]}}],sources:[{fileName:"plugins/graphql/index.ts",line:62,character:17}]},{id:1188,name:"query",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:1189,name:"query",kind:4096,kindString:"Call signature",flags:{},typeParameter:[{id:1190,name:"Result",kind:131072,kindString:"Type parameter",flags:{}},{id:1191,name:"Variables",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:1192,name:"queryDoc",kind:32768,kindString:"Parameter",flags:{},type:{type:"intrinsic",name:"any"}},{id:1193,name:"variables",kind:32768,kindString:"Parameter",flags:{},type:{type:"typeParameter",name:"Variables"}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"typeParameter",name:"Result"}]}},{id:1194,name:"query",kind:4096,kindString:"Call signature",flags:{},typeParameter:[{id:1195,name:"Result",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:1196,name:"queryDoc",kind:32768,kindString:"Parameter",flags:{},type:{type:"intrinsic",name:"any"}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"typeParameter",name:"Result"}]}}],sources:[{fileName:"plugins/graphql/index.ts",line:59,character:7},{fileName:"plugins/graphql/index.ts",line:60,character:7}]}],groups:[{title:"Methods",kind:2048,children:[1197,1188]}],sources:[{fileName:"plugins/graphql/index.ts",line:58,character:30}]},{id:1181,name:"GraphQLMutation",kind:256,kindString:"Interface",flags:{isExported:!0},typeParameter:[{id:1182,name:"Variables",kind:131072,kindString:"Type parameter",flags:{}},{id:1183,name:"Result",kind:131072,kindString:"Type parameter",flags:{}}],children:[{id:1184,name:"perform",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:1185,name:"perform",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Perform the mutation."},parameters:[{id:1186,name:"variables",kind:32768,kindString:"Parameter",flags:{},type:{type:"typeParameter",name:"Variables"}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"reference",name:"GraphQLResult",id:1214,typeArguments:[{type:"typeParameter",name:"Result"}]}]}}],sources:[{fileName:"plugins/graphql/index.ts",line:41,character:9}]}],groups:[{title:"Methods",kind:2048,children:[1184]}],sources:[{fileName:"plugins/graphql/index.ts",line:37,character:32}]},{id:1178,name:"GraphQLQuery",kind:256,kindString:"Interface",flags:{isExported:!0},typeParameter:[{id:1179,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],children:[{id:1180,name:"data",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Current selected data for the query.",text:"This should not be called in componentWillMount or a constructor, as the data will\nnot yet be available. This will throw an exception.\n"},sources:[{fileName:"plugins/graphql/index.ts",line:25,character:15}],type:{type:"typeParameter",name:"T"}}],groups:[{title:"Properties",kind:1024,children:[1180]}],sources:[{fileName:"plugins/graphql/index.ts",line:18,character:29}]},{id:1176,name:"GraphQlPluginOpts",kind:256,kindString:"Interface",flags:{isExported:!0},children:[{id:1177,name:"backendUrl",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Remote backend URL to run queries against. Defaults to `/graphql`"},sources:[{fileName:"plugins/graphql/index.ts",line:11,character:12}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]}}],groups:[{title:"Properties",kind:1024,children:[1177]}],sources:[{fileName:"plugins/graphql/index.ts",line:7,character:34}]},{id:1214,name:"GraphQLResult",kind:4194304,kindString:"Type alias",flags:{isExported:!0},comment:{shortText:"Result of a GraphQL mutation"},sources:[{fileName:"plugins/graphql/index.ts",line:79,character:25}],type:{type:"union",types:[{type:"reflection",declaration:{id:1215,name:"__type",kind:65536,kindString:"Type literal",flags:{},children:[{id:1217,name:"data",kind:32,kindString:"Variable",flags:{},sources:[{fileName:"plugins/graphql/index.ts",line:80,character:31}],type:{type:"typeParameter",name:"T"}},{id:1216,name:"status",kind:32,kindString:"Variable",flags:{},sources:[{fileName:"plugins/graphql/index.ts",line:80,character:12}],type:{type:"stringLiteral",value:"succeeded"}}],groups:[{title:"Variables",kind:32,children:[1217,1216]}],sources:[{fileName:"plugins/graphql/index.ts",line:80,character:3}]}},{type:"reflection",declaration:{id:1218,name:"__type",kind:65536,kindString:"Type literal",flags:{},children:[{id:1220,name:"errors",kind:32,kindString:"Variable",flags:{},sources:[{fileName:"plugins/graphql/index.ts",line:81,character:30}],type:{type:"array",elementType:{type:"reference",name:"Error"}}},{id:1219,name:"status",kind:32,kindString:"Variable",flags:{},sources:[{fileName:"plugins/graphql/index.ts",line:81,character:12}],type:{type:"stringLiteral",value:"failed"}}],groups:[{title:"Variables",kind:32,children:[1220,1219]}],sources:[{fileName:"plugins/graphql/index.ts",line:81,character:3}]}}]}},{id:1203,name:"createGraphQLPlugin",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:1204,name:"createGraphQLPlugin",kind:4096,kindString:"Call signature",flags:{},parameters:[{id:1205,name:"props",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"GraphQlPluginOpts",id:1176}}],type:{type:"reference",name:"PluginConstructor",id:102}}],sources:[{fileName:"plugins/graphql/index.ts",line:14,character:43}]},{id:1212,name:"graphQLClient",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:1213,name:"graphQLClient",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Install a GraphQL client.",text:"In general, you should use either @query or @mutation to interact with GraphQL APIs.\nHowever in some plugins and services, it may be necessary to perform queries and mutations\nwith an imperative API.\n"},type:{type:"reference",name:"PropertyDecorator"}}],sources:[{fileName:"plugins/graphql/index.ts",line:72,character:29}]},{id:1209,name:"mutation",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:1210,name:"mutation",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Decorate a controller or service property to add a GraphQL mutation."},parameters:[{id:1211,name:"mutationDoc",kind:32768,kindString:"Parameter",flags:{},type:{type:"intrinsic",name:"any"}}],type:{type:"reference",name:"PropertyDecorator"}}],sources:[{fileName:"plugins/graphql/index.ts",line:47,character:24}]},{id:1206,name:"query",kind:64,kindString:"Function",flags:{isExported:!0},signatures:[{id:1207,name:"query",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Decorate a controller or service property to add a GraphQL data dependency.",text:"The data will be installed on the property as type GraphQLQuery.\n"},parameters:[{id:1208,name:"queryDoc",kind:32768,kindString:"Parameter",flags:{},type:{type:"intrinsic",name:"any"}}],type:{type:"reference",name:"PropertyDecorator"}}],sources:[{fileName:"plugins/graphql/index.ts",line:33,character:21}]}],groups:[{title:"Interfaces",kind:256,children:[1187,1181,1178,1176]},{title:"Type aliases",kind:4194304,children:[1214]},{title:"Functions",kind:64,children:[1203,1212,1209,1206]}],sources:[{fileName:"plugins/graphql/index.ts",line:1,character:0}]}}}}});
//# sourceMappingURL=path---modules-plugins-graphql-index-579c37c3bd2c48ab0c6f.js.map