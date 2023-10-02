import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from '../user/Loan.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  name : string
  ngOnInit(): void {
    this.name = localStorage.getItem('loggedUser'); 
    console.log(this.name)
  }

  

}
