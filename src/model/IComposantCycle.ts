import type { ITypeComposant } from "./ITypeComposant";

export interface IComposantCycle {
  /**
   * Désigne le type de composant identifié
   */
  designation: ITypeComposant
  /**
   * Le fabricant du modèle (ex: Shimano, SRAM, Magura, etc...)
   */
  marque: string
  /**
   * Le modèle précis parmi les gammes du fabricant (ex: 105, Deore XT, etc...)
   */
  modele: string
  /**
   * Indice de confiance de l'identification, (ex: l'image est parfaite, indice de 100%, l'image est floue, 50%)
   */
  indice_confiance: number

}