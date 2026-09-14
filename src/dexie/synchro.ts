import type { ISynchro } from "@/model/synchro/ISynchro";
import { db } from "./db";
import {v4 as uuid} from 'uuid';
import { triggerNotification } from "@/stores/notificationsStore";
import { EnumTypeNotification } from "@/model/Notification";

export const getLastSyncDate = async (tableName: string) => {
  return await db.synchro.where('table').equals(tableName).first()
}
export const updateSynchro = async (tableName: string, lastSynchro: ISynchro | undefined) => {
  const key = lastSynchro ? lastSynchro.id : uuid()
  await db.synchro.upsert(key, {table: tableName, lastSyncDate: new Date()});
  triggerNotification('Mise à jour table Synchro dans indexeddb', `La table 'SYNCHRO' a été mise à jour avec la date du jour`, EnumTypeNotification.INFO)
}