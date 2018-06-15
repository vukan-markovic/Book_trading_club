import { Component } from '@angular/core';
import { BookService } from './services/book.service';
import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [BookService, PostService, CommentService]
})

export class AppComponent {}