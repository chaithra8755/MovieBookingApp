import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Loan } from './Loan.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  name : string
  ngOnInit(): void {
    this.name = localStorage.getItem('loggedUser'); 
    console.log(this.name)
  }


}
