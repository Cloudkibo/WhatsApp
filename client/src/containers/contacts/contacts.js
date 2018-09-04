import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { filter } from 'lodash'
import { withAlert } from 'react-alert'
import { loadContactsList, updateContact, uploadFile } from '../../redux/actions/contacts.actions'

import PageTile from './../../components/pageTitle'
import HelpAlert from './../../components/themeComponents/helpAlert'
import PortletHead from './../../components/themeComponents/portletHead'
import ContactTable from './../../components/contacts/contactTable'
import ContactSearch from '../contacts/contactSearch'
import AddContacts from './../../components/contacts/addContacts'
import UpdateContact from './../../components/contacts/updateContact'

class Contacts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      showUpdate: false,
      selectedFiles: '',
      selectedContact: [],
      buttonDisabled: true
    }
    this.onUpload = this.onUpload.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onRowClick = this.onRowClick.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.showUpdate = this.showUpdate.bind(this)
  }

  componentWillMount () {
    this.props.loadContactsList()
  }

  handleClose () {
    this.setState({ showModal: false, showUpdate: false })
  }
  onUpload () {
    if (this.state.selectedFiles[0]) {
      let data = new FormData()
      data.append('file', this.state.selectedFiles[0])
      data.append('name', 'file')
      this.props.uploadFile(data, this.props.alert)
    } else {
      this.props.alert.show('Only CSV files supported.', {type: 'info'})
    }
    this.setState({ buttonDisabled: true })
    this.handleClose()
  }

  onDrop (acceptedFile, rejectedFile) {
    this.setState({selectedFiles: acceptedFile, buttonDisabled: false})
  }

  onRowClick (id) {
    let selectedContact = filter(this.props.contactsList, {_id: id})[0]
    console.log(selectedContact)
    this.showUpdate(selectedContact)
  }

  showUpdate (contact) {
    console.log('From show update method' + contact)
    this.setState({showUpdate: true, selectedContact: contact})
  }

  onUpdate (updatedName) {
    if (updatedName !== '') {
      this.props.updateContact(this.state.selectedContact.phone, updatedName, this.props.alert)
      this.setState({ buttonDisabled: true })
      this.handleClose()
    }
  }

  handleUpdate = (event) => {
    if (event.target.value !== '') this.setState({ buttonDisabled: false })
    else this.setState({ buttonDisabled: true })
  }

  render () {
    return (
      <div>
        <PageTile title={'Manage Contacts'} />
        <div className='m-content'>
          <HelpAlert message={'Here you can view the list of all the contacts that you have added.'} />
          {this.state.showModal &&
            <AddContacts onCreate={this.onUpload} onDrop={this.onDrop} showModal={this.state.showModal} buttonDisabled={this.state.buttonDisabled} handleClose={this.handleClose} />
          }
          {
            this.state.showUpdate &&
            <UpdateContact showModal={this.state.showUpdate} onUpdate={this.onUpdate}
              handleClose={this.handleClose} selectedContact={this.state.selectedContact}
              buttonDisabled={this.state.buttonDisabled} handleUpdate={this.handleUpdate} />
          }
          <div className='row'>
            <div className='col-xl-12'>
              <div className='m-portlet'>
                <PortletHead title={'Contacts'} buttonTitle={`Upload Contact`} buttonAction={() => { this.setState({showModal: true}) }} />
                <div className='m-portlet__body' />
                <ContactSearch showUpdate={this.showUpdate} />
                <ContactTable onRowClick={this.onRowClick} contactsList={this.props.contactsList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log(state)
  return {
    contactsList: state.contactsReducer.contactsList
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loadContactsList: loadContactsList,
    updateContact: updateContact,
    uploadFile: uploadFile
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(Contacts))
