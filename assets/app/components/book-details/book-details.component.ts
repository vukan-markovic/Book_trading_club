import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { Comment } from '../../models/comment.model';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CommentService } from '../../services/comment.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
    book: any = {};
    user: any = {};
    comments: Comment[] = [];

    constructor(private bookService: BookService, private authService: AuthService,
                private router: Router, private flashMessage: FlashMessagesService, 
                private route: ActivatedRoute, private commentService: CommentService) {}

    ngOnInit () {
        this.bookService.getBook(this.route.snapshot.params['id'])
            .subscribe(
                (book: Book) => {
                    this.book = book;
                }
            );

        this.commentService.getComments(this.route.snapshot.params['id'])
            .subscribe((comments: Comment[]) => {
                this.comments= comments;
            }
        );

        if(this.authService.isLoggedIn()) {
            this.authService.getUser(localStorage.getItem('userId'))
                .subscribe((user: User) => {
                        this.user = user;
                    }
                );
        }
    }

    onBuy () {
        this.book.userBuyerId = localStorage.getItem('userId');

        this.bookService.updateBookSold(this.book)
            .subscribe(result => console.log(result), error => console.error(error));
        
        this.router.navigate(['/']);
        this.flashMessage.show('Book is bought!', { cssClass: 'alert-success', timeout: 3000 });
    }

    belongsToUser () {
        if(this.authService.isLoggedIn())
            return this.user.firstName === this.book.username;
        return true;
    }

    isAdmin () {
        if(this.authService.isLoggedIn())
            return this.user.email === 'vukan.markovic97@gmail.com';
        return false;
    }

    onDelete () {
        this.bookService.deleteBookAdmin(this.book)
            .subscribe(
                result => {
                    console.log(result)
                    this.flashMessage.show('Book is deleted!', { cssClass: 'alert-danger', timeout: 3000 });
                    this.router.navigate(['/']);
                },
                error => console.error(error));
    }

    onComment () {
        this.router.navigate(['/add-comment/', this.book.bookId]);
    }

    onUpdate () {
        this.router.navigate(['/update-book', this.book.bookId]);
    }
 
    isDefined () {
        return this.book.about !== undefined;
    }
}