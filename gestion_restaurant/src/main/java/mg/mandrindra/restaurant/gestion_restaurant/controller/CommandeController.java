package mg.mandrindra.restaurant.gestion_restaurant.controller;

import mg.mandrindra.restaurant.gestion_restaurant.model.Commande;
import mg.mandrindra.restaurant.gestion_restaurant.repository.CommandeRepository;
import mg.mandrindra.restaurant.gestion_restaurant.service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/commande")
public class CommandeController {
    @Autowired
    private CommandeRepository repository;

    @Autowired
    private CommandeService commandeService;

    @GetMapping("/getCommandeSearch")
    public List<Map<String ,Object>> getCommandeSearch(@RequestParam String nom){
        return commandeService.getCommandeSearch(nom);
    }

    @GetMapping("/")
    public List<Commande> getAllCommande(){
        return repository.findAll();
    }
    @GetMapping("/{id}")
    public Commande getCommandeById(@PathVariable String id){
        return repository.findById(id).orElse(null);
    }

    @PostMapping("/")
    public String createCommande(@RequestBody Commande commande){
        Commande com= new Commande();

        com.setIdcom(commande.getIdcom());
        com.setNomcli(commande.getNomcli());
        com.setDate(LocalDateTime.now());
        com.setTypecom(commande.getTypecom());
        com.setTableName(commande.getTableName());

        repository.save(com);

        return "Commande ajouté";

    }

    @PutMapping("/{id}")
    public String updateCommande(@PathVariable String id, @RequestBody Commande userDetails) {
        Commande commande = repository.findById(id).orElse(null);
        if (commande != null) {
            commande.setTableName(userDetails.getTableName());
            commande.setDate(userDetails.getDate());
            commande.setNomcli(userDetails.getNomcli());
            commande.setTypecom(userDetails.getTypecom());
            //commande.setIdplat(userDetails.getIdplat());

            repository.save(commande);
            return "Commande modifié";
        }
        return "Commande non trouvé";
    }

    @DeleteMapping("/{id}")
    public String deleteCommande(@PathVariable String id) {
        repository.deleteById(id);
        return "Commande supprimé";
    }
}
