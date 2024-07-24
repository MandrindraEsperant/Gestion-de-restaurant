package mg.mandrindra.restaurant.gestion_restaurant.model;

import jakarta.persistence.*;

@Entity
public class Vendu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idvente;
    @Column(nullable = false)
    private String idcom;
    @Column(nullable = false)
    private Long idplat;
    @Column(nullable = false)
    private int qte;

    public Vendu() {
    }

    public int getIdvente() {
        return idvente;
    }

    public void setIdvente(int idvente) {
        this.idvente = idvente;
    }

    public String getIdcom() {
        return idcom;
    }

    public void setIdcom(String idcom) {
        this.idcom = idcom;
    }

    public Long getIdplat() {
        return idplat;
    }

    public void setIdplat(Long idplat) {
        this.idplat = idplat;
    }

    public int getQte() {
        return qte;
    }

    public void setQte(int qte) {
        this.qte = qte;
    }
}
