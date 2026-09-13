import type { EnumCategorieComposant } from "./EnumCategorieComposant"

export interface ITypeComposant {
  /**
   * Le nom du type de composant (Ex: Dérailleur)
   */
  nom: string
  /**
   * La catégorie de composant (Ex: Freinage)
   */
  categorie: EnumCategorieComposant
  toString(): string
}