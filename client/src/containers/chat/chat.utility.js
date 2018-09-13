export const getMessagePayload = (sessionId, messageType, message,
  previewUrl = false, recipientType = 'individual') => {
  if (messageType === 'text') {
    return {
      recipientType,
      to: sessionId,
      previewUrl,
      type: messageType,
      messagePayload: {
        body: message
      }
    }
  }
}
