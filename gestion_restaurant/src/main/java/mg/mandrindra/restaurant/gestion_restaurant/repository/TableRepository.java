package mg.mandrindra.restaurant.gestion_restaurant.repository;

import mg.mandrindra.restaurant.gestion_restaurant.model.Table_resto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TableRepository extends JpaRepository<Table_resto,Long> {
    Optional<Table_resto> findByDesignation(String designation);
}