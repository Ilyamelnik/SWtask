const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const webpush = require('web-push')
app.use(cors())
app.use(bodyParser.json())
const port = 4000
app.get('/', (req, res) => res.send('Hello World!'))
const dummyDb = { subscription: null }
const saveToDatabase = async subscription => {
  dummyDb.subscription = subscription
  console.log('dummyDb', dummyDb);
}
// The new /save-subscription endpoint
app.post('/save-subscription', async (req, res) => {
  const subscription = req.body
  await saveToDatabase(subscription)
  res.json({ message: 'success' })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


const vapidKeys = {
  publicKey:
    'BNn5vy7iCW5rTOFsQdSTbwKGCMCSS5h6LhC7n3Wu0-NO2ZtdKnNYsaEv6fCvYeE3FMM1Vbu3TvQQ-1iHVTNcE8E',
  privateKey: 'qj4vhpHznRwdqEVbG011MbRc-iKbtQZriRQFPthZyuo',
}
//setting our previously generated VAPID keys
webpush.setVapidDetails(
  'mailto:iliamelnik@outlook.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend = '') => {
  webpush.sendNotification(subscription, dataToSend)
}

app.get('/send-notification', (req, res) => {
  const subscription = dummyDb.subscription //get subscription from your databse here.
  const message = 'Hello World'
  console.log('subscriptionSENDNOTIF', subscription);
  sendNotification(subscription, message);
})