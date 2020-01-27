import React from 'react';
import logo from './logo.svg';
import './App.css';

const isLocalhost =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  );

const check = () => {
  console.log("navigator", navigator)
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
  // showLocalNotification('This is title', 'this is the message', swRegistration);
}

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register('sw.js', { scope: '/' })
  return swRegistration;
}

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  console.log('permission', permission);
  if (permission !== 'granted') {
    throw new Error('Permission not granted for Notification');
  }
}

main();


const boom = async () => {
  const SERVER_URL = 'http://192.168.1.201:4000/send-notification'
  const response = await fetch(SERVER_URL, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json();
}

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <button id="permission-btn" onClick={boom}>Ask Permission</button>
    </div>
  );
}

export default App;
