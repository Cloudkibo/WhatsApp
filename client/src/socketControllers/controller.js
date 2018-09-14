import { handleNewMessage } from './message.controller'
import { handleGroupNotifications } from './group.controller'

export const init = (payload) => {
  handleNewMessage(payload)
  handleGroupNotifications(payload)
}
