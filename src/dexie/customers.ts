import type { Customer } from "@/model/customers/Customer";
import { db } from "./db";
import { triggerNotification } from "@/stores/notificationsStore";
import { EnumTypeNotification } from "@/model/Notification";

export const addCustomers = async (customers: Array<Customer>) => {
  db.customers.bulkPut(customers).then(() => {
    triggerNotification('Mise à jour table Customers dans indexeddb', `La table 'customers' a été mise à jour avec ${customers.length} lignes ajoutées`, EnumTypeNotification.INFO)
  }).catch(error => {
    if (error.name === "BulkError") {
      console.error(error);
    } else {
      throw error;
    }
  });
}
export const getCustomerById = async (id: string) => {
  const customer = await db.customers.where('id').equals(id).first()
  if(!customer) {
    throw new Error(`Impossible de charger le client avec l'ID ${id}`)
  }
  return customer
}
export const updateCustomer = async (customer: Customer) => {
  const customerCopy = {...customer} as any
  delete customerCopy.id
  await db.customers.update(customer.id, customerCopy);
  triggerNotification('Mise à jour d\'une fiche client', `La fiche de ${customer.firstname} ${customer.lastname} a été mise à jour`, EnumTypeNotification.INFO)
}