package mg.mandrindra.restaurant.gestion_restaurant.controller;

import mg.mandrindra.restaurant.gestion_restaurant.model.Menu;
import mg.mandrindra.restaurant.gestion_restaurant.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @GetMapping("/")
    public List<Menu> getAllMenu(){
        return menuService.getAllMenus();
    }
    @GetMapping("/{id}")
    public Menu getMenuById(@PathVariable Long id){
        return menuService.getMenuById(id);
    }

    @PostMapping("/")
    public String createMenu(@RequestBody Menu menu){
         menuService.createMenu(menu);
         return "ajouté";

    }

    @PutMapping("/{id}")
    public Menu updateMenu(@PathVariable Long id, @RequestBody Menu userDetails) {
        return menuService.updateMenu(id, userDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
    }
}

