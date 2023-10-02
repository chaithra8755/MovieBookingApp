import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from 'src/app/_services/user.service';
import { Loan } from '../Loan.model';
import { Movie } from '../movie.model';



@Component({
  selector: 'app-loan',
  templateUrl: './movie.component.html',
  styles: [
  ]
})
export class MovieComponent implements OnInit {

  
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
  numberofTickets: number;

  datepipe: DatePipe = new DatePipe('en-US');

  constructor(private router: Router, private service : UserService) { }
  saveMovie(){
    if(this.moviename===null|| this.movieMins===null||this.movieGenre===null|| 
      this.movieLanguage===null ||this.movieDescription===null|| this.movieRating==null 
      || this.showEndTime===null ||this.showStartTime===null|| this.theatreName==null || this.movieDate===null ){
      console.log("Please insert data");
      this.fnMeassge='Please fill the blanks..!';
      

  }
  else{
        this.showStartTime = this.datepipe.transform(
          this.showStartTime,
          'yyyy-MM-dd HH:mm'
        );
        this.showEndTime = this.datepipe.transform(
          this.showStartTime,
          'yyyy-MM-dd HH:mm'
        );
        let obj=new Movie( this.moviename, this.movieMins,this.movieGenre, this.movieLanguage, this.movieDescription, this.movieRating,
          this.movieDate, this.theatreName, this.showStartTime, this.showEndTime,this.numberofTickets);
        console.log(obj)
        console.log(this.showStartTime)
      // this.loanService.addOrModifyLoan(obj);
      this.service.addMovie(obj).subscribe((data)=>{
        console.log(data)
      })  
      this.fnMeassge='Details has been saved..!';
  }
}

  ngOnInit(): void {    

    this.fnMeassge=null;

    this.vModify=localStorage.getItem('status');  
     console.log("Status="+this.vModify);
     localStorage.removeItem ('status');
  }

  homeNavigate(){
    this.router.navigate(['admin']);
  }

}
