import { EnumCategorieComposant } from "./EnumCategorieComposant";
import type { ITypeComposant } from "./ITypeComposant";

export class DerailleurArriere implements ITypeComposant{
  nom = 'Dérailleur arrière'
  categorie = EnumCategorieComposant.TRANSMISSION
  /**
   * Type de chape (valeur parmi "Courte"|"Moyenne"|"Longue")
   */
  chape?: "Courte"|"Moyenne"|"Longue"
  /**
   * Le nombre de vitesses prévues pour le dérailleur arrière
   */
  nombreVitesses?: number
  toString(): string {
    return `${this.nombreVitesses} vitesses à chape ${this.chape}`
  }
  
}