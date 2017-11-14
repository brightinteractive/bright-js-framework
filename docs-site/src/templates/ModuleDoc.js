import React from 'react'
import { keyBy } from 'lodash'
import { Card, CardText, CardHeader, Tabs, Tab } from 'material-ui'
import MarkdownView from 'react-markdown'
import { PageHeader, Section, getModuleName } from '../components/Headers'
import FunctionDocumentation from '../components/FunctionDocumentation'
import InterfaceDocumentation from '../components/InterfaceDocumentation'
import ComponentDocumentation from '../components/ComponentDocumentation'
import SelectorDocumentation from '../components/SelectorDocumentation'

/**
 * Template for a module documentation page
 */

export default class ModuleDoc extends React.PureComponent {
  docs = this.props.pathContext.docs
  functions = this.docs.children.filter(isFunction)
  classes = this.docs.children.filter(isClass)
  components = this.docs.children.filter(isComponent)
  interfaces = this.docs.children.filter(isInterface({ withComponents: this.components }))
  decorators = this.docs.children.filter(isDecorator)
  selectors = this.docs.children.filter(isSelector)

  propsFor = createGetComponentProps(this.docs.children)

  render() {
    const { docs, functions, classes, interfaces, components, decorators, selectors } = this

    return (
      <div>
        <PageHeader>{'@brightinteractive/' + getModuleName(docs.name)}</PageHeader>
        <Tabs contentContainerStyle={{ marginTop: '2em' }}>
          {
            docs.comments && (
              <Tab label="Overview">
              {
                <Card>
                  <CardHeader title="Overview" />
                  {
                    docs.comment.tags
                    ? docs.comment.tags.map(({ text }, i) =>
                        <CardText key={i}><MarkdownView source={text} /></CardText>
                      )
                    : <CardText>{docs.comment.shortText}</CardText>
                  }
                </Card>
              }
              </Tab>
            )
          }
          {
            components.length > 0 && (
              <Tab label="Components">
              {
                components.map((x, i) =>
                    <ComponentDocumentation key={i} {...x} properties={this.propsFor(x)} />
                )
              }
              </Tab>
            )
          }
          {
            interfaces.length > 0 && (
              <Tab label="Interfaces">
              {
                interfaces.map((x, i) =>
                    <InterfaceDocumentation key={i} kind="interface" {...x} />
                )
              }
              </Tab>
            )
          }
          {
            classes.length > 0 && (
              <Tab label="Classes">
              {
                classes.map((x, i) =>
                  <InterfaceDocumentation key={i} kind="classes" {...x} kindString="class" />
                )
              }
              </Tab>
            )
          }
          {
            functions.length > 0 && (
              <Tab label="Functions">
              {
                functions.map((x, i) =>
                  <FunctionDocumentation key={i} {...x} />
                )
              }
              </Tab>
            )
          }
          {
            decorators.length > 0 && (
              <Tab label="Decorators">
              {
                decorators.map((x, i) =>
                  <FunctionDocumentation decorator key={i} {...x} />
                )
              }
              </Tab>
            )
          }
          {
            selectors.length > 0 && (
              <Tab label="selectors">
              {
                selectors.map((x, i) =>
                  <SelectorDocumentation key={i} {...x} />
                )
              }
              </Tab>
            )
          }
        </Tabs>
      </div>
    )
  }
}

function isClass({ kindString, comment }) {
  return kindString === 'Class' || isTaggedAs('class')(comment)
}

function isFunction({ kindString, signatures }) {
  return kindString === 'Function' && !returnsDecorator(signatures)
}

function isSelector({ kindString, type }) {
  return kindString === 'Variable' && type && type.name === 'SelectFn'
}

function isDecorator({ kindString, signatures }) {
  return kindString === 'Function' && returnsDecorator(signatures)
}

function isComponent({ kindString, type }) {
  return kindString === 'Variable' && type.name && type.name === 'ComponentClass'
}

function isInterface({ withComponents }) {
  const isComponentProps = createIsComponentProps(withComponents)
  return (x) => x.kindString === 'Interface' && !isComponentProps(x) && !isTaggedAs('class')(x.comment)
}

function createIsComponentProps(components) {
  const componentNames = keyBy(components, 'name')
  return ({ name, kindString }) => name.endsWith('Props') && (name.replace(/Props$/, '') in componentNames)
}

function createGetComponentProps(interfaces) {
  const keyedInterfaces = keyBy(interfaces, 'name')
  return ({ name }) => keyedInterfaces[name + 'Props']
}

function returnsDecorator(signatures = []) {
  return signatures.some(sig => sig.type.name === 'ComponentDecorator' || sig.type.name === 'PropertyDecorator')
}

function isTaggedAs(tag) {
  return (comment = {}) => comment && comment.tags && comment.tags.some(t => t.tag === tag)
}
