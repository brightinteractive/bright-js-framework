webpackJsonp([0xe343aefa089f],{313:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}t.__esModule=!0;var s=n(1),o=a(s),i=n(47),l=(r(i),n(34)),c=n(24),h=n(38);t.default=function(){return o.createElement("div",null,o.createElement(c.PageHeader,null,"Writing GraphQL APIs"),o.createElement(l.Section,{title:"Introduction"},o.createElement("p",null,"Bright-js-framework allows your application to declare data dependencies on components using GraphQL queries."),o.createElement("p",null,"Unless are writing your app against an existing GraphQL API, you will probably need to write one. Fortunately, bright-js-framework makes it extremely easy to write and host a GraphQL backend."),o.createElement("p",null,"In this page, we assume that you have some existing familiarity with GraphQL — at least from the perspective of writing GraphQL queries. If you don’t, please refer to ",o.createElement("a",{href:"http://graphql.org/learn/"},"http://graphql.org/learn/")," for an overview.")),o.createElement(l.Section,{title:"GraphQL in bright-js-framework"},o.createElement("p",null,"GraphQL APIs within bright-js-framework are written using three parts:",o.createElement("ul",null,o.createElement("li",null,o.createElement("em",null,"Schema:")," Schemas are written in a ",o.createElement("code",null,".graphql"),"schema definition file. They define the GraphQL types, queries and mutations for a particular object."),o.createElement("li",null,o.createElement("em",null,"ResolverMap:")," ResolverMaps are objects written as ",o.createElement("code",null,".ts")," files. They contain a set of resolver functions for a specific type from the schema. Each ",o.createElement("code",null,"@resolver")," decorated function within a ResolverMap is equivalent to a GraphQL resolver. As an example, a UserResolverMap would contain resolver functions for the users forname, surname, email etc. There are three arguments normally passed to a GraphQL resolver: args, obj and context. Two of these are member varibables within the ResolverMap object (obj and context), the final one (args) is still passed to the individual ",o.createElement("code",null,"@resolver")," decorated functions."),o.createElement("li",null,o.createElement("em",null,"Connector:")," Connectors are ",o.createElement("code",null,".ts")," files. Connectors provide implementations for data retrievals that are used by resolver funtions in ResolverMaps (i.e. a UserResolverMap will resolve a users forename by making a call to UserConnector.getUser() and returning the forename property).")))),o.createElement(l.Section,{title:"Example GraphQL Implementation"},o.createElement("p",null,"First of all, we need to add the GraphQL plugin to our application’s config file:"),o.createElement(h.CodeFile,{path:"src/config.ts"},n(665)),o.createElement("p",null,"Next, we’ll add a new type to our GraphQL API. As described, when we write GraphQL APIs with bright-js-framework, we separate our schema definitions from our ",o.createElement("em",null,"resolvers")," by writing the Schema in a ",o.createElement("code",null,".graphql"),"schema definition file. This makes it easy to get a high-level overview of a schema by looking at its schema file. It also means that breaking changes to APIs can easily be identified by looking at the Schema file."),o.createElement("p",null,"Bright-js-framework encourages you to split your API into modules. This makes it easy to navigate around your API schema and implementation. Any directory with a ",o.createElement("code",null,".graphql")," file in it is considered a module. ResolverMap implementations are picked up from any file in the same directory. In this example, we’ve created the ",o.createElement("code",null,"User")," directory, which contains the schema definition for the ",o.createElement("code",null,"User"),"type and its ResolverMap."),o.createElement(h.CodeFile,{path:"src/graphql/schema/User/User.graphql"},n(668)),o.createElement("p",null,"For each type in our schema, we create a subclass of ResolverMap and use the ",o.createElement("code",null,"@type"),",",o.createElement("code",null,"@queries")," and ",o.createElement("code",null,"@mutations")," decorators to associate the resolvers within the ResolverMap with the schema type they resolve."),o.createElement("p",null,"The Query and Mutation types are special top-level types that are not associated with any data. (in object-oriented terms they are more like free functions than classes). These are accessible in the top-level of a GraphQL query or mutation. We declare them using the  ",o.createElement("code",null,"@queries"),"and ",o.createElement("code",null,"@mutations")," decorators."),o.createElement("p",null,"When a resolver within a ResolverMap is written for a scalar property (i.e. a string for a users forename), it should return either the scalar value or (more typically) a Promise for the scalar value."),o.createElement("p",null,"When a resolver within a ResolverMap is written for a relation to another object, it should not fetch the object, but instead return a string ID for that object. This is then provided to that Object's ResolverMap as its ",o.createElement("code",null,"id")," property, which can then be used to fetch data about it from backend services. This is important, as it avoids coupling a resolver to a specific backend service, allowing data from multiple backend services to be presented to the frontend as a single type."),o.createElement("p",null,"In this example, let's assume that the GraphQL User type presented to our frontend is implemented by two different backend services. We have an authentication service that stores the user's account details and a metadata service that stores additional metadata. You can see that we have injected some data connectors. We'll come back to those later. In the meantime, observe the way that an object's properties are resolved — a request to fetch the user each time a property of the user is resolved."),o.createElement(h.CodeFile,{path:"src/graphql/schema/User/UserResolvers.ts"},n(669)),o.createElement("p",null,"Next, we’ll implement the connector to the user account backend service. Connectors are picked up automatically from the filesystem by the GraphQL server. You access them using the ",o.createElement("code",null,"@inject"),"decorator. A single instance of each connector is used across a single incoming request. This allows the connector to batch and de-duplicate outgoing requests:"),o.createElement(h.CodeFile,{path:"src/graphql/connectors/UserAccountConnector.ts"},n(666)),o.createElement("p",null,"You might at this point be wondering why this connector is split into two classes. And where the",o.createElement("code",null,"getOne")," and ",o.createElement("code",null,"getProperty")," methods went."),o.createElement("p",null,"To understand this, it's important to understand the different types of outgoing request we are likely to want to make. Broadly speaking, we can distinguish between ",o.createElement("strong",null,"search")," requests (find by name, etc) ",o.createElement("strong",null,"get")," requests (get by ID) and ",o.createElement("strong",null,"mutation")," requests (create, update, delete)."),o.createElement("p",null,"In a typical query, get by ID will be by far the most commonly made of these. For scalability, it is critical that these are batched into as few outgoing requests as possible. Otherwise when fetching a list of users, we might end up making 100 requests to a backend service when we could have made a single one (which would have typically be implemented using a fast ",o.createElement("code",null,"SELECT * WHERE ID IN (...)"),"—type query."),o.createElement("p",null,"Subclassing ",o.createElement("code",null,"Connector.forResource")," and providing to it a special connector that defines how to fetch a batch of resources by ID makes it extremely easy to avoid this scenario. The base class returned from this method implements methods to get one or many resources by ID, with batching and de-duplication transparently handled."),o.createElement("p",null,"When we ",o.createElement("em",null,"search")," for external resources, batching and de-duplication are much less important. When we ",o.createElement("em",null,"mutate")," an external resource, batching and de-duplication might be undesirable. In these cases, methods should be implemented on your ",o.createElement("code",null,"Connector")," subclass. These will be called directly from your resolver and will not be batched or de-duplicated."),o.createElement("p",null,"You may occasionally write connectors to external services where you do not need to get by ID. In these cases, you can simply subclass ",o.createElement("code",null,"Connector")," directly."),o.createElement("p",null,"To wrap up the example, let’s implement the metadata connector referenced in our resolver."),o.createElement(h.CodeFile,{path:"src/graphql/connectors/UserMetadataConnector.ts"},n(667))),o.createElement(l.Section,{title:"Debugging a GraphQL server"},o.createElement("p",null,"When your GraphQL server is running in development mode, a ",o.createElement("a",{href:"https://github.com/graphql/graphiql"},"GraphiQL")," UI is available. This is useful for debugging resolvers, running manual queries against your backend and exploring your API."),o.createElement("p",null,"This is served from ",o.createElement("code",null,"/graphql-ui")," whenever your app is run in development.")),o.createElement(l.Section,{title:"Hosting the GraphQL server separately to the frontend"},o.createElement("p",null,"In certain applications, it is convenient to host your GraphQL API on the same server that serves the frontend. This can also be faster in some cases (for example, server-rendered pages do not need the extra layer of indirection introduced by an intermediate GraphQL server between it and the backend services)."),o.createElement("p",null,"In other cases, it makes more sense you host your GraphQL API seperately to the frontend. By default, the former approach is used. Any resolvers in your repository will automatically be served from the same server as the frontend. Queries made from your frontend will automatically be made against this server."),o.createElement("p",null,"To host the API seperately, simply create a seperate Bright-js-framework project with no pages, ensure that the GraphQL plugin is included in its configuration file and write your resolvers as usual. Provide the URL of the its GraphQL endpoint (",o.createElement("code",null,"https://my-backend.com/graphql)")," to your frontend as a configuration option:"),o.createElement(h.CodeFile,{path:"src/graphql/config.ts"},n(155))))},e.exports=t.default},155:function(e,t){e.exports='{\n  "plugins": {\n    "@brightinteractive/bright-js-framework/plugins/graphql": {\n      "backendUrl": "$MY_GRAPHQL_BACKEND"\n    }\n  }\n}\n'},665:function(e,t){e.exports='{\n  "plugins": {\n    "@brightinteractive/bright-js-framework/plugins/graphql": {},\n    "@brightinteractive/bright-js-framework/plugins/graphql-server": {}\n  }\n}\n'},666:function(e,t){e.exports="import { inject } from '@brightinteractive/bright-js-framework'\nimport { Connector, ResourceBatchFetcher } from '@brightinteractive/bright-js-framework/plugins/graphql-server'\nimport { HttpClient } from '@brightinteractive/bright-js-framework/plugins/graphql-server/http'\n\n/**\n * Type definition for a resource returned by the backend service.\n */\nexport interface UserAccount {\n  id: string\n  email: string\n}\n\n/**\n * Define how to fetch a batch of Users by ID.\n */\nclass UserAccountFetcher extends ResourceBatchFetcher<UserAccount> {\n  @inject(HttpClient)\n  http: HttpClient\n\n  getMany(ids: string[]) {\n    return this.http.get({\n      url: {\n        baseUrl: process.env.USERS_API!,\n        path: '/users',\n        query: {\n          id: ids\n        }\n      }\n    })\n  }\n}\n\n/**\n * Connector class used by ResolverMap. Exposes additional methods for fetching\n * a user resource by ID\n */\nexport class UserAccountConnector extends Connector.forResource<UserAccount>(UserAccountFetcher) {\n  @inject(HttpClient)\n  http: HttpClient\n\n  delete(id: string) {\n    return this.http.delete({\n      url: {\n        baseUrl: process.env.USERS_API!,\n        path: `/users/${id}`,\n      }\n    })\n  }\n}\n"},667:function(e,t){e.exports="import { inject } from '@brightinteractive/bright-js-framework'\nimport { Connector, ResourceBatchFetcher } from '@brightinteractive/bright-js-framework/plugins/graphql-server'\nimport { HttpClient } from '@brightinteractive/bright-js-framework/plugins/graphql-server/http'\n\nexport interface UserMetadata {\n  id: string\n  name: string\n}\n\nclass UserMetadataFetcher extends ResourceBatchFetcher<UserMetadata> {\n  @inject(HttpClient)\n  http: HttpClient\n\n  getMany(ids: string[]) {\n    return this.http.get({\n      url: {\n        baseUrl: process.env.USERS_API!,\n        path: '/users',\n        query: {\n          id: ids\n        }\n      }\n    })\n  }\n}\n\nexport class UserMetadataConnector extends Connector.forResource<UserMetadata>(UserMetadataFetcher) {\n  @inject(HttpClient)\n  http: HttpClient\n\n  findByName(name: string) {\n    return this.http.get({\n      url: {\n        baseUrl: process.env.USERS_API!,\n        path: '/users/search',\n        query: {\n          name\n        }\n      }\n    })\n  }\n}\n"},668:function(e,t){e.exports="type Query {\n  getUser(id: String!): User\n  searchUser(name: String!): [User!]!\n}\n\ntype Mutation {\n  deleteUser(id: String!): Null\n}\n\ntype User {\n  name: Name\n  email: String\n}\n\n"},669:function(e,t){e.exports="import { inject } from '@brightinteractive/bright-js-framework'\nimport { SchemaType, type, resolver, queries, mutations } from '@brightinteractive/bright-js-framework/plugins/graphql-server'\nimport { UserMetadataConnector } from '../../connectors/UserMetadataConnector'\nimport { UserAccountConnector } from '../../connectors/UserAccountConnector'\n\n@queries()\nexport class UserQueries extends SchemaType {\n  @inject(UserMetadataConnector)\n  metadata: UserMetadataConnector\n\n  @resolver()\n  getUser(props: { id: string }) {\n    return props.id\n  }\n\n  @resolver()\n  searchUser(props: { name: string }) {\n    return this.metadata.findByName(props.name)\n  }\n}\n\n@type('User')\nexport class UserType extends SchemaType {\n  @inject(UserMetadataConnector)\n  metadata: UserMetadataConnector\n\n  @inject(UserAccountConnector)\n  account: UserAccountConnector\n\n  @resolver()\n  name() {\n    return this.metadata.getOne(this.id).then((user) => user && user.name)\n  }\n\n  @resolver()\n  email() {\n    // Sugar for this.account.getOne(this.id).then((user) => user && user.email)\n    return this.account.getProperty(this.id, 'email')\n  }\n}\n\n@mutations()\nexport class UserMutations extends SchemaType {\n  @inject(UserAccountConnector)\n  account: UserAccountConnector\n\n  @resolver()\n  deleteUser(id: string) {\n    this.account.delete(id)\n  }\n}\n"}});
//# sourceMappingURL=component---src-pages-docs-writing-graphql-apis-js-9de1798bb82f491c2e85.js.map