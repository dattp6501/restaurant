import { appconfig } from '@appconfig/appconfig';
import { Component, OnInit } from '@angular/core';
import {getMessaging, getToken, onMessage} from "firebase/messaging";


// Import Firebase
import { firebaseClientConfig } from "@appconfig/firebaseclientconfig";
import { initializeApp } from "firebase/app";
initializeApp(firebaseClientConfig.firebase);


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
  title = 'af-notification';
  message: any = null;

  constructor() {
  }

  ngOnInit(): void {
    this.requestPermission();
    this.listenForMessages();
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, {vapidKey: firebaseClientConfig.firebase.vapidKey}).then(token => {
        if (token) {
          console.log("token refreshed...", {token});
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  listenForMessages() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    })
  }

  hiddenHandler() {
    this.message = null
  }

}
