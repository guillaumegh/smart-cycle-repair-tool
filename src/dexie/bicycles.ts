import type { Bicycle } from "@/model/bicycles/Bicycle";
import { db } from "./db";
import { EnumTypeNotification } from "@/model/Notification";
import { triggerNotification } from "@/stores/notificationsStore";

export const addBicycles = async (bicycles: Array<Bicycle>) => {
  db.bicycles.bulkPut(bicycles).then(() => {
    triggerNotification('Mise à jour table Bicycles dans indexeddb', `La table 'bicycles' a été mise à jour avec ${bicycles.length} lignes ajoutées`, EnumTypeNotification.INFO)
  }).catch((error: { name: string; }) => {
    if (error.name === "BulkError") {
      console.error(error);
    } else {
      throw error;
    }
  });
}
export const getBicycleById = async (id: string) => {
  const bicycle = await db.bicycles.where('id').equals(id).first()
  if(!bicycle) {
    throw new Error(`Impossible de charger le vélo avec l'ID ${id}`)
  }
  return bicycle
}
export const updateBicycle = async (bicycle: Bicycle) => {
  const bicycleCopy = {...bicycle} as any
  delete bicycleCopy.id
  await db.bicycles.update(bicycle.id, bicycleCopy);
  triggerNotification('Mise à jour d\'un cycle', `La fiche du cycle ${bicycle.designation} a été mise à jour`, EnumTypeNotification.INFO)
}