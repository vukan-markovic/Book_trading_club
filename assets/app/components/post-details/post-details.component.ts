import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})

export class PostDetailsComponent implements OnInit{
    post: any = {};
    user: any = {};

    constructor(private postService: PostService, private route: ActivatedRoute,
                private authService: AuthService, private flashMessage: FlashMessagesService,
                private router: Router) {}
        
    ngOnInit () {
        this.postService.getPost(this.route.snapshot.params['id'])
            .subscribe((post: Post) => {
                    this.post = post;
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
        
    isAdmin() {
        if(this.authService.isLoggedIn())
            return this.user.email === 'vukan.markovic97@gmail.com';
        return false;
    }

    onDelete() {
        this.postService.deletePost(this.post)
            .subscribe(
                result => {
                    console.log(result);
                    this.router.navigate(['/blog']);
                    this.flashMessage.show('Post is deleted!', { cssClass: 'alert-danger', timeout: 3000 });
                },
                error => console.error(error));
    }

    onUpdate() {
        this.router.navigate(['/update-post', this.post.postId]);
    }
}