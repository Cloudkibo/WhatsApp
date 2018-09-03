import React, { Component } from 'react'
import { Table, Button, Image, Checkbox } from 'semantic-ui-react'

class GroupTable extends Component {
  render () {
    return (

      <div style={{ padding: 10 + 'px' }}>
        <Table striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Select Group</Table.HeaderCell>
              <Table.HeaderCell>Icon</Table.HeaderCell>
              <Table.HeaderCell>Group Title</Table.HeaderCell>
              <Table.HeaderCell>No. of Participants</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign='center'><Checkbox /></Table.Cell>
              <Table.Cell> <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='mini' circular /></Table.Cell>
              <Table.Cell>September 14, 2013</Table.Cell>
              <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
              <Table.Cell>No</Table.Cell>
              <Table.Cell><Button onClick={this.props.viewDetail} primary size='tiny'> View Details </Button></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='center'><Checkbox /></Table.Cell>
              <Table.Cell> <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='mini' circular /></Table.Cell>
              <Table.Cell>January 11, 2014</Table.Cell>
              <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
              <Table.Cell><Button primary size='tiny'> View Details </Button></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='center'><Checkbox /></Table.Cell>
              <Table.Cell> <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='mini' circular /></Table.Cell>
              <Table.Cell>May 11, 2014</Table.Cell>
              <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
              <Table.Cell><Button primary size='tiny'> View Details </Button></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

    )
  }
}

export default GroupTable
