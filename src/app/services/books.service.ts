import { Injectable } from "@angular/core";
import firebase from "firebase";
import "@firebase/database";
import Datasnapshot = firebase.database.DataSnapshot;
import { Book } from "../models/Book.model";
import { Subject } from "rxjs";
import { Data } from "@angular/router";

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
      .on("value", (data: Datasnapshot) => {
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
          (data: Datasnapshot) => {
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
    const bookIndexToRemove = this.books.findIndex((bookElement) => {
      if (bookElement === book) {
        return true;
      }
    });
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
}
