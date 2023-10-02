export class Movie{
   // public movieid: string;
    public moviename: string;
    public movieMins: string;
    public movieGenre: string;
    public movieLanguage: string;
    public movieDescription: string;
    public movieRating: string;
    public movieDate: Date;
    public theatreName: string;
    public showStartTime: Date;
    public showEndTime: Date;
    public numberofTickets: number

   constructor (moviename: string,movieMins: string,
    movieGenre : string,movieLanguage: string,
    movieDescription: string,movieRating : string, movieDate: Date, theatreName: string,
    showStartTime: Date, showEndTime:Date, numberofTickets: number
    ){
                    //this.movieid=movieid;
                    this.moviename=moviename;
                    this.movieMins=movieMins;
                    this.movieGenre=movieGenre;
                    this.movieLanguage=movieLanguage;
                    this.movieDescription=movieDescription
                    this.movieRating=movieRating;
                    this.movieDate=movieDate;
                    this.theatreName=theatreName;
                    this.showStartTime=showStartTime;
                    this.showEndTime=showEndTime;
                    this.numberofTickets=numberofTickets
                }
}