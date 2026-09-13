import { EnumCategorieComposant } from "./EnumCategorieComposant";
import type { ITypeComposant } from "./ITypeComposant";

export class DerailleurAvant implements ITypeComposant{
  nom = 'Dérailleur avant'
  categorie = EnumCategorieComposant.TRANSMISSION
  /**
   * Le nombre de vitesses prévues pour le dérailleur avant
   */
  nombreVitesses?: number
  /**
   * Le type de fixation du dérailleur avant
   */
  fixation?: 'à collier'|'Direct Mount'|'à braser'
  toString(): string {
    return `${this.nombreVitesses} vitesses, fixation ${this.fixation}`
  }
  
}