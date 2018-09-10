import * as ChatActions from './../redux/actions/chat.actions'
import { storeDispatcher } from './../utility/socketio'

export const handleNewMessage = (payload) => {
  if (payload.type === 'text') { handleTextMessage(payload) }
  if (payload.type === 'image') { handleImageMessage(payload) }
  if (payload.type === 'location') { handleLocationMessage(payload) }
  if (payload.type === 'audio') { handleAudioMessage(payload) }
  if (payload.type === 'video') { handleVideoMessage(payload) }
  if (payload.type === 'document') { handleDocumentMessage(payload) }
  if (payload.type === 'voice') { handleVideoMessage(payload) }
}

const handleTextMessage = (payload) => {
  console.log('New Text Message Received', payload)
  ChatActions.addNewTextMessage(storeDispatcher(), payload)
}

const handleImageMessage = (payload) => {
  console.log('New Image Message Received', payload)
}

const handleLocationMessage = (payload) => {
  console.log('New Location Message Received', payload)
}

const handleAudioMessage = (payload) => {
  console.log('New Location Message Received', payload)
}

const handleVideoMessage = (payload) => {
  console.log('New Location Message Received', payload)
}

const handleDocumentMessage = (payload) => {
  console.log('New Location Message Received', payload)
}

const handleVoiceMessage = (payload) => {
  console.log('New Location Message Received', payload)
}

