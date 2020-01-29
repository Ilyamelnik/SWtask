const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const webpush = require('web-push')
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
app.use(cors())
app.use(bodyParser.json())
const port = 4000
app.get('/', (req, res) => res.send('Hello World!'))
const saveToDatabase = async subscription => {
  console.log('subscription', subscription);
  const Subscription = mongoose.model("Subscription", subscriptionScheme);
  let sub = new Subscription({
    id: "id",
    subscription: subscription
  });
  sub.save(function (err) {
    mongoose.disconnect();  // отключение от базы данных
    if (err) return console.log(err);
    console.log("Сохранен объект", sub);
  });
}

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function (err, client) {
  if (err) {
    return console.log(err);
  }
  console.log('Connect');
  // взаимодействие с базой данных
  client.close();
});

const subscriptionScheme = new Schema({
  id: String,
  subscription: {
    endpoint: String,
    expirationTime: Number,
    keys: {
      p256dh: String,
      auth: String,
    }
  }
})

mongoose.connect("mongodb://localhost:27017/SWtask", { useNewUrlParser: true });

// The new /save-subscription endpoint
app.post('/save-subscription', async (req, res) => {
  const subscription = req.body
  await saveToDatabase(subscription)
  res.json({ message: 'success' })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


const vapidKeys = {
  publicKey:
    'BHP3NTadvyjrf-v8KSTsoZDNpPA1nELgrqyBYQKciRfn1Mu9PZ3nstPDACLu2eHfJDueWtbAvMMvJSZ7oNkoUrE',
  privateKey: '26c2yMmylOsJqJEFZ2mX84Fhcf3qxp5Mqsqagjubx3w',
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
  // const subscription = dummyDb.subscription //get subscription from your databse here.
  const message = 'Hello World'
  console.log('subscriptionSENDNOTIF', subscription);
  sendNotification(subscription, message);
})