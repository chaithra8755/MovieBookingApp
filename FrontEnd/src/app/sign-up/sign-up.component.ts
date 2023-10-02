import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from './User.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userLastName: string;
  userFirstName: string;
  email: string
  password: string
  confirmPassword: string
  contactNumber: string
  userName: string;
  invdata = false;
  registerd=false;
  invPass = false;
  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {
    this.invdata = false;
    this.invPass = false;
  }
  ngOnChanges(changes: SimpleChanges){
    // this.invdata = false;
    // this.invPass = false;
    console.log(changes)
  }
  // ngDoCheck(changes: SimpleChanges) {
  //   // this.invdata = false;
  //   // this.invPass = false;
  //   console.log('ngDoCheck called!');
  // }

  // ngAfterContentChecked() {
  //   this.invdata = false;
  //   //this.invPass = false;
  //   console.log('ngAfterContentChecked called!');
  // }

  saveUser() {
    let obj = new User(this.userName, this.password, 
    this.userFirstName, this.userLastName, this.email, this.confirmPassword,this.contactNumber)
    if (obj.firstName == null || obj.lastName == null || obj.password == null || obj.confirmPassword == null
      || obj.email == null || obj.contactNumber == null)
        {
          this.invdata=true
          console.log(this.invdata)
        }else{
          console.log(obj)
          console.log('registering data---->')
          this.registerd=true
        this.service.registerNewUser(obj).subscribe((data) => {
                console.log(data)
              })

        }
    //this.checkPass(this.userPassword);
    
  //   if (obj.userName == null || obj.userPassword == null || obj.userFirstName == null || obj.userFirstName == null) {
  //     this.invdata = true;
  //   } else if(this.checkPass(this.userPassword)) {
  //     this.service.registerNewUser(obj).subscribe((data) => {
  //       console.log(data)
  //     })
  //     this.router.navigate(['login']);
  //   }else if(!this.checkPass(this.userPassword))
  //   {
  //     this.invPass = true;
  //   }

  // }
  // checkPass(userPassword: string) {
  //   var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;
  //   if (userPassword.match(passw)) {
  //     console.log('Correct, try another...')
  //     return true
  //   }else{
  //     console.log('wrong')
  //     return false
  //   }
  }



  homeNavigate() {
    this.router.navigate(['login']);
  }

  clearFields() {
        this.invdata = false;
    this.invPass = false;
    this.userName = null;
    this.userFirstName = null;
    this.userLastName = null;
    this.password = null;

  }




}
