package com.example;

public class PlatVenduDTO {
    private String nomPlat;
    private double pu;
    private int qte;

    public PlatVenduDTO(String nomPlat, double pu, int qte) {
        this.nomPlat = nomPlat;
        this.pu = pu;
        this.qte = qte;
    }

    public String getNomPlat() {
        return nomPlat;
    }

    public void setNomPlat(String nomPlat) {
        this.nomPlat = nomPlat;
    }

    public double getPu() {
        return pu;
    }

    public void setPu(double pu) {
        this.pu = pu;
    }

    public int getQte() {
        return qte;
    }

    public void setQte(int qte) {
        this.qte = qte;
    }
}
