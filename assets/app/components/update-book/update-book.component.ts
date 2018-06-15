import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})

export class UpdateBookComponent implements OnInit {
  book: any = {};
  user: any = {};
  userName: string;
  @ViewChild('f') form: NgForm;

  constructor(private bookService: BookService, private router: Router, 
    private authService: AuthService, private route: ActivatedRoute,
    private flashMessage: FlashMessagesService) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.bookService.getBook(this.route.snapshot.params['id'])
        .subscribe((book: Book) => {
          this.book = book
          this.form.setValue({
            title: book.title,
            author: book.author,
            price: book.price,
            genre: book.genre,
            about: book.about,
            image: book.image
          })
        });

        this.authService.getUser(localStorage.getItem('userId'))
        .subscribe((user: User) => {
            this.user = user;
        }
    );
    }
    else this.router.navigate(['/login']);
  }

  onSubmit() {
    this.book.title = this.form.value.title;
    this.book.author = this.form.value.author;
    this.book.price = this.form.value.price;
    this.book.genre = this.form.value.genre;
    this.book.about = this.form.value.about;

    if (this.user.email == "vukan.markovic97@gmail.com") {
      this.bookService.updateBookAdmin(this.book)
        .subscribe(data => console.log(data), error => console.error(error));
        
    this.book = null;
    this.form.resetForm();
    this.flashMessage.show('Book is updated!', { cssClass: 'alert-warning', timeout: 3000 });
    this.router.navigate(['/']);
    
  } else {
    
    this.bookService.updateBook(this.book)
      .subscribe(data => console.log(data), error => console.error(error));
        this.book = null;
    
    this.form.resetForm();
    this.flashMessage.show('Book is updated!', { cssClass: 'alert-warning', timeout: 3000 });
    this.router.navigate(['/profile']);
    }
  }

  onClear(form: NgForm) {
      this.book = null;
      form.resetForm();
  }
}