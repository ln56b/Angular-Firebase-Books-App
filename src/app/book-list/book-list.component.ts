import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Book } from "../models/Book.model";
import { BooksService } from "../services/books.service";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[];
  booksSubscription: Subscription;

  constructor(private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksSubscription = this.bookService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.bookService.getBooks();
    this.bookService.emitBooks();
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

  onNewBook() {
    this.router.navigate(["/books", "new"]);
  }

  onDeleteBook(book: Book) {
    this.bookService.deleteBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(["books", "view", id]);
  }
}
