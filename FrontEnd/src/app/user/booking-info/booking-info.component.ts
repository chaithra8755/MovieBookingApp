import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from 'src/app/_services/user.service';
import { Loan } from '../Loan.model';
import { Movie } from '../movie.model';




@Component({
  selector: 'app-loan',
  templateUrl: './booking-info.component.html',
  styles: [
  ]
})
export class BookingInfoomponent implements OnInit {
  msg: string

  constructor(private router: Router) { }
  ngOnInit(): void { 
    this.msg = localStorage.getItem('bookingInfo'); 
    }

}


