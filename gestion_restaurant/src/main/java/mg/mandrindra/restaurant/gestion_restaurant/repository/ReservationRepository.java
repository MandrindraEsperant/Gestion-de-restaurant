package mg.mandrindra.restaurant.gestion_restaurant.repository;

import mg.mandrindra.restaurant.gestion_restaurant.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Long> {

    boolean existsByDateReserverAndTableName(
            LocalDate dateReserver, String tableName);

}
