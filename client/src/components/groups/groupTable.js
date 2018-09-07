import React, { Component } from 'react'
import { Table, Button, Image } from 'semantic-ui-react'

class GroupTable extends Component {
  render () {
    console.log('Group Table', this.props)
    return (

      <div style={{ padding: 10 + 'px' }}>
        <Table striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>Select Group</Table.HeaderCell>
              <Table.HeaderCell >Icon</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Group Title</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Participants</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Membership Status</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { (this.props.groups) &&
              this.props.groups.map((item, index) => {
                return <Table.Row style={{cursor: 'pointer'}} key={index}>
                  <Table.Cell textAlign='center'><input type='checkbox' onChange={(e) => { this.props.handleCheck(e, item.groupId) }} /></Table.Cell>
                  <Table.Cell > <Image style={{height: '25px', width: '25px'}}
                    src={(item.iconURL !== '')
                      ? `/api/v1/groups/${item.groupId}/icon`
                      : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
                    size='mini' circular /></Table.Cell>

                  <Table.Cell textAlign='center'>{item.title}</Table.Cell>
                  <Table.Cell textAlign='center'>{item.participants.length}</Table.Cell>
                  <Table.Cell textAlign='center'>{(item.groupLeft) ? 'Left Group' : 'Joined'}</Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Button primary circular size='mini' onClick={() => { this.props.getInvite(item) }}> Invite Link </Button>
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
