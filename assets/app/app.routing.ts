import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components//profile/profile.component';
import { LoginComponent } from './components//login/login.component';
import { LogoutComponent } from './components//logout/logout.component';
import { HomeComponent } from './components//home/home.component';
import { AddBookComponent } from './components//add-book/add-book.component';
import { BlogComponent } from './components//blog/blog.component';
import { PageNotFoundComponent } from './components//page-not-found/page-not-found.component';
import { PublishComponent } from './components/publish/publish.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { AboutComponent } from './components/about/about.component';
import { ChangeProfilePictureComponent } from './components/change-profile-picture/change-profile-picture.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { UsersComponent } from './components/users/users.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { ShowInfoComponent } from './components/showinfo/show-info.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full', data: { title: 'Home' }},
    { path: 'about', component: AboutComponent, data: { title: 'About'} },
    { path: 'add-book', component: AddBookComponent, data: { title: 'Add book'}},
    { path: 'blog', component: BlogComponent, data: { title: 'Blog'}},
    { path: 'users', component: UsersComponent, data: { title: 'Users'}},
    { path: 'book-details/:id', component: BookDetailsComponent, data: { title: 'Book details'}},
    { path: 'login', component: LoginComponent, data: { title: 'Login'}},
    { path: 'logout', component: LogoutComponent, data: { title: 'Logout'} },
    { path: 'post-details/:id', component: PostDetailsComponent, data: { title: 'Post details'}},
    { path: 'profile', component: ProfileComponent, data: { title: 'Profile' }}, 
    { path: 'publish', component: PublishComponent, data: { title: 'Publish'}},
    { path: 'register', component: RegisterComponent, data: { title: 'Register'}},
    { path: 'update-book/:id', component: UpdateBookComponent, data: { title: 'Update book'}},
    { path: 'update-post/:id', component: UpdatePostComponent, data: { title: 'Update post'}},
    { path: 'change-profile-picture', component: ChangeProfilePictureComponent, data: { title: 'Change profile picture'}},
    { path: 'add-comment/:id', component: AddCommentComponent, data: { title: 'Add comment'}},
    { path: 'show-info/:id', component: ShowInfoComponent, data: { title: 'Show info'}},
    { path: 'home', component: PageNotFoundComponent , data: { title: 'Invalid path'}}
    { path: 'post', component: PageNotFoundComponent , data: { title: 'Invalid path'}}
    { path: 'comment', component: PageNotFoundComponent , data: { title: 'Invalid path'}}
    { path: 'book', component: PageNotFoundComponent , data: { title: 'Invalid path'}}
    { path: 'user', component: PageNotFoundComponent , data: { title: 'Invalid path'}}
    { path: '**', component: PageNotFoundComponent , data: { title: 'Invalid path'}}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
