package mg.mandrindra.restaurant.gestion_restaurant.controller;

import mg.mandrindra.restaurant.gestion_restaurant.model.Table_resto;
import mg.mandrindra.restaurant.gestion_restaurant.repository.TableRepository;
import mg.mandrindra.restaurant.gestion_restaurant.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/table")
public class TableController {
    @Autowired
    private TableService tableService;
    @Autowired
    TableRepository repository;

    @GetMapping("/")
    public List<Table_resto> getAllTables() {
        return tableService.getAllTables();
    }

    @GetMapping("/{id}")
    public Table_resto getTableById(@PathVariable Long id) {
        return tableService.getTableById(id);
    }

    @PostMapping("/")
    public String createTable(@RequestBody Table_resto tableResto){
        if (repository.findByDesignation(tableResto.getDesignation()).isPresent()){
            return "déjà existé";
        }else {
            tableService.createTable(tableResto);
            return "ok";
        }


    }

    @PutMapping("/{id}")
    public String updateTable(@PathVariable Long id, @RequestBody Table_resto userDetails) {
        if (repository.findByDesignation(userDetails.getDesignation()).isPresent()){
            return "déjà existé";
        }else{
            tableService.updateTable(id, userDetails);
            return "ok";
        }
    }

    @DeleteMapping("/{id}")
    public void deleteTable(@PathVariable Long id) {
        tableService.deleteTable(id);
    }
}
