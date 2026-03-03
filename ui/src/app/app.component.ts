import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'booksapp';
  readonly APIUrl = "http://localhost:5038/api/books/";

  constructor(private http: HttpClient) {}

  books: any = [];

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

  deleteBook(id: any) {
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe(data => {
      alert(data);
      this.refreshBooks();
    });
  }
}
