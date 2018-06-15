import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  public books: Book[] = [];
 
  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit () {
    this.bookService.getBooksHome()
      .subscribe((books: Book[]) => {
          this.books = books;
        }
      );
  }

  bookDetails(book: Book) {
    this.router.navigate(['/book-details/', book.bookId]);
  }
}