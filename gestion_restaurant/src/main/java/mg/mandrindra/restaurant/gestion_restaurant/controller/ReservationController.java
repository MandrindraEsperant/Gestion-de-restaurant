package mg.mandrindra.restaurant.gestion_restaurant.controller;

import mg.mandrindra.restaurant.gestion_restaurant.model.DateRange;
import mg.mandrindra.restaurant.gestion_restaurant.model.NomSearch;
import mg.mandrindra.restaurant.gestion_restaurant.model.Reservation;
import mg.mandrindra.restaurant.gestion_restaurant.repository.ReservationRepository;
import mg.mandrindra.restaurant.gestion_restaurant.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reservation")
public class ReservationController {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/rechercheEntre2Date")
    public List<Map<String,Object>> rechercheEntre2Date(@RequestBody DateRange dateRange){
      return reservationService.rechercheEntre2Date(dateRange.getStartDate(),dateRange.getEndDate());
    }

    @GetMapping("/rechercheClient")
    public List<Reservation> rechercheClient(@RequestParam String nomClient){
        return reservationService.rechercheClient(nomClient);
    }

    @GetMapping("/")
    public List<Reservation> getAllReservations(){
        return reservationRepository.findAll();
    }
    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable Long id){
        return reservationRepository.findById(id).orElse(null);
    }
    @PostMapping("/")
    public String createReservation(@RequestBody Reservation reservation){

        if(reservationRepository.existsByDateReserverAndTableName(
               reservation.getDateReserver(),reservation.getTableName()
        )){
            return "Déjà existé";
        }else {
            Reservation aAjouter = new Reservation();
            aAjouter.setTableName(reservation.getTableName());
            aAjouter.setNomcli(reservation.getNomcli());
            aAjouter.setDateReserver(reservation.getDateReserver());
            aAjouter.setDate_de_reservation(LocalDateTime.now());


            reservationRepository.save(aAjouter);
            return "ok";
        }

    }
    @PutMapping("/{id}")
    public String updateReservation(@PathVariable Long id, @RequestBody Reservation userDetails) {
        if(reservationRepository.existsByDateReserverAndTableName(
                userDetails.getDateReserver(),userDetails.getTableName()
        )){
            return "Déjà existé";
        }else {
            Reservation reservation = reservationRepository.findById(id).orElse(null);
            if (reservation != null) {
                reservation.setNomcli(userDetails.getNomcli());
                reservation.setDate_de_reservation(userDetails.getDate_de_reservation());
                reservation.setDateReserver(userDetails.getDateReserver());
                reservation.setTableName(userDetails.getTableName());
                reservationRepository.save(reservation);
                return "ok";
            }
            return "Reservation non trouvé";
        }

    }
    @DeleteMapping("/{id}")
    public String deleteReservation(@PathVariable Long id){
        reservationRepository.deleteById(id);
        return "Reservation supprimmé";
    }

}
