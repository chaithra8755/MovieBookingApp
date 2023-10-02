package com.moviebookingapp.service;

import com.moviebookingapp.dao.MovieDao;
import com.moviebookingapp.dao.TicketsDao;
import com.moviebookingapp.dto.MovieSaveDTO;
import com.moviebookingapp.entity.Movie;
import com.moviebookingapp.entity.Tickets;
import com.moviebookingapp.exception.CustomEcxeption;
import com.moviebookingapp.exception.UsernameAlreadyExists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class MovieService {

    private String STATUS;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MovieDao movieDao;

    @Autowired
    private TicketsDao ticketsDao;

    Logger logger = LoggerFactory.getLogger(MovieService.class);

    public void deleteMovie(String moviename) throws CustomEcxeption {
        logger.info("Entering deleteMovie method");
        if(checkMovieAvailibility(moviename)){
            logger.info("movieName is present in the database");
            movieDao.deleteByMoviename(moviename);
            logger.info("deletion successful");
            logger.info("exiting deleteMovie");
        }else{
            logger.error("movieName is not present in Movie table");
            throw new CustomEcxeption("Movie doesn't exist");
        }
    }

    public MovieSaveDTO findByMovieId(String mid){
        Movie m = movieDao.findById(mid).get();
        MovieSaveDTO movie = new MovieSaveDTO();
        movie.setMovieDate(m.getMovieDate());
        movie.setMovieGenre(m.getMovieGenre());
        movie.setMoviename(m.getMoviename());
        movie.setMovieRating(m.getMovieRating());
        movie.setTheatreName(m.getTicket().getTheatreName());
        movie.setMovieDescription(m.getMovieDescription());
        movie.setNumberofTickets(m.getTicket().getNumberofTickets());
        movie.setShowStartTime(m.getShowStartTime());
        movie.setShowEndTime(m.getShowEndTime());
        movie.setSeatNumbers(m.getTicket().getSeatNumbers());
        movie.setMovieLanguage(m.getMovieLanguage());
        return movie;
    }

    public Movie saveMovie(MovieSaveDTO mtd) throws  CustomEcxeption {
        logger.info("Entering saveMovie");
        if(mtd.getNumberofTickets()>0){
            STATUS="BOOK ASAP";
        }else {
            STATUS = "SOLD OUT";
        }

        LocalDateTime start = mtd.getShowStartTime();
        LocalDateTime end = mtd.getShowEndTime();

        if(end.isBefore(start)){
            logger.info("--There is issue with the Date--");
            throw new CustomEcxeption("End time is ill");
        }

        LocalDate dateStart = start.toLocalDate();
        LocalDate dateEnd = end.toLocalDate();
        LocalDate showDate = mtd.getMovieDate();
        if((dateStart.equals(showDate)) &&
                (showDate.equals(dateEnd)) &&
                    (dateStart.equals(dateEnd))){

            List <Movie> movieCheck = movieDao.findByMoviename(mtd.getMoviename());
            if(movieCheck.size()==1) {
                if(mtd.getShowStartTime().equals(movieCheck.get(0).getShowStartTime()) &&
                        mtd.getTheatreName().equals(movieCheck.get(0).getTheatreName())){
                    logger.info("Movie is already present at this time in "+mtd.getTheatreName()+" theatre");
                    return new Movie();
                }
            }
            LocalDateTime tempDateTime = LocalDateTime.from( start );
            String duration = String.valueOf(tempDateTime.until( end, ChronoUnit.MINUTES ));

            Tickets t = new Tickets(UUID.randomUUID().toString(),
                    mtd.getMoviename(),
                    mtd.getTheatreName(),
                    mtd.getNumberofTickets(),
                   0,STATUS
            );
            //Tickets t = new Tickets();


            Movie m = new Movie(
                    UUID.randomUUID().toString(),
                    mtd.getMoviename(),
                    mtd.getMovieGenre(),
                    duration,
                    mtd.getMovieLanguage(),
                    mtd.getMovieDescription(),
                    mtd.getMovieRating(),
                    mtd.getTheatreName(),
                    mtd.getMovieDate(),
                    mtd.getShowStartTime(),
                    mtd.getShowEndTime()
            );
            m.setTicket(t);
            movieDao.save(m);
            ticketsDao.save(t);

            logger.info("Movie saved into Movie table. Exitting saveMovie method");
            return m;

        }

       return new Movie();
    }
    public List<Movie> finAllMovies() {
        logger.info("Executing findAllMovies Method");
        return movieDao.findAll();
    }

    public List<Movie> findByMoviename(String moviename)throws CustomEcxeption {
        logger.info("Executing findByMoviename Method");
        return movieDao.findByMoviename(moviename);
    }

    public boolean checkMovieAvailibility(String moviename){
        List<Movie> movies = movieDao.findAll();
        boolean ifExist=false;
        for(Movie m : movies){
            if(m.getMoviename().equals(moviename)){
                ifExist=true;
                break;
            }
        }
        return ifExist;
    }

}
