package mg.mandrindra.restaurant.gestion_restaurant.service;

import mg.mandrindra.restaurant.gestion_restaurant.model.Menu;
import mg.mandrindra.restaurant.gestion_restaurant.model.Table_resto;
import mg.mandrindra.restaurant.gestion_restaurant.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    @Autowired
    private MenuRepository menuRepository;

    public List<Menu> getAllMenus() {

        return menuRepository.findAll();
    }

    public Menu getMenuById(Long id) {

        return menuRepository.findById(id).orElse(null);
    }

    public Menu createMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu updateMenu(Long id, Menu userDetails) {
        Menu menu = menuRepository.findById(id).orElse(null);
        if (menu != null) {
            menu.setNomplat(userDetails.getNomplat());
            menu.setPu(userDetails.getPu());

            return menuRepository.save(menu);
        }
        return null;
    }

    public void deleteMenu(Long id) {

        menuRepository.deleteById(id);
    }

}
