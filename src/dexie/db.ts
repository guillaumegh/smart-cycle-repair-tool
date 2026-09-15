// db.ts
import type { Bicycle } from '@/model/bicycles/Bicycle';
import type { Customer } from '@/model/customers/Customer';
import type { ISynchro } from '@/model/synchro/ISynchro';
import { Dexie, type EntityTable } from 'dexie';

const db = new Dexie('SmartCycleRepairTool') as Dexie & {
  customers: EntityTable<Customer,'id'>,
  synchro: EntityTable<ISynchro,'id'>,
  bicycles: EntityTable<Bicycle,'id'>,
};
db.version(4).stores({
  customers: '++id, firstname, lastname, phoneNumber, email, address, changeDate',
  synchro: '++id, table, lastSyncDate',
  bicycles: '++id, serialnumber, designation, ownerId, changeDate'
});

export { db };

