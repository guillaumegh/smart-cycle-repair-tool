// db.ts
import type { Customer } from '@/model/customers/Customer';
import type { ISynchro } from '@/model/synchro/ISynchro';
import { Dexie, type EntityTable } from 'dexie';

const db = new Dexie('SmartCycleRepairTool') as Dexie & {
  customers: EntityTable<Customer,'id'>,
  synchro: EntityTable<ISynchro,'id'>,
};
db.version(1).stores({
  customers: '++id, firstname, lastname, birthdate, address, registrationDate',
  synchro: '++id, table, lastSyncDate'
});

export { db };

