import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {
  @ViewChild('f') form : NgForm;
  book: Book;
  user: any = {};

  constructor(private bookService: BookService, private router: Router, 
              private authService: AuthService, private flashMessage: FlashMessagesService) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn())
      return this.router.navigate(['/login']);
    this.authService.getUser(localStorage.getItem('userId'))
      .subscribe((user: User) => {
          this.user = user;
      }
    );
  }

  onSubmit() {
    const book = new Book(this.form.value.title, this.form.value.price, this.form.value.genre, this.form.value.author, this.form.value.image, this.form.value.about, this.user.firstName);

    this.bookService.addBook(book)
      .subscribe(
        data => {
          console.log(data),
          this.flashMessage.show('New book is added!', { cssClass: 'alert-success', timeout: 3000 });
        },
        error => console.error(error));
    this.form.resetForm();
    this.router.navigate(['/profile']);  
  }

  onClear() {
      this.book = null;
      this.form.resetForm();
  }
}