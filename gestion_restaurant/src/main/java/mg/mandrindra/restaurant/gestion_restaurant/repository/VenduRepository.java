package mg.mandrindra.restaurant.gestion_restaurant.repository;

import com.example.PlatVenduDTO;
import mg.mandrindra.restaurant.gestion_restaurant.model.Vendu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VenduRepository extends JpaRepository<Vendu,Integer> {
    @Query("SELECT new com.example.PlatVenduDTO(m.nomplat, m.pu, v.qte) " +
            "FROM Vendu v, Menu m " +
            "WHERE v.idplat = m.idplat AND v.idcom = :idCom")
    List<PlatVenduDTO> findPlatsVendusByIdCom(@Param("idCom") String idCom);



}
