package mg.mandrindra.restaurant.gestion_restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CommandeService {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getCommandeSearch(String nom) {
        String sql = "SELECT * FROM `commande` WHERE nomcli LIKE ?";
        String param = "%" + nom + "%";
        return jdbcTemplate.queryForList(sql, new Object[]{param});
    }
}
