import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from 'src/app/_services/user.service';
import { Loan } from '../Loan.model';
import { Movie } from '../movie.model';




@Component({
  selector: 'app-loan',
  templateUrl: './update-movie.component.html',
  styles: [
  ]
})
export class UpdateMovieComponent implements OnInit {

  

  
  fnMeassge:string =null;
  vModify:string;

  movieid: string;
  movieName : string
  movie: Movie;
  noOfTicket:number
  movieDate: Date
  theatreName: string
  showStartTime: Date
  showEndTime:Date
  isUpdated : boolean;
  datepipe: DatePipe = new DatePipe('en-US');

  constructor(private router: Router, private service : UserService) { }
  ngOnInit(): void { 
    this.isUpdated=false
        this.movieid=localStorage.getItem('id');  
     console.log("Movie id is="+this.movieid); 
     
     this.service.findMovieById(this.movieid).subscribe((data:any)=>{
      console.log("fetching all movies-->")
      this.movie=data;
      this.noOfTicket=this.movie.numberofTickets
      this.movieName = this.movie.moviename;
      this.movieDate= this.movie.movieDate
      this.showStartTime= this.movie.showStartTime
      this.showEndTime= this.movie.showEndTime
      this.theatreName=this.movie.theatreName
      console.log(this.movie)
      console.log(this.noOfTicket)
     })
    }

  

  // removeMovie(moviename: string) {
  //   console.log(moviename);
    
  //   this.service.deleteMovie(moviename).subscribe((data:any) => {
  //     this.movies=data;
  //   })
  // }
  // updateTickets(noOfTicket: number){
  //   console.log("movie id is",this.movieid,"and tikt cnt is ",noOfTicket)
  // }
  updateTickets(){
    console.log("update button2", this.noOfTicket)
      this.service.updateMovie(this.movieid,this.noOfTicket).subscribe((data:any) => {
        this.isUpdated=true
    })
  }
}


