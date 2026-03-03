import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'booksapp';
  readonly APIUrl = "http://localhost:5038/api/books/";

  constructor(private http: HttpClient) {}

  books: any = [];

  editingBook: any = null;

  refreshBooks() {
    this.http.get(this.APIUrl + 'GetBooks').subscribe(data => {
      this.books = data;
    });
  }

  ngOnInit() {
    this.refreshBooks();
  }

  addBook() {
    var newBook   = (<HTMLInputElement>document.getElementById("newBook")).value;
    var newAuthor = (<HTMLInputElement>document.getElementById("newAuthor")).value;
    var newGenre  = (<HTMLInputElement>document.getElementById("newGenre")).value;
    var newDesc   = (<HTMLInputElement>document.getElementById("newDesc")).value;
    var newPrice  = (<HTMLInputElement>document.getElementById("newPrice")).value;

    var formData = new FormData();
    formData.append("title", newBook);
    formData.append("author", newAuthor);
    formData.append("genre", newGenre);
    formData.append("description", newDesc);
    formData.append("price", newPrice.toString());

    this.http.post(this.APIUrl + 'AddBook', formData).subscribe(data => {
      alert(data);
      this.refreshBooks();
    });
  }

  startEdit(book: any) {
    this.editingBook = { ...book };
  }

  cancelEdit() {
    this.editingBook = null;
  }

  saveEdit() {
    var formData = new FormData();
    formData.append("title", this.editingBook.title);
    formData.append("author", this.editingBook.author);
    formData.append("genre", this.editingBook.genre);
    formData.append("description", this.editingBook.desc);
    formData.append("price", this.editingBook.price.toString());

    this.http.put(this.APIUrl + 'EditBook?id=' + this.editingBook.id, formData).subscribe(data => {
      alert(data);
      this.editingBook = null;
      this.refreshBooks();
    });
  }

  deleteBook(id: any) {
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe(data => {
      alert(data);
      this.refreshBooks();
    });
  }
}
