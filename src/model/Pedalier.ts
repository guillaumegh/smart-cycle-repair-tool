import { EnumCategorieComposant } from "./EnumCategorieComposant";
import type { ITypeComposant } from "./ITypeComposant";
import type { EnumTypeFixationPedalier } from "./EnumTypeFixationPedalier"
export class Pedalier implements ITypeComposant {
  nom = 'Pédalier'
  categorie = EnumCategorieComposant.TRANSMISSION
  /**
   * Nombre de plateaux du pédalier (Entre 1 et 3)
   */
  nombrePlateaux: number = 1
  /**
   * Tableau exprimant le nombre de dents de chaque plateau en partant du plus petit au plus grand (Ex: [22,32,45])
   */
  nombreDeDentsDesPlateaux: number[] = []
  /**
   * Le type de fixation du pédalier
   */
  typeDeFixationPedalier?: EnumTypeFixationPedalier
  toString(): string {
    return `${this.typeDeFixationPedalier}, ${this.nombrePlateaux} plateaux${this.nombreDeDentsDesPlateaux ? ', nombre de dents: ' + this.nombreDeDentsDesPlateaux.join(',') : ''}`
  }
  
}