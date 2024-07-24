package mg.mandrindra.restaurant.gestion_restaurant.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Entity

public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idReservation;
    @Column
  private String tableName;
    @Column
  private LocalDate dateReserver;

    @Column
  private LocalDateTime date_de_reservation;
    @Column
  private String nomcli;

    public Reservation() {
    }

    public LocalDateTime getDate_de_reservation() {
        return date_de_reservation;
    }

    public void setDate_de_reservation(LocalDateTime date_de_reservation) {
        this.date_de_reservation = date_de_reservation;
    }

    public Long getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Long idReservation) {
        this.idReservation = idReservation;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public LocalDate getDateReserver() {
        return dateReserver;
    }

    public void setDateReserver(LocalDate dateReserver) {
        this.dateReserver = dateReserver;
    }

    public String getNomcli() {
        return nomcli;
    }

    public void setNomcli(String nomcli) {
        this.nomcli = nomcli;
    }
}
