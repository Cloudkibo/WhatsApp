export const getMessagePayload = (sessionId, messageType, message,
  previewUrl = false, recipientType = 'individual', status = 'pending') => {
  if (messageType === 'text') {
    return {
      recipient_type: recipientType,
      to: sessionId,
      previewUrl,
      type: 'text',
      status: status,
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
      status: status,
      messagePayload: message
    }
  }
  if (messageType === 'application/pdf') {
    return {
      recipient_type: recipientType,
      to: sessionId,
      previewUrl,
      type: 'document',
      status: status,
      messagePayload: message
    }
  }
  if (messageType.includes('audio')) {
    return {
      recipient_type: recipientType,
      to: sessionId,
      previewUrl,
      type: 'audio',
      status: status,
      messagePayload: message
    }
  }
}
