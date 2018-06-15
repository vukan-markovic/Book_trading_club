import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})

export class UpdatePostComponent implements OnInit {
  post: any = {};
  @ViewChild('f') form: NgForm;

  constructor(private postService: PostService, private router: Router, 
              private authService: AuthService, private route: ActivatedRoute,
              private flashMessage: FlashMessagesService) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.postService.getPost(this.route.snapshot.params['id'])
        .subscribe((post: Post) => {
          this.post = post;
          this.form.setValue({
            title: post.title,
            content: post.content
          })
        });
    }
    else this.router.navigate(['/login']);
  }

  onSubmit() {
    this.post.title = this.form.value.title;
    this.post.content = this.form.value.content;
    
    this.postService.updatePost(this.post)
      .subscribe(data => console.log(data), error => console.error(error));
      
    this.post = null;
    this.form.resetForm();
    this.flashMessage.show('Post is updated!', { cssClass: 'alert-warning', timeout: 3000 });
    this.router.navigate(['/blog']);
  }

  onClear(form: NgForm) {
      this.post = null;
      form.resetForm();
  }
}