import React, { Component } from 'react'
import { Table, Button, Image, Checkbox } from 'semantic-ui-react'

class GroupTable extends Component {
  render () {
    console.log('Props in Group Table', this.props)
    return (

      <div style={{ padding: 10 + 'px' }}>
        <Table striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>Select Group</Table.HeaderCell>
              <Table.HeaderCell >Icon</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Group Title</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>No. of Participants</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Created At</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { (this.props.groups) &&
              this.props.groups.map((item, index) => {
                return <Table.Row style={{cursor: 'pointer'}} key={index}>
                  <Table.Cell textAlign='center'><Checkbox /></Table.Cell>
                  <Table.Cell > <Image style={{height: '25px', width: '25px'}}
                    src={(item.iconURL !== '')
                      ? `/api/v1/groups/${item.groupId}/icon`
                      : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
                    size='mini' circular /></Table.Cell>

                  <Table.Cell textAlign='center'>{item.title}</Table.Cell>
                  <Table.Cell textAlign='center'>{item.participants.length}</Table.Cell>
                  <Table.Cell textAlign='center'>{new Date(item.createtime).toDateString()}</Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Button primary circular size='mini' onClick={() => { this.props.getInvite(item.groupId) }}> Invite Link </Button>
                    <Button primary circular size='mini' onClick={() => { this.props.viewDetail(item.groupId) }}> View Details </Button>
                  </Table.Cell>
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
