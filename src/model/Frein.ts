import { EnumCategorieComposant } from "./EnumCategorieComposant";
import type { EnumTypeDeFrein } from "./EnumTypeDeFrein";
import type { ITypeComposant } from "./ITypeComposant";

export class Frein implements ITypeComposant{
  typeDeFrein?: EnumTypeDeFrein
  nom = 'Frein'
  position?: 'avant'|'arrière'
  categorie = EnumCategorieComposant.FREINAGE

  toString(): string {
    return `${this.position} ${this.typeDeFrein}`
  }
}