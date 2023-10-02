import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
    invalidUser = false
    loading = false
  addNewUser(){
    this.router.navigate(['/addNewUser']);
  }

  login(loginForm: NgForm) {
    this.loading = true;
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        console.log(role)
        if (role === 'Admin') {
          console.log(this.invalidUser)
          this.loading = false;
          console.log('Admin logged in',response.user)
          localStorage.setItem('loggedUser', response.user.userName);  
          this.router.navigate(['/admin']);
        } else if(role === 'User'){
          this.loading = false;
          localStorage.setItem('loggedUser', response.user.userName); 
          this.router.navigate(['/user']);console.log(this.invalidUser)
        }else if(role == null){
          this.invalidUser = true;console.log(this.invalidUser)
          this.router.navigate(['/login']);
        }
      }
      ,(error) => {
        this.invalidUser=true;
        console.log(this.invalidUser);
        console.log('Improper Creds')
      }
    );
  }
}
