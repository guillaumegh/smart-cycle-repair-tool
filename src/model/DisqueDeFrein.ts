import { EnumCategorieComposant } from "./EnumCategorieComposant";
import type { ITypeComposant } from "./ITypeComposant";

export class DisqueDeFrein implements ITypeComposant {
  nom: string = 'Disque de frein'
  categorie = EnumCategorieComposant.FREINAGE
  /**
   * Diametre du disque en mm. Diamètres courants: 140, 160, 180 ou 203 mm
   */
  diametre?: number
  montage?: 'Fixation à 6 trous'|'Centerlock'
  position?: 'avant'|'arrière'
  toString() {
    return `${this.position}, diametre: ${this.diametre}mm, montage: ${this.montage}`
  }
}