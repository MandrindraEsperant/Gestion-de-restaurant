package mg.mandrindra.restaurant.gestion_restaurant.service;

import com.example.PlatVenduDTO;
import mg.mandrindra.restaurant.gestion_restaurant.model.Reservation;
import mg.mandrindra.restaurant.gestion_restaurant.model.Vendu;
import mg.mandrindra.restaurant.gestion_restaurant.repository.VenduRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class VenduService {
    @Autowired
    private VenduRepository venduRepository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<PlatVenduDTO> getPlatsVendusByIdCom(String idCom) {
        return venduRepository.findPlatsVendusByIdCom(idCom);
    }

    public List<Map<String,Object>> findTop10Vendu(){
        String sql = "SELECT DISTINCT v.idplat, nomplat, SUM(qte) AS quantite FROM vendu v, menu m WHERE v.idplat = m.idplat GROUP BY idplat ORDER BY quantite DESC LIMIT 10";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String,Object>> recetteTotal(){
        String sql ="SELECT SUM(qte * pu) as recetteTotale from vendu as v , menu m WHERE m.idplat= v.idplat";
        return jdbcTemplate.queryForList(sql);
    }
    public List<Map<String, Object>> getVenduDetails() {
        String sql = "SELECT nomplat, pu, qte, Vendu.idcom FROM Vendu, Menu WHERE Vendu.idplat = Menu.idplat";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> getVenduDetailsSearch(String nomplat) {
        String sql = "SELECT nomplat, pu, qte, Vendu.idcom FROM Vendu, Menu WHERE Vendu.idplat = Menu.idplat AND nomplat LIKE ?";
        String param = "%" + nomplat + "%";
        return jdbcTemplate.queryForList(sql, new Object[]{param});
    }
    public List<Map<String, Object>> histogramme() {
        String sql = "SELECT DATE_FORMAT(commande.date,\"Y-%m\") as month ,sum(menu.pu) as recette FROM menu,vendu,commande WHERE menu.idplat = vendu.idplat AND commande.idcom=vendu.idcom AND commande.date >= DATE_SUB(CURDATE(),INTERVAL 5 MONTH) GROUP BY month ";
        return jdbcTemplate.queryForList(sql);
    }

}
