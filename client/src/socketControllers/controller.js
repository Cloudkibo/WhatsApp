import { handleNewMessage } from './message.controller'

export const init = (payload) => {
  handleNewMessage(payload)
}
