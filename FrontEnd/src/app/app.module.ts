import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { CommonModule } from '@angular/common';
// import { LoanUpdateComponent } from './admin/loan/loan.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MovieComponent } from './admin/movie/movie.component';
import { ShowMovieComponent } from './admin/show-movies/show-movie.component';
import { UpdateMovieComponent } from './admin/update-movie/update-movie.component';
import { ListMovieComponent } from './user/list-movies/list-movie.component';
import { BookMovieComponent } from './user/book-movie/book-movie.component';
import { BookingInfoomponent } from './user/booking-info/booking-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    SignUpComponent,
    MovieComponent,
    ShowMovieComponent,
    UpdateMovieComponent,
    ListMovieComponent,
    BookMovieComponent,
    BookingInfoomponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
