export const getMessagePayload = (sessionId, messageType, message,
  previewUrl = false, recipientType = 'individual') => {
  if (messageType === 'text') {
    return {
      recipient_type: recipientType,
      to: sessionId,
      previewUrl,
      type: 'text',
      messagePayload: {
        body: message
      }
    }
  }
  if (messageType.includes('image')) {
    return {
      recipient_type: recipientType,
      to: sessionId,
      previewUrl,
      type: 'image',
      messagePayload: message
    }
  }
  if (messageType === 'application/pdf') {
    return {
      recipient_type: recipientType,
      to: sessionId,
      previewUrl,
      type: 'document',
      messagePayload: message
    }
  }
  if (messageType.includes('audio')) {
    return {
      recipient_type: recipientType,
      to: sessionId,
      previewUrl,
      type: 'audio',
      messagePayload: message
    }
  }
}
