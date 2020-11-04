import { Injectable } from "@angular/core";
import firebase from "firebase";
import "@firebase/database";
import DataSnapshot = firebase.database.DataSnapshot;
import { Book } from "../models/Book.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {}

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref("/books").set(this.books);
  }

  getBooks() {
    firebase
      .database()
      .ref("/books")
      .on("value", (data: DataSnapshot) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }

  getSingleBook(id: number) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/books/" + id)
        .once("value")
        .then(
          (data: DataSnapshot) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  createBook(book: Book) {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  deleteBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log("Photo removed!");
        },
        (error) => {
          console.log("Could not remove photo! : " + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex((bookElement) => {
      if (bookElement === book) {
        return true;
      }
    });
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const fileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child("images/" + fileName + file.name)
        .put(file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log("Uploading…");
        },
        (error) => {
          console.log("Error while loading ! : " + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    });
  }
}
