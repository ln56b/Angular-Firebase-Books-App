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
  isUploading: boolean = false;
  fileUrl: string;
  isUploaded: boolean = false;

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
    if (this.fileUrl && this.fileUrl !== "") {
      newBook.photo = this.fileUrl;
    }
    this.bookService.createBook(newBook);
    this.router.navigate(["/books"]);
  }

  onUploadFile(file: File) {
    this.isUploading = true;
    this.bookService.uploadFile(file).then((url: string) => {
      this.fileUrl = url;
      this.isUploading = false;
      this.isUploaded = true;
    });
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
