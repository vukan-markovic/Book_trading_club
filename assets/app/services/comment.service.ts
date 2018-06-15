import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { ErrorService } from '../services/error.service';
import 'rxjs/Rx';

@Injectable()
export class CommentService {
    private comments: Comment[] = [];
    comment: Comment;
    
    constructor(private http: Http, private errorService: ErrorService) {}

    addComment(comment: Comment, bookId: string) {
        const body = JSON.stringify(comment);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('comment/' + bookId + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const comment = new Comment(
                    result.obj.content,
                    result.obj.username,
                    result.obj.grade,
                    result.obj.tag,
                    result.obj.publishDate,
                    result.obj.book._id,
                    result.obj._id);
                this.comments.push(comment);
                return comment;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getComments(bookId: string) {
        return this.http.get('comment/' + bookId)
            .map((response: Response) => {
                const comments = response.json().obj;
                let transformedComments: Comment[] = [];
                for (let comment of comments) {
                    transformedComments.push(new Comment(
                        comment.content,
                        comment.username,
                        comment.grade,
                        comment.tag,
                        comment.publishDate,
                        comment.book._id,
                        comment._id));
                }
                this.comments = transformedComments;
                return transformedComments;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}