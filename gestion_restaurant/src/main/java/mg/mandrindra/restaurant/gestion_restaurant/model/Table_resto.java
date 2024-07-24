package mg.mandrindra.restaurant.gestion_restaurant.model;

import jakarta.persistence.*;

@Entity
public class Table_resto {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long idtable;

   @Column(unique = true,nullable = false)
   private String designation;

   public Table_resto() {
   }

   public Long getIdtable() {
      return idtable;
   }

   public void setIdtable(Long idtable) {
      this.idtable = idtable;
   }

   public String getDesignation() {
      return designation;
   }

   public void setDesignation(String designation) {
      this.designation = designation;
   }
}
