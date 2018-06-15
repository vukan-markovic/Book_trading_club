import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Comment } from '../../models/comment.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})

export class AddCommentComponent implements OnInit {
  @ViewChild('f') form : NgForm;
  comment: Comment;
  user: any = {};
  book: any = {}

  constructor(private commentService: CommentService, private router: Router, 
              private authService: AuthService, private flashMessage: FlashMessagesService,
              private route: ActivatedRoute) {}

  
  ngOnInit() {
    if (!this.authService.isLoggedIn())
      return this.router.navigate(['/login']);

    this.authService.getUser(localStorage.getItem('userId'))
      .subscribe((user: User) => {
          this.user = user;
      }
    );
  }

  onSubmit() {        
    const comment = new Comment(
      this.form.value.content, 
      this.user.firstName, 
      this.form.value.grade, 
      this.form.value.tag);
    
    this.commentService.addComment(comment, this.route.snapshot.params['id'])
      .subscribe(
        data => {
          console.log(data),
          this.flashMessage.show('New comment is added!', { cssClass: 'alert-success', timeout: 3000 });
        },
        error => console.error(error));
    
    this.form.resetForm();
    this.router.navigate(['/book-details/', this.route.snapshot.params['id']]);  
  }

  onClear() {
      this.comment = null;
      this.form.resetForm();
  }
}