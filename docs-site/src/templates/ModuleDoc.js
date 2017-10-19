import React from 'react'
import { Card, CardText, CardHeader, Tabs, Tab } from 'material-ui'
import MarkdownView from 'react-markdown'
import { PageHeader, Section } from '../components/Headers'
import FunctionDocumentation from '../components/FunctionDocumentation'
import InterfaceDocumentation from '../components/InterfaceDocumentation'

/**
 * Template for a module documentation page
 */
const ModuleDoc = ({ pathContext: { docs } }) => {
  const functions = docs.children.filter(({ kindString }) => kindString === 'Function')
  const classes = docs.children.filter(({ kindString }) => kindString === 'Class')
  const interfaces = docs.children.filter(({ kindString }) => kindString === 'Interface')

  return (
    <div>
      <PageHeader>{'@brightinteractive/bright-js-framework/' + JSON.parse(docs.name)}</PageHeader>
      <Tabs contentContainerStyle={{ marginTop: '2em' }}>
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
        {
          interfaces.length > 0 && (
            <Tab label="Interfaces">
            {
              interfaces.map(x =>
                  <InterfaceDocumentation kind="interface" {...x} />
              )
            }
            </Tab>
          )
        }
        {
          classes.length > 0 && (
            <Tab label="Classes">
            {
              classes.map(x =>
                <InterfaceDocumentation kind="classes" {...x} />
              )
            }
            </Tab>
          )
        }
        {
          functions.length > 0 && (
            <Tab label="Functions">
            {
              functions.map(x =>
                <FunctionDocumentation {...x} />
              )
            }
            </Tab>
          )
        }
      </Tabs>
    </div>
  )
}

export default ModuleDoc
