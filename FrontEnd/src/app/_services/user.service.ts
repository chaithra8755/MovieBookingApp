import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../admin/movie.model';
import { User } from '../sign-up/User.model';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  PATH_OF_API = 'http://localhost:8585';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData) {
    return this.httpclient.post('http://localhost:8080/moviebooking/login', loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public doExist(no: string) {
    return this.httpclient.get(this.PATH_OF_API + '/doesExist/'+no, {
      responseType: 'text',
    });
  }
  //registerNewUser  getAllLoans
  public registerNewUser(User : User){
    return this.httpclient.post("http://localhost:8080/moviebooking/register",User,{responseType:'json', 
      headers: this.requestHeader,
    });
  }

  public addMovie(movie : Movie){
    return this.httpclient.post("http://localhost:8080/moviebooking/saveMovie",movie,{responseType:'json'
    });
  }

  public deleteMovie(moviename: string) {
    return this.httpclient.delete("http://localhost:8080/moviebooking/"+moviename+'/delete',{responseType:'json'
    });
  }

  public updateMovie(movieId: string, count: number) {
    return this.httpclient.get("http://localhost:8080/moviebooking/"+movieId+'/update/'+count,{responseType:'json'
    });
  }

  public bookMovie(movieId: string, count: number) {
    return this.httpclient.post("http://localhost:8080/moviebooking/"+movieId+'/add/'+count,{responseType:'json'
    });
  }

  public findMovieById(movieId: string) {
    return this.httpclient.get("http://localhost:8080/moviebooking/find/"+movieId,{responseType:'json'
    });
  }

  public showAllMovies(){
    return this.httpclient.get("http://localhost:8080/moviebooking/all",{responseType:'json'
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
