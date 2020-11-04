import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Book } from "src/app/models/Book.model";
import { BooksService } from "src/app/services/books.service";

@Component({
  selector: "app-book-form",
  templateUrl: "./book-form.component.html",
  styleUrls: ["./book-form.component.scss"],
})
export class BookFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
    });
  }

  onSaveBook() {
    const title = this.formGroup.get("title").value;
    const author = this.formGroup.get("author").value;
    const newBook = new Book(title, author);
    this.bookService.createBook(newBook);
    this.router.navigate(["/books"]);
  }
}
