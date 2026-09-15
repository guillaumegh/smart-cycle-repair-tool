<script setup lang="ts">
import BaseView from './BaseView.vue';
import { ref, watch } from 'vue';
import { db } from '@/dexie/db';
import {Customer} from '@/model/customers/Customer'
import BicycleSearchResult from '@/components/bicycles/BicycleSearchResult.vue';
import CustomerSearchResult from '@/components/customers/CustomerSearchResult.vue';
import type { Bicycle } from '@/model/bicycles/Bicycle';
import type { PlainJsObject } from '@/model/PlainJsObject';
const searchQuery = ref('')
function debounce<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args)
    }, delay);
  };
}
const searchResult = ref([] as Array<Customer|Bicycle>)
async function search(input: string): Promise<void> {
  if (!input.trim()) {
    searchResult.value = []
    return;
  }

  try {
    const customers = await db.customers
      .filter((c) =>
        c.firstname.toLowerCase().includes(input.toLowerCase()) ||
        c.lastname.toLowerCase().includes(input.toLowerCase()) ||
        c.phoneNumber.includes(input.toLowerCase()) || c.address.toLowerCase().includes(input.toLowerCase()))
      .toArray();
    const bikes = await db.bicycles
      .filter((b) => b.serialnumber?.toLowerCase().includes(input.toLowerCase()) || b.designation.toLowerCase().includes(input.toLowerCase()))
      .toArray();
    searchResult.value = [...customers, ...bikes]
  } catch (error) {
    console.error("Erreur Dexie :", error)
  }
}

const searchDebounce = debounce((input: string) => {
  search(input)
}, 400)

watch(searchQuery, (newVal) => {
  searchDebounce(newVal)
})
const getComponent = (data: Customer|Bicycle) => {
  if(data.hasOwnProperty('firstname')) return CustomerSearchResult
  return BicycleSearchResult
}
</script>
<template>
  <BaseView>
    <div style="max-width: 500px;">
      <form id="recherche-form" class="form-group flex-row">
        <label for="champ-recherche">Recherche</label>
        <input type="text" name="champ-recherche" id="champ-recherche" v-model="searchQuery"
          placeholder="Nom, prénom, N° de devis, Modèle de vélo ..." />
      </form>
    </div>
    <div>
      <ul class="results-grid">
        <li v-if="searchResult.length === 0 && searchQuery.trim() !== ''" class="no-result">
          Aucun résultat ne correspond à votre recherche.
        </li>
        <component v-else v-for="data in searchResult" :key="data.id" :is="getComponent(data) as unknown as PlainJsObject" :data="data"></component>
      </ul>
    </div>
  </BaseView>
</template>
<style>
.results-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column; /* Force l'alignement en colonne (1 par ligne) */
    gap: 16px; /* Espace entre chaque carte */
}

.card {
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    padding: 16px 20px;
    display: flex;
    gap: 20px;
    justify-content: space-between; /* Aligne le titre à gauche et le badge à droite */
    align-items: center; /* Centre verticalement les éléments */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.015);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

/* Effet au survol de la carte */
.card:hover {
    transform: translateX(4px); /* Léger décalage vers la droite pour un effet liste dynamique */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: #409eff;
}

.card-title {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* Coupe proprement le texte trop long */
    padding-right: 15px;
}
.badge {
    flex-shrink: 0; /* Empêche le badge de se déformer si le texte est long */
    display: inline-block;
    background: #f4f4f5;
    color: #909399;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.3px;
}
.card:has(.badge:contains) 
.badge-client { background: #ecf5ff; color: #409eff; }
.badge-cycle { background: #f0f9eb; color: #67c23a; }
</style>