import io from 'socket.io-client'

const socket = io('')
let store

var joined = false
var myId = ''

export function initiateSocket (storeObj) {
  store = storeObj
  socket.connect()
}

socket.on('connect', () => {
  console.log('Setting Socket Status to true')
})

socket.on('disconnect', () => {
  console.log('Disconnect called')
})

socket.on('message', (data) => {
  // Emitted event
})

export function log (tag, data) {
  console.log(`${tag}: ${data}`)
  socket.emit('logClient', {
    tag,
    data
  })
}
