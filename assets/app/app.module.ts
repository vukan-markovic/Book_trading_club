import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from "./app.component";
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PublishComponent } from './components/publish/publish.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { BookComponent } from './components/book/book.component';
import { ChangeProfilePictureComponent } from './components/change-profile-picture/change-profile-picture.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CommentComponent } from './components/comment/comment.component';
import { UsersComponent } from './components/users/users.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { ShowInfoComponent } from './components/showinfo/show-info.component';
import { AuthService } from './services/auth.service';
import { ErrorService } from './services/error.service';
import { routing } from './app.routing';

@NgModule({
    declarations: [
        AppComponent, 
        AboutComponent,
        AddBookComponent,
        BlogComponent,
        BookComponent,
        BookDetailsComponent,
        ErrorComponent,
        HeaderComponent,
        HomeComponent,
        LoginComponent,
        LogoutComponent,
        PageNotFoundComponent,
        PostComponent,
        PostDetailsComponent,
        ProfileComponent,
        PublishComponent,
        RegisterComponent,
        UpdateBookComponent,
        ChangeProfilePictureComponent,
        CommentComponent,
        AddCommentComponent,
        UsersComponent,
        UpdatePostComponent,
        ShowInfoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        FlashMessagesModule.forRoot()
    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})

export class AppModule {}