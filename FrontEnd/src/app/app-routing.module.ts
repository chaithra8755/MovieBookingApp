import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MovieComponent } from './admin/movie/movie.component';
import { ShowMovieComponent } from './admin/show-movies/show-movie.component';
import { UpdateMovieComponent } from './admin/update-movie/update-movie.component';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ListMovieComponent } from './user/list-movies/list-movie.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { BookMovieComponent } from './user/book-movie/book-movie.component';
import { BookingInfoomponent } from './user/booking-info/booking-info.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path :'', redirectTo :'/login', pathMatch: 'full'},
  { path: 'addNewUser', component: SignUpComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'booking-info', component: BookingInfoomponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'showMovies', component: ShowMovieComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'listMovies', component: ListMovieComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'book', component: BookMovieComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'addMovie', component: MovieComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'update', component: UpdateMovieComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
