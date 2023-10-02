package com.moviebookingapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "movie")
@DynamicUpdate
@Getter
@Setter
public class Movie {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    private String movieid;
    @NotNull
    private String moviename;
    @NotNull
    private String movieGenre;
    @NotNull
    private String movieMins;
    @NotNull
    private String movieLanguage;@JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate movieDate;

//    public Movie(String movieid,String moviename, String movieGenre, String movieMins, String movieLanguage, String movieDescription, String movieRating, String theatreName, LocalDate movieDate
//    ,LocalDateTime showStartTime, LocalDateTime showEndTime) {
//
//        this.movieid=movieid;
//        this.moviename = moviename;
//        this.movieGenre = movieGenre;
//        this.movieMins = movieMins;
//        this.movieLanguage = movieLanguage;
//        this.movieDescription = movieDescription;
//        this.movieRating = movieRating;
//        this.theatreName = theatreName;
//        this.movieDate=movieDate;
//        this.showStartTime=showStartTime;
//        this.showEndTime=showEndTime;
//    }

    public Movie(String movieid,String moviename, String movieGenre, String movieMins, String movieLanguage, String movieDescription, String movieRating, String theatreName, LocalDate movieDate
            ,LocalDateTime showStartTime, LocalDateTime showEndTime) {

        this.movieid=movieid;
        this.moviename = moviename;
        this.movieGenre = movieGenre;
        this.movieMins = movieMins;
        this.movieLanguage = movieLanguage;
        this.movieDescription = movieDescription;
        this.movieRating = movieRating;
        this.theatreName = theatreName;
        this.movieDate=movieDate;
        this.showStartTime=showStartTime;
        this.showEndTime=showEndTime;
    }

    @NotNull
    private String movieDescription;
    @NotNull
    private String movieRating;

    @NotNull
    private String theatreName;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime showStartTime;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime showEndTime;


//    @OneToMany(mappedBy = "movie", fetch = FetchType.LAZY,
//            cascade = CascadeType.MERGE)
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "moviename", referencedColumnName = "moviename",insertable=false, updatable=false)

    private Tickets ticket;


}
