webpackJsonp([63621202927033],{70:function(e,t,l){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=e.columns,l=e.children;return u.default.createElement(i.Table,{style:{tableLayout:"auto"},selectable:!1,fixedHeader:!1},t&&u.default.createElement(i.TableHeader,{displaySelectAll:!1,adjustForCheckbox:!1},u.default.createElement(i.TableRow,null,t.map(function(e){return u.default.createElement(i.TableHeaderColumn,{key:e},e)}))),u.default.createElement(i.TableBody,{displayRowCheckbox:!1},l))}function a(e){var t=e.span,l=e.children;return u.default.createElement(i.TableHeaderColumn,{colSpan:t},l)}function o(e){var t=e.multiline,l=e.children;return u.default.createElement(i.TableRowColumn,{style:t&&{whiteSpace:"wrap"}},l)}t.__esModule=!0,t.DocsRow=void 0,t.DocsTable=r,t.DocsSection=a,t.DocsCell=o;var c=l(1),u=n(c),i=l(31);t.DocsRow=i.TableRow},305:function(e,t,l){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(t[l]=e[l]);return t.default=e,t}function r(e){var t=e.children;return c.createElement(s.DocsTable,{columns:["Flag","Type","Shortcut","Description","Default Value"]},t)}function a(e){var t=e.flag,l=e.type,n=(e.number,e.shortcut),r=e.description,a=e.defaultValue;return c.createElement(s.DocsRow,null,c.createElement(s.DocsCell,null,t),c.createElement(s.DocsCell,null,l),c.createElement(s.DocsCell,null,n),c.createElement(s.DocsCell,{multiline:!0},r),c.createElement(s.DocsCell,{multiline:!0},a))}t.__esModule=!0,t.OptionsTable=r,t.Option=a;var o=l(1),c=n(o),u=l(34),i=l(24),s=(l(38),l(70));t.default=function(){return c.createElement("div",null,c.createElement(i.PageHeader,null,"CLI Tool"),c.createElement(u.Section,{title:"bright-js-framework init"},c.createElement("p",null,"Initialize a new bright-js-framework project."),c.createElement("p",null,"Only available when the working directory is not within a bright-js-framework project.")),c.createElement(u.Section,{title:"bright-js-framework run"},c.createElement("p",null,"Starts a development server."),c.createElement("p",null,"Only available when the working directory is within a bright-js-framework project."),c.createElement(i.Subheader,null,"Options"),c.createElement(r,{cli:!0},c.createElement(a,{flag:"--port",type:"number",shortcut:"-p",description:"Port to serve from",defaultValue:c.createElement("div",null,c.createElement("code",null,"process.env.PORT"),", or ",c.createElement("code",null,"8000")," if undefined.")}))))}}});
//# sourceMappingURL=component---src-pages-docs-cli-tool-js-49b49646dbabbf77e822.js.map