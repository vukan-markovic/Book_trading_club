import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Post } from '../models/post.model';
import { ErrorService } from '../services/error.service';

@Injectable()
export class PostService {
    private posts: Post[] = [];
    post: Post;
    
    constructor(private http: Http, private errorService: ErrorService) {}

    addPost(post: Post) {
        const body = JSON.stringify(post);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('post/' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const post = new Post(
                    result.obj.title,
                    result.obj.content,
                    result.obj.username,
                    result.obj._id,
                    result.obj.user._id);
                this.posts.push(post);
                return post;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getPosts() {
        return this.http.get('post/')
            .map((response: Response) => {
                const posts = response.json().obj;
                let transformedPosts: Post[] = [];
                for (let post of posts) {
                    transformedPosts.push(new Post(
                        post.title,
                        post.content,
                        post.username,
                        post._id,
                        post.user._id)
                    );
                }
                this.posts = transformedPosts;
                return transformedPosts;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getPost(postId : string){
        return this.http.get('post/' + postId)
            .map((response: Response) => {
                const post = response.json().obj;
                let transformedPost: Post = new Post(
                        post.title,
                        post.content,
                        post.username,
                        post._id,
                        post.user._id);
                this.post = transformedPost;
                return transformedPost;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deletePost(post: Post) {
        this.posts.splice(this.posts.indexOf(post), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('post/' + post.postId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updatePost(post: Post) {
        const body = JSON.stringify(post);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('post/' + post.postId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}