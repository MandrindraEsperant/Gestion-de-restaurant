package mg.mandrindra.restaurant.gestion_restaurant.service;

import mg.mandrindra.restaurant.gestion_restaurant.model.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class ReservationService {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Map<String,Object>> rechercheEntre2Date(LocalDate d1,LocalDate d2){
        String sql ="SELECT * FROM `reservation` WHERE date_reserver BETWEEN ? AND ?";
        return jdbcTemplate.queryForList(sql,d1,d2);
    }
    public List<Reservation> rechercheClient(String nom){
        String sql = "SELECT * FROM reservation WHERE nomcli LIKE ?";
        return jdbcTemplate.query(sql, new Object[]{"%" + nom + "%"}, new BeanPropertyRowMapper<>(Reservation.class));
    }

}
