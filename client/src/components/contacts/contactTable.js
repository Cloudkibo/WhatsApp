import React, { Component } from 'react'
import { Table, Button, Image, Popup } from 'semantic-ui-react'

class ContactTable extends Component {
  render () {
    return (

      <div style={{ padding: 10 + 'px' }}>
        <Table striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>Profile Picture</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Number</Table.HeaderCell>
              <Table.HeaderCell>On Whatsapp</Table.HeaderCell>
              <Table.HeaderCell>Subscription Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              this.props.contactsList
                ? this.props.contactsList.map(contact => (
                  <Popup trigger={
                    <Table.Row style={{cursor: 'pointer'}} key={contact._id} onClick={() => { this.props.onRowClick(contact._id) }}>
                      <Table.Cell textAlign='center'> <Image style={{margin: 'auto'}} src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='mini' circular /></Table.Cell>
                      <Table.Cell>{contact.name}</Table.Cell>
                      <Table.Cell>{contact.phone}</Table.Cell>
                      <Table.Cell>{contact.status}</Table.Cell>
                      <Table.Cell>{contact.isSubscribed ? 'Subscribed' : 'Not Subscribed'}</Table.Cell>
                    </Table.Row>
                  } content='Click to update contact information' inverted position='top center'
                  />)
                )
                : <div style={{margin: 'auto'}}>There are no contacts. Kindly upload</div>
            }
          </Table.Body>
        </Table>
      </div>

    )
  }
}

export default ContactTable
