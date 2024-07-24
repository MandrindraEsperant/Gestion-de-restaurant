package mg.mandrindra.restaurant.gestion_restaurant.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Commande {
    @Id
    private String idcom;
    private String tableName;
    private String nomcli;
    private String typecom;
    private LocalDateTime date;

    public Commande() {
    }

    public String getTableName() {
        return tableName;
    }

    public String getIdcom() {
        return idcom;
    }

    public void setIdcom(String idcom) {
        this.idcom = idcom;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

   /* public Long getIdplat() {
        return idplat;
    }

    public void setIdplat(Long idplat) {
        this.idplat = idplat;
    }

    */

    public String getNomcli() {
        return nomcli;
    }

    public void setNomcli(String nomcli) {
        this.nomcli = nomcli;
    }

    public String getTypecom() {
        return typecom;
    }

    public void setTypecom(String typecom) {
        this.typecom = typecom;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
