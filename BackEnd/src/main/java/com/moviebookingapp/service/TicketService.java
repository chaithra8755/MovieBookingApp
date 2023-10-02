package com.moviebookingapp.service;

import com.moviebookingapp.dao.MovieDao;
import com.moviebookingapp.dao.TicketsDao;
import com.moviebookingapp.dto.BookingDto;
import com.moviebookingapp.entity.Movie;
import com.moviebookingapp.entity.Tickets;
import com.moviebookingapp.exception.CustomEcxeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
//import static com.moviebookingapp.service.MovieService;

@Service
@Transactional
public class TicketService {


    @Autowired
    private TicketsDao ticketsDao;

    @Autowired
    private MovieDao movieDao;

    @Autowired
    private MovieService movieService;
//    public int bookTickets(String movieid, int tkt) throws CustomEcxeption {
//        if(checkMovieAvailibility(moviename)){
//            Tickets avlblTkts = ticketsDao.findById(moviename).get();
//            if(checkTicket(avlblTkts.getNumberofTickets())){
//                avlblTkts.setNumberofTickets(avlblTkts.getNumberofTickets()-1);
//                avlblTkts.setSeatNumbers(avlblTkts.getSeatNumbers()+1);
//                if(avlblTkts.getNumberofTickets()==0){
//                    avlblTkts.setTicketStatus("SOLD OUT");
//                    ticketsDao.save(avlblTkts);
//                    return 0;
//                }
//                ticketsDao.save(avlblTkts);
//                }else{
//                avlblTkts.setTicketStatus("SOLD OUT");
//                ticketsDao.save(avlblTkts);
//                //throw new CustomEcxeption("Tickets Sold Out");
//                return 0;
//            }
//            return 1;
//        }else{
//            return -1;
//        }
//
//    }

    public int bookTickets(String movieid, int tkt) throws CustomEcxeption {
        if(checkMovieAvailibility(movieid)){
            Tickets avlblTkts = movieDao.findById(movieid).get().getTicket();
            if(checkTicket(avlblTkts.getNumberofTickets(), tkt)){
                avlblTkts.setNumberofTickets(avlblTkts.getNumberofTickets()-tkt); //chcked
                int seatStart = 0; // 1 +3
                int seatEnd =0;
                if(avlblTkts.getSeatNumbers()==1){
                   seatStart = avlblTkts.getSeatNumbers(); // 1 +3
                    seatEnd = seatStart+tkt-1; //chcked 3
                }else{
                    seatStart = avlblTkts.getSeatNumbers()+1; // 1 +3
                    seatEnd = seatStart+tkt-1; //chcked 3
                }

                avlblTkts.setSeatNumbers(seatEnd);
                if(avlblTkts.getNumberofTickets()==0){
                    avlblTkts.setTicketStatus("SOLD OUT");
                    ticketsDao.save(avlblTkts);
                    System.out.println("Seats from "+seatStart+" to "+seatEnd);
                    return 0;
                }
                System.out.println("Seats from "+seatStart+" to "+seatEnd);
                ticketsDao.save(avlblTkts);
            }else{
                avlblTkts.setTicketStatus("SOLD OUT");
                System.out.println("Not enough seats ");
                ticketsDao.save(avlblTkts);
                //throw new CustomEcxeption("Tickets Sold Out");
                return 0;
            }
            return 1;
        }else{
            return -1;
        }

    }
    public static boolean checkTicket(int avlblTickets, int tktReq){
        if(tktReq>avlblTickets){
            return false;
        }else{
            return true;
        }
    }

    public boolean checkMovieAvailibility(String movieId){
        Movie movie = movieDao.findById(movieId).get();
        if(Objects.nonNull(movie)){
            return true;
        }
        return false;
    }

    public Movie updateTickets(String movieId, int ticketNo) throws CustomEcxeption {
        if(checkMovieAvailibility(movieId) && ticketNo>0){
            Movie movie = movieDao.findById(movieId).get();
            Tickets ticket = movie.getTicket();
            ticket.setNumberofTickets(ticketNo);
            ticketsDao.save(ticket);
            movieDao.save(movie);
            return movie;

        }else{
            throw new CustomEcxeption("Movie does not exist or ticket no is <0");
        }
    }

    public BookingDto bookTicketsFormed(String movieid, int tkt) throws CustomEcxeption {
        BookingDto booking = new BookingDto();
        String resp="";
        int seatStart = 0; // 1 +3
        int seatEnd =0;
        if(checkMovieAvailibility(movieid)){
            Movie avlblMovie = movieDao.findById(movieid).get();
            Tickets avlblTkts = avlblMovie.getTicket();
            if(checkTicket(avlblTkts.getNumberofTickets(), tkt)){
                avlblTkts.setNumberofTickets(avlblTkts.getNumberofTickets()-tkt); //chcked

                if(avlblTkts.getNumberofTickets()==1){
                    seatStart = avlblTkts.getSeatNumbers(); // 1 +3
                    seatEnd = seatStart+tkt-1;
                }else{
                    seatStart = avlblTkts.getSeatNumbers()+1; // 1 +3
                    seatEnd = seatStart+tkt-1; //chcked 3
                }


                avlblTkts.setSeatNumbers(seatEnd);
                if(avlblTkts.getNumberofTickets()==0){
                    avlblTkts.setTicketStatus("SOLD OUT");
                    ticketsDao.save(avlblTkts);
                    resp= "Seats from "+seatStart+" to "+seatEnd+" has been booked." +
                            "theatre name: "+avlblMovie.getTheatreName()+" on "+avlblMovie.getShowStartTime();
                    booking.setBookingInfo(resp);
                    return booking;
                }
                System.out.println("Seats from "+seatStart+" to "+seatEnd);
                ticketsDao.save(avlblTkts);
                }else{
                if(avlblTkts.getNumberofTickets()==0){
                    avlblTkts.setTicketStatus("SOLD OUT");
                }
                    System.out.println("Not enough seats ");
                    ticketsDao.save(avlblTkts);
                    //throw new CustomEcxeption("Tickets Sold Out");
                resp = "Not enough seats, avlbl tkts "+avlblTkts.getNumberofTickets();
                booking.setBookingInfo(resp);
                    return booking;
                }
            System.out.println(booking);
            resp= "Seats from "+seatStart+" to "+seatEnd+" has been booked." +
                    "theatre name: "+avlblMovie.getTheatreName()+" on "+avlblMovie.getShowStartTime();
            booking.setBookingInfo(resp);
            return booking;
        }else{
            resp = "No Movie by that Id is available";
            booking.setBookingInfo(resp);
            return booking;
        }

    }
}
