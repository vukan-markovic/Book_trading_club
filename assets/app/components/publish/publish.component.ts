import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-publish',
    templateUrl: './publish.component.html'
})

export class PublishComponent implements OnInit {
    post: Post;
    user: any = {};

    constructor(private postService: PostService, private authService: AuthService, private router: Router) {}

    ngOnInit() {
        if (!this.authService.isLoggedIn())
            this.router.navigate(['/login']);

        this.authService.getUser(localStorage.getItem('userId'))
            .subscribe((user: User) => {
                    this.user = user;
                }
            );
    }

    onSubmit(form: NgForm) {
        const post = new Post(form.value.title, form.value.content, this.user.firstName);
        this.postService.addPost(post)
            .subscribe(data => console.log(data), error => console.error(error));
        form.resetForm();
        this.router.navigate(['/blog']);
    }

    onClear(form: NgForm) {
        this.post = null;
        form.resetForm();
    }
} 