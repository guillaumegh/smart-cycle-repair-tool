<script setup lang="ts">
 import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "@/dexie/db";
import Table from "@/components/table/Table.vue";
import TableColumn from "@/components/table/TableColumn.vue";
import { Customer } from "@/model/customers/Customer";

const columns = [
  {property: 'firstname', label: 'Prénom'},
  {property: 'lastname', label: 'Nom de famille'},
  {property: 'address', label: 'Adresse'},
  {property: 'birthdate', label: 'Date de naissance'},
  {property: 'registrationDate', label: 'Date de d\'enregistrement'},
  {property: '', label: ''},
]
const customers = useObservable(liveQuery(() => db.customers.toArray()) as any)
</script>
<template>
  <Table :columns="columns" :data="(customers as Customer[])">
    <template #tableColumn="{row}">
      <table-column :column="{property: 'firstname', label: 'Prénom'}" :row="row" ></table-column>
      <table-column :column="{property: 'lastname', label: 'Nom de famille'}" :row="row"></table-column>
      <table-column :column="{property: 'address', label: 'Adresse'}" :row="row"></table-column>
      <table-column :column="{property: 'birthdate', label: 'Date de naissance'}" :row="row">{{ row.birthdate.toLocaleDateString("fr") }}</table-column>
      <table-column :column="{property: 'registrationDate', label: 'Date d\'enregistrement'}" :row="row">{{ row.registrationDate.toLocaleDateString("fr") }}</table-column>
      <table-column :row="row">
        <RouterLink :to="{ name: 'customer-detail', params: { id: row.id } } " class="nav-item">
          <span><i class="fa-solid fa-circle-user"></i></span>
        </RouterLink>
      </table-column>
    </template>
  </Table>

</template>