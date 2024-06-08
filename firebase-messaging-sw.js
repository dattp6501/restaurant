importScripts("https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging-compat.js");
firebase.initializeApp({
  apiKey: "AIzaSyAOnLVpkjVsLjT0ayJtnNf8QdmteGZJlR0",
  authDomain: "restaurant-f5b16.firebaseapp.com",
  projectId: "restaurant-f5b16",
  storageBucket: "restaurant-f5b16.appspot.com",
  messagingSenderId: "519617058797",
  appId: "1:519617058797:web:30464e6d893004b2da79e4",
  measurementId: "G-6E98BH83LG",
  vapidKey: "BPAfmu6cOp9lKKYjP3d9dY50Og272BPOqWJ7TQ7OdyraCy5k6bwQ-QS3iUb1QprWHXdTtXYIayI_vRxsa2Btnxg"
});
const messaging = firebase.messaging();