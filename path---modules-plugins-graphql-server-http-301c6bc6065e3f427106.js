webpackJsonp([22811966469449],{504:function(e,t){e.exports={pathContext:{docs:{id:1317,name:'"plugins/graphql-server/http"',kind:1,kindString:"External module",flags:{isExported:!0},originalName:"/home/travis/build/brightinteractive/bright-js-framework/src/plugins/graphql-server/http.ts",children:[{id:1369,name:"BodyType",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Object describing headers and serialization functions for the request body."},children:[{id:1371,name:"convert",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Serialization function for the request body"},sources:[{fileName:"plugins/graphql-server/http.ts",line:184,character:9}],type:{type:"reflection",declaration:{id:1372,name:"__type",kind:65536,kindString:"Type literal",flags:{},signatures:[{id:1373,name:"__call",kind:4096,kindString:"Call signature",flags:{},parameters:[{id:1374,name:"x",kind:32768,kindString:"Parameter",flags:{},type:{type:"intrinsic",name:"any"}}],type:{type:"intrinsic",name:"any"}}],sources:[{fileName:"plugins/graphql-server/http.ts",line:184,character:10}]}}},{id:1370,name:"headers",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Any additional headers to set on the request (eg: `Content-Type`)"},sources:[{fileName:"plugins/graphql-server/http.ts",line:181,character:9}],type:{type:"reference",name:"Record",typeArguments:[{type:"intrinsic",name:"string"},{type:"intrinsic",name:"string"}]}}],groups:[{title:"Properties",kind:1024,children:[1371,1370]}],sources:[{fileName:"plugins/graphql-server/http.ts",line:179,character:25},{fileName:"plugins/graphql-server/http.ts",line:187,character:21}],defaultValue:" _BodyType"},{id:1353,name:"FetchUrl",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Convenience interface for passing URL components to an http request."},children:[{id:1354,name:"baseUrl",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"First portion of the URL",text:"This is generally extracted from an environmental variable. For example,\n`'http://api.my-domain.com'` or `process.env.API_HOST`\n"},sources:[{fileName:"plugins/graphql-server/http.ts",line:110,character:9}],type:{type:"intrinsic",name:"string"}},{id:1355,name:"path",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Second portion of the URL (eg: `'/users'`)"},sources:[{fileName:"plugins/graphql-server/http.ts",line:113,character:6}],type:{type:"intrinsic",name:"string"}},{id:1356,name:"query",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Query params appended to the URL"},sources:[{fileName:"plugins/graphql-server/http.ts",line:116,character:7}],type:{type:"reference",name:"Record",typeArguments:[{type:"intrinsic",name:"string"},{type:"union",types:[{type:"intrinsic",name:"string"},{type:"array",elementType:{type:"intrinsic",name:"string"}}]}]}}],groups:[{title:"Properties",kind:1024,children:[1354,1355,1356]}],sources:[{fileName:"plugins/graphql-server/http.ts",line:103,character:25}]},{id:1318,name:"HttpClient",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"HTTP client for use in GraphQL connectors.",text:"A single HTTP client is shared between resolvers in a GraphQL requests.\nYou can inject the HTTP client into a connector with the @inject decorator:\n\n```\n class UserConnector extends Connector {\n   @inject(HttpClient)\n   httpClient: HttpClient\n\n   async delete(id: string) {\n     await this.httpClient.delete({\n       baseUrl: process.env.USERS_API,\n       subpath: `/users/${id}`\n     })\n   }\n }\n```\n",tags:[{tag:"class",text:"\n"}]},children:[{id:1335,name:"delete",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:1336,name:"delete",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Performs an HTTP DELETE request and returns the response.",text:"Throws an HttpError if the response status code is >= 400.\nDefaults to empty request and response types\n"},typeParameter:[{id:1337,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:1338,name:"opts",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"RequestOpts",id:1357}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"typeParameter",name:"T"}]}}],sources:[{fileName:"plugins/graphql-server/http.ts",line:69,character:8}]},{id:1319,name:"get",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:1320,name:"get",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Performs an HTTP GET request and returns the response.",text:"Throws an HttpError if the response status code is >= 400.\nDefaults to JSON response type\n"},typeParameter:[{id:1321,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:1322,name:"opts",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"RequestOpts",id:1357}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"typeParameter",name:"T"}]}}],sources:[{fileName:"plugins/graphql-server/http.ts",line:37,character:5}]},{id:1343,name:"head",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:1344,name:"head",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Performs an HTTP HEAD request and returns the response.",text:"Throws an HttpError if the response status code is >= 400.\nDefaults to empty request and response types\n"},typeParameter:[{id:1345,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:1346,name:"opts",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"RequestOpts",id:1357}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"typeParameter",name:"T"}]}}],sources:[{fileName:"plugins/graphql-server/http.ts",line:85,character:6}]},{id:1339,name:"options",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:1340,name:"options",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Performs an HTTP OPTIONS request and returns the response.",text:"Throws an HttpError if the response status code is >= 400.\nDefaults to empty request type and JSON response type\n"},typeParameter:[{id:1341,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:1342,name:"opts",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"RequestOpts",id:1357}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"typeParameter",name:"T"}]}}],sources:[{fileName:"plugins/graphql-server/http.ts",line:77,character:9}]},{id:1331,name:"patch",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:1332,name:"patch",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Performs an HTTP PATCH request and returns the response.",text:"Throws an HttpError if the response status code is >= 400.\nDefaults to JSON request and response types\n"},typeParameter:[{id:1333,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:1334,name:"opts",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"RequestOpts",id:1357}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"typeParameter",name:"T"}]}}],sources:[{fileName:"plugins/graphql-server/http.ts",line:61,character:7}]},{id:1327,name:"post",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:1328,name:"post",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Performs an HTTP POST request and returns the response.",text:"Throws an HttpError if the response status code is >= 400.\nDefaults to JSON request and response types\n"},typeParameter:[{id:1329,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:1330,name:"opts",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"RequestOpts",id:1357}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"typeParameter",name:"T"}]}}],sources:[{fileName:"plugins/graphql-server/http.ts",line:53,character:6}]},{id:1323,name:"put",kind:2048,kindString:"Method",flags:{isExported:!0},signatures:[{id:1324,name:"put",kind:4096,kindString:"Call signature",flags:{},comment:{shortText:"Performs an HTTP PUT request and returns the response.",text:"Throws an HttpError if the response status code is >= 400.\nDefaults to JSON request and response types\n"},typeParameter:[{id:1325,name:"T",kind:131072,kindString:"Type parameter",flags:{}}],parameters:[{id:1326,name:"opts",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"RequestOpts",id:1357}}],type:{type:"reference",name:"Promise",typeArguments:[{type:"typeParameter",name:"T"}]}}],sources:[{fileName:"plugins/graphql-server/http.ts",line:45,character:5}]}],groups:[{title:"Methods",kind:2048,children:[1335,1319,1343,1339,1331,1327,1323]}],sources:[{fileName:"plugins/graphql-server/http.ts",line:30,character:27},{fileName:"plugins/graphql-server/http.ts",line:87,character:23}],defaultValue:" _HttpClient"},{id:1347,name:"HttpError",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Object describing the status code of a failed HTTP request.",tags:[{tag:"class",text:"\n"}]},children:[{id:1352,name:"Error",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"/home/travis/build/brightinteractive/bright-js-framework/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts",line:884,character:19}],type:{type:"reference",name:"ErrorConstructor"}},{id:1350,name:"message",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"/home/travis/build/brightinteractive/bright-js-framework/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts",line:874,character:11}],type:{type:"intrinsic",name:"string"},inheritedFrom:{type:"reference",name:"Error.message"}},{id:1349,name:"name",kind:1024,kindString:"Property",flags:{isExported:!0},sources:[{fileName:"/home/travis/build/brightinteractive/bright-js-framework/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts",line:873,character:8}],type:{type:"intrinsic",name:"string"},inheritedFrom:{type:"reference",name:"Error.name"}},{id:1351,name:"stack",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},sources:[{fileName:"/home/travis/build/brightinteractive/bright-js-framework/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts",line:875,character:9}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"string"}]},overwrites:{type:"reference",name:"Error.stack"},inheritedFrom:{type:"reference",name:"Error.stack"}},{id:1348,name:"status",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Status code returned by the request"},sources:[{fileName:"plugins/graphql-server/http.ts",line:96,character:17}],type:{type:"intrinsic",name:"number"}}],groups:[{title:"Properties",kind:1024,children:[1352,1350,1349,1351,1348]}],sources:[{fileName:"plugins/graphql-server/http.ts",line:94,character:26},{fileName:"plugins/graphql-server/http.ts",line:98,character:22}],defaultValue:" _HttpError",extendedTypes:[{type:"reference",name:"Error"}]},{id:1357,name:"RequestOpts",kind:256,kindString:"Interface",flags:{isExported:!0},children:[{id:1359,name:"body",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Request body. Headers and serialization are defined by `responseType`"},sources:[{fileName:"plugins/graphql-server/http.ts",line:124,character:6}],type:{type:"intrinsic",name:"any"}},{id:1362,name:"bodyType",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Object describing headers and serialization functions for the request body."},sources:[{fileName:"plugins/graphql-server/http.ts",line:142,character:10}],type:{type:"reference",name:"BodyType",id:1369}},{id:1360,name:"headers",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Any additional headers to add to the Request.",text:"You generally won’t need to include `Authorization`, `Accept` or `Content-Type`\nas they are provided by other request options.\n"},sources:[{fileName:"plugins/graphql-server/http.ts",line:132,character:9}],type:{type:"reference",name:"Record",typeArguments:[{type:"intrinsic",name:"string"},{type:"intrinsic",name:"string"}]}},{id:1361,name:"responseType",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Object describing headers and deserialization functions for the response body."},sources:[{fileName:"plugins/graphql-server/http.ts",line:137,character:14}],type:{type:"reference",name:"ResponseType",id:1363}},{id:1358,name:"url",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Request URL"},sources:[{fileName:"plugins/graphql-server/http.ts",line:121,character:5}],type:{type:"union",types:[{type:"intrinsic",name:"string"},{type:"reference",name:"FetchUrl",id:1353}]}}],groups:[{title:"Properties",kind:1024,children:[1359,1362,1360,1361,1358]}],sources:[{fileName:"plugins/graphql-server/http.ts",line:119,character:28}]},{id:1363,name:"ResponseType",kind:256,kindString:"Interface",flags:{isExported:!0},comment:{shortText:"Object describing headers and deserialization functions for the response body.\nBuilt-in response types."},children:[{id:1365,name:"convert",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Function from a `fetch()` response to a promise containing deserialized data"},sources:[{fileName:"plugins/graphql-server/http.ts",line:153,character:9}],type:{type:"reflection",declaration:{id:1366,name:"__type",kind:65536,kindString:"Type literal",flags:{},signatures:[{id:1367,name:"__call",kind:4096,kindString:"Call signature",flags:{},parameters:[{id:1368,name:"x",kind:32768,kindString:"Parameter",flags:{},type:{type:"reference",name:"Response"}}],type:{type:"union",types:[{type:"reference",name:"Promise",typeArguments:[{type:"intrinsic",name:"any"}]},{type:"intrinsic",name:"undefined"}]}}],sources:[{fileName:"plugins/graphql-server/http.ts",line:153,character:10}]}}},{id:1364,name:"headers",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"Any additional headers to set on the request (eg: `Accept`)"},sources:[{fileName:"plugins/graphql-server/http.ts",line:150,character:9}],type:{type:"reference",name:"Record",typeArguments:[{type:"intrinsic",name:"string"},{type:"intrinsic",name:"string"}]}}],groups:[{title:"Properties",kind:1024,children:[1365,1364]}],sources:[{fileName:"plugins/graphql-server/http.ts",line:148,character:29},{fileName:"plugins/graphql-server/http.ts",line:159,character:25}],defaultValue:" _ResponseType"}],groups:[{title:"Interfaces",kind:256,children:[1369,1353,1318,1347,1357,1363]}],sources:[{fileName:"plugins/graphql-server/http.ts",line:1,character:0}]}}}}});
//# sourceMappingURL=path---modules-plugins-graphql-server-http-301c6bc6065e3f427106.js.map