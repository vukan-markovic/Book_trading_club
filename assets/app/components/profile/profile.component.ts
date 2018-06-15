import { Component, OnInit} from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    books: Book[];
    user: any = {};

    constructor(private bookService: BookService, private router: Router, 
                private authService: AuthService) {}

    ngOnInit () {
        if (this.authService.isLoggedIn())
        {
            this.authService.getUser(localStorage.getItem('userId'))
                .subscribe((user: User) => {
                    this.user = user;
                }
            );
            
            this.bookService.getBooks()
                .subscribe((books: Book[]) => {
                    this.books = books;
                }
            );
        }
        else this.router.navigate(['/login']);
    }

    addBook () {
        this.router.navigate(['/add-book']);
    }

    buyBook () {
        this.router.navigate(['/']);
    }

    changeProfilePicture () {
        this.router.navigate(['/change-profile-picture']);
    }
}