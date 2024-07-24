package mg.mandrindra.restaurant.gestion_restaurant.controller;

import com.example.PlatVenduDTO;
import mg.mandrindra.restaurant.gestion_restaurant.model.Vendu;
import mg.mandrindra.restaurant.gestion_restaurant.repository.VenduRepository;
import mg.mandrindra.restaurant.gestion_restaurant.service.VenduService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vendu")
public class VenduController {
    @Autowired
    private VenduRepository venduRepository;

    @Autowired
    private VenduService venduService;

    @GetMapping("/top10vendus")
    public List<Map<String, Object>> getTop10Vendus() {
        return venduService.findTop10Vendu();
    }

    @GetMapping("/recetteTotale")
    public List<Map<String,Object>> recetteTotal(){
        return venduService.recetteTotal();
    }
    @GetMapping("/getVenduDetails")
    public List<Map<String,Object>> getVenduDetails(){
        return venduService.getVenduDetails();
    }

    @GetMapping("/getVenduDetailsSearch")
    public List<Map<String, Object>> getVenduDetailsSearch(@RequestParam String nomplat) {
        return venduService.getVenduDetailsSearch(nomplat);
    }

    @GetMapping("/histogramme")
    public List<Map<String, Object>> histogramme(){
        return venduService.histogramme();
    }

    @GetMapping("/{idCom}")
    public List<PlatVenduDTO> getPlatsVendus(@PathVariable String idCom) {
        return venduService.getPlatsVendusByIdCom(idCom);
    }

    @GetMapping("/")
    public List<Vendu> getAllVendus(){
        return venduRepository.findAll();
    }

    @PostMapping("/")
    public Vendu createVendu(@RequestBody Vendu vendu){
       return venduRepository.save(vendu);
    }
}
