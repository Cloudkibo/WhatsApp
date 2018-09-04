import React, { Component } from 'react'
import { Table, Button, Image, Checkbox } from 'semantic-ui-react'

class GroupTable extends Component {
  render () {
    return (

      <div style={{ padding: 10 + 'px' }}>
        <Table striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>Select Group</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Icon</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Group Title</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>No. of Participants</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Created At</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { (this.props.groups) &&
              this.props.groups.map((item) => {
                return <Table.Row>
                  <Table.Cell textAlign='center'><Checkbox /></Table.Cell>
                  <Table.Cell textAlign='center'> <Image src={(item.iconURL !== '') ? item.iconURL : 'https://react.semantic-ui.com/images/wireframe/square-image.png'} size='mini' circular /></Table.Cell>
                  <Table.Cell textAlign='center'>{item.title}</Table.Cell>
                  <Table.Cell textAlign='center'>{item.participants.length}</Table.Cell>
                  <Table.Cell textAlign='center'>{new Date(item.createtime).toDateString()}</Table.Cell>
                  <Table.Cell textAlign='center'><Button onClick={() => { this.props.viewDetail(item._id) }} primary size='mini'> View Details </Button></Table.Cell>
                </Table.Row>
              })
            }
          </Table.Body>
        </Table>
      </div>

    )
  }
}

export default GroupTable
