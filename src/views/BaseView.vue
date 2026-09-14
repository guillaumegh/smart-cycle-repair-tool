<script setup lang="ts">
import { ref } from 'vue';
import { getUserByFirstNameOrLastName } from '@/services/shifterApiService';
const recherche = ref('')
const customers = ref([])
const submit = async () => {
  customers.value = await getUserByFirstNameOrLastName('al') as []
}

</script>

<template>
  <div>
    <div style="max-width: 500px;">
      <form id="recherche-form" @submit.prevent="submit" class="form-group flex-row">
        <label for="champ-recherche">Recherche</label>
        <input type="text" name="champ-recherche" id="champ-recherche" v-model="recherche" placeholder="Nom, prénom, N° de devis, Modèle de vélo ..."/>
        <button class="btn btn-secondary" type="submit" form="recherche-form">OK</button>
      </form>
    </div>
    
    <slot name="default">
    </slot>
  </div>
</template>