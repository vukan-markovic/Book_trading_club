import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})

export class BlogComponent implements OnInit {
  posts: Post [] = [];

  constructor(private router: Router, private authService: AuthService, private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts()
      .subscribe((posts: Post[]) => {
          this.posts = posts;
        }
      );
  }

  onPost() {
    this.router.navigate(['/publish']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  postDetails(post: Post) {
    this.router.navigate(['/post-details/', post.postId]);
  }

  isLoggedIn () {
    return this.authService.isLoggedIn();
  }
}