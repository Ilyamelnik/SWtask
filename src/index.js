import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


// const check = () => {
//   if (!('serviceWorker' in navigator)) {
//     throw new Error('No Service Worker support!')
//   }
//   if (!('PushManager' in window)) {
//     throw new Error('No Push API Support!')
//   }
// }
// const main = async () => {
//   check();
//   const swRegistration = await registerServiceWorker();
//   const permission = await requestNotificationPermission();
//   console.log('swRegistration', swRegistration);
//   showLocalNotification('This is title', 'this is the message', swRegistration);
// }

// const registerServiceWorker = async () => {
//   const swRegistration = await navigator.serviceWorker.register('/src/sw.js')
//   return swRegistration;
// }

// const showLocalNotification = (title, body, swRegistration) => {
//   const options = {
//     body,
//   };
//   swRegistration.showNotification(title, options);
// }

// const requestNotificationPermission = async () => {
//   const permission = await window.Notification.requestPermission();
//   console.log('permission', permission);
//   if (permission !== 'granted') {
//     throw new Error('Permission not granted for Notification');
//   }
// }



// main();

