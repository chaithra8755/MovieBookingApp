import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from 'src/app/_services/user.service';
import { Loan } from '../Loan.model';




@Component({
  selector: 'app-loan',
  templateUrl: './list-movie.component.html',
  styles: [
  ]
})
export class ListMovieComponent implements OnInit {

  
  modify: boolean =false;
  loanNodisable:boolean=true;
  disableInput: boolean= true;
  selectedLoan: Loan;
  
  fnMeassge:string =null;
  vModify:string;

  movieid: string;
  moviename: string;
  movieMins: string;
  movieGenre: string;
  movieLanguage: string;
  movieDescription: string;
  movieRating: string;
  movieDate: Date;
  theatreName: string;
  showStartTime: any;
  showEndTime: any;

  movies: any[];

  datepipe: DatePipe = new DatePipe('en-US');

  constructor(private router: Router, private service : UserService) { }
  ngOnInit(): void { 
    this.vModify=localStorage.getItem('status');  
     console.log("Status="+this.vModify); 
     
     this.service.showAllMovies().subscribe((data:any)=>{
      console.log("fetching all movies-->")
      this.movies=data;
     })}

  

  removeMovie(moviename: string) {
    console.log(moviename);
    
    this.service.deleteMovie(moviename).subscribe((data:any) => {
      this.movies=data;
    })
  }
  bookMovie(id: string){
    this.router.navigate(['/book']);
    localStorage.setItem('id', id)
    console.log("movie id is",id)
  }
}

