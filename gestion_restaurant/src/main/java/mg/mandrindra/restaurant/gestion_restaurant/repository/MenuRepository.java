package mg.mandrindra.restaurant.gestion_restaurant.repository;

import mg.mandrindra.restaurant.gestion_restaurant.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu,Long> {
}
