import React from 'react';
import logo from './logo.svg';
import './App.css';

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register('sw.js', { scope: '/' }).then(function (registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function (err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     }).catch(function (err) {
//       console.log(err)
//     });
//   });
// } else {
//   console.log('service worker is not supported');
// }

const check = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('No Service Worker support!')
  }
  if (!('PushManager' in window)) {
    throw new Error('No Push API Support!')
  }
}
const main = async () => {
  check();
  const swRegistration = await registerServiceWorker();
  const permission = await requestNotificationPermission();
  console.log('swRegistration', swRegistration);
  showLocalNotification('This is title', 'this is the message', swRegistration);
}

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register('sw.js', { scope: '/' })
  return swRegistration;
}

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
  };
  swRegistration.showNotification(title, options);
}

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  console.log('permission', permission);
  if (permission !== 'granted') {
    throw new Error('Permission not granted for Notification');
  }
}




function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <button id="permission-btn" onClick={main}>Ask Permission</button>
    </div>
  );
}

export default App;
