package mg.mandrindra.restaurant.gestion_restaurant.service;

import mg.mandrindra.restaurant.gestion_restaurant.model.Table_resto;
import mg.mandrindra.restaurant.gestion_restaurant.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TableService {
    @Autowired
    private TableRepository tableRepository;
    @Autowired
    private JdbcTemplate requet;

    public String getTable(String table){
        String sql ="SELECT designation from Table_resto WHERE designation = ?";
        return "";
    }

    public List<Table_resto> getAllTables() {
        return tableRepository.findAll();
    }

    public Table_resto getTableById(Long id) {

        return tableRepository.findById(id).orElse(null);
    }

    public Table_resto createTable(Table_resto tableResto) {
        //Table_resto user = tableRepository.
        return tableRepository.save(tableResto);
    }

    public Table_resto updateTable(Long id, Table_resto userDetails) {
        Table_resto tableResto = tableRepository.findById(id).orElse(null);
        if (tableResto != null) {
            tableResto.setDesignation(userDetails.getDesignation());

            return tableRepository.save(tableResto);
        }
        return null;
    }

    public void deleteTable(Long id) {
        tableRepository.deleteById(id);
    }


}
