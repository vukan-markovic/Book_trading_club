import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})

export class BookComponent implements OnInit{
    @Input() book: Book;

    constructor(private bookService: BookService, private router: Router, private flashMessage: FlashMessagesService, private authService: AuthService) {}
    
    ngOnInit(){}

    onUpdate(book : Book) {
        this.router.navigate(['/update-book', book.bookId]);
    }

    onDelete() {
        this.bookService.deleteBook(this.book)
            .subscribe(
                result => {
                    console.log(result)
                    this.flashMessage.show('Book is deleted!', { cssClass: 'alert-danger', timeout: 3000 });
                },
                error => console.error(error));
    }

    belongsToUser() {
        if (this.authService.isLoggedIn())
            return localStorage.getItem('userId') === this.book.userId;
        return false;
    }

    isBookSolded() {
        return this.book.solded;
    }

    bookDetails() {
        this.router.navigate(['/book-details/', this.book.bookId]);
    }

    showInfo() {
        this.router.navigate(['/show-info/', this.book.userBuyerId]);
    }
}