import type { IComposantCycle } from "./IComposantCycle";
import { DisqueDeFrein } from "./DisqueDeFrein";
import { ComposantCycle } from "./ComposantCycle";
import { DerailleurArriere } from "./DerailleurArriere";
import { DerailleurAvant } from "./DerailleurAvant";
import { Frein } from "./Frein";
import { Pedalier } from "./Pedalier";

export default class ComposantFactory {
  static create(jsonBrut: any): IComposantCycle & any {
    const nomComposant = jsonBrut.designation?.nom;

    switch (nomComposant) {
      case 'Disque de frein': {
        const disque = new DisqueDeFrein();
        disque.diametre = jsonBrut.diametre;
        disque.montage = jsonBrut.montage;
        disque.position = jsonBrut.position
        const composant = new ComposantCycle(jsonBrut as IComposantCycle)
        composant.designation = disque
        return composant
      }
      case 'Frein': {
        const type = new Frein();
        type.typeDeFrein = jsonBrut.typeDeFrein;
        type.position = jsonBrut.position
        const composant = new ComposantCycle(jsonBrut as IComposantCycle)
        composant.designation = type
        return composant
      }
      case 'Pédalier': {
        const type = new Pedalier();
        type.nombrePlateaux = jsonBrut.nombrePlateaux;
        type.nombreDeDentsDesPlateaux = jsonBrut.nombreDeDentsDesPlateaux
        type.typeDeFixationPedalier = jsonBrut.typeDeFixationPedalier
        const composant = new ComposantCycle(jsonBrut as IComposantCycle)
        composant.designation = type
        return composant
      }
      case 'Dérailleur arrière': {
        const derArr = new DerailleurArriere();
        derArr.chape = jsonBrut.chape;
        derArr.nombreVitesses = jsonBrut.nombreVitesses;
        const composant = new ComposantCycle(jsonBrut as IComposantCycle)
        composant.designation = derArr
        return composant
      }
      case 'Dérailleur avant': {
        const derAv = new DerailleurAvant();
        derAv.fixation = jsonBrut.fixation;
        derAv.nombreVitesses = jsonBrut.nombreVitesses;
        const composant = new ComposantCycle(jsonBrut as IComposantCycle)
        composant.designation = derAv
        return composant
      }
      default:
        // Retourne le composant générique si aucune classe spécifique n'existe
        return new ComposantCycle(jsonBrut as IComposantCycle)
    }
  }
}