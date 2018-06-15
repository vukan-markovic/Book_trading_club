import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { ErrorService } from '../services/error.service';
import 'rxjs/Rx';

@Injectable()
export class BookService {
    public books: Book[] = [];
    
    constructor(private http: Http, private errorService: ErrorService) {}

    addBook(book: Book) {
        const body = JSON.stringify(book);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('book/' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const book = new Book(
                    result.obj.title,
                    result.obj.price,
                    result.obj.genre,
                    result.obj.author,
                    result.obj.image,
                    result.obj.about,
                    result.obj.username,
                    result.obj.publishDate,
                    result.obj.user._id,
                    result.obj.userBuyerId,
                    result.obj._id,
                    result.obj.solded);
                this.books.push(book);
                return book;
            })
            .catch((error: Response) => {
                console.log(error);
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getBooks() {
        return this.http.get('book/')
            .map((response: Response) => {
                const books = response.json().obj;
                let transformedBooks: Book[] = [];
                for (let book of books) {
                    transformedBooks.push(new Book(
                        book.title,
                        book.price,
                        book.genre,
                        book.author,
                        book.image,
                        book.about,
                        book.username,
                        book.publishDate,
                        book.user._id,
                        book.userBuyerId,
                        book._id,
                        book.solded)
                    );
                }
                this.books = transformedBooks;
                return transformedBooks;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getBooksHome() {
        return this.http.get('home/')
            .map((response: Response) => {
                const books = response.json().obj;
                let transformedBooks: Book[] = [];
                for (let book of books) {
                    transformedBooks.push(new Book(
                        book.title,
                        book.price,
                        book.genre,
                        book.author,
                        book.image,
                        book.about,
                        book.username,
                        book.publishDate,
                        book.user._id,
                        book.userBuyerId,
                        book._id,
                        book.solded));
                }
                this.books = transformedBooks;
                return transformedBooks;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getBook(bookId : string) {
        return this.http.get('book/' + bookId)
            .map((response: Response) => {
                const book = response.json().obj;
                let transformedBook: Book = new Book(
                        book.title,
                        book.price,
                        book.genre,
                        book.author,        
                        book.image,
                        book.about,    
                        book.username,
                        book.publishDate,
                        book.user._id,
                        book.userBuyerId,
                        book._id,
                        book.solded);                      
                return transformedBook;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateBook(book: Book) {
        const body = JSON.stringify(book);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('book/' + book.bookId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateBookAdmin(book: Book) {
        const body = JSON.stringify(book);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('book/admin/' + book.bookId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateBookSold(book: Book) {
        const body = JSON.stringify(book);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('book/sold/' + book.bookId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteBook(book: Book) {
        this.books.splice(this.books.indexOf(book), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('book/' + book.bookId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteBookAdmin(book: Book) {
        this.books.splice(this.books.indexOf(book), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('book/admin/' + book.bookId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}