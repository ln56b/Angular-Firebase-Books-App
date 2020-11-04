import { Component } from "@angular/core";
import firebase from "@firebase/app";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyBuTDXuGpTiDMgsJMiA_N5FvltzvEmL9PI",
      authDomain: "angular-books-3ab1e.firebaseapp.com",
      databaseURL: "https://angular-books-3ab1e.firebaseio.com",
      projectId: "angular-books-3ab1e",
      storageBucket: "angular-books-3ab1e.appspot.com",
      messagingSenderId: "639984960755",
      appId: "1:639984960755:web:5eaabfe43fc18d9bc0e386",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
