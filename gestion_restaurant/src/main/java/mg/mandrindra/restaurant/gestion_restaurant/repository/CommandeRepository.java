package mg.mandrindra.restaurant.gestion_restaurant.repository;

import mg.mandrindra.restaurant.gestion_restaurant.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande,String> {
}
