<script setup lang="ts">
 import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "@/dexie/db";
import Table from "@/components/table/Table.vue";
import TableColumn from "@/components/table/TableColumn.vue";
import { Bicycle } from "@/model/bicycles/Bicycle";

const columns = [
  {property: 'serialnumber', label: 'Numéro de série'},
  {property: 'designation', label: 'Désignation'},
  {property: '', label: ''},
]
const bicycles = useObservable(liveQuery(() => db.bicycles.toArray()) as any)
</script>
<template>
  <Table :columns="columns" :data="(bicycles as Bicycle[])">
    <template #tableColumn="{row}">
      <table-column :column="{property: 'serialnumber', label: 'Numéro de série'}" :row="row" ></table-column>
      <table-column :column="{property: 'designation', label: 'Designation'}" :row="row"></table-column>
      <table-column :column="{property: 'changeDate', label: 'Dernière modification'}" :row="row">{{ row.changeDate.toLocaleDateString("fr") }}</table-column>
      <table-column :row="row">
        <RouterLink :to="{ name: 'bicycle-detail', params: { id: row.id } } " class="nav-item">
          <span><i class="fa-solid fa-bicycle"></i></span>
        </RouterLink>
      </table-column>
    </template>
  </Table>

</template>