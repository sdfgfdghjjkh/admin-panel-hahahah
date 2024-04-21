// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyDGnhi0COdfzhH7iRXCt_rfU9sJlyj1548",
  authDomain: "wdfgyhjjmvj.firebaseapp.com",
  databaseURL: "https://wdfgyhjjmvj-default-rtdb.firebaseio.com",
  projectId: "wdfgyhjjmvj",
  storageBucket: "wdfgyhjjmvj.appspot.com",
  messagingSenderId: "1051382165813",
  appId: "1:1051382165813:web:85ce1128191198be519c7c",
  measurementId: "G-P4M63VWWGZ"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
