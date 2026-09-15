<script setup lang="ts">
import type { Bicycle } from '@/model/bicycles/Bicycle';
import { getBicycleById, updateBicycle } from '@/dexie/bicycles'
import { ref } from 'vue';
import CustomerForm from '@/components/customers/CustomerForm.vue';

const props = defineProps<{ bicycleId: string }>()
const bicycle = ref<Bicycle>(await getBicycleById(props.bicycleId))
const editing = ref(false)

const saveData = async () => {
  await updateBicycle(bicycle.value)
  editing.value = false
}
</script>
<template>
  <div class="flex-row space-between gap-20" style="flex-wrap: wrap; ">
    <div class="stretch" style="flex-basis: 400px;">
      <form id="bicycle-form" @submit.prevent="saveData">
        <div class="flex-column">
          <div class="flex-row space-between" style="margin-bottom: 10px;">
            <p class="flex space-between">Dernière modification le {{ bicycle.changeDate.toLocaleDateString('fr') }}</p>
            <p><i class="fa-solid fa-edit" @click.prevent="editing = true"></i></p>
          </div>
          <div class="form-group">
            <label for="serialnumber">Numéro de série</label>
            <input type="text" name="firstname" id="firstname" v-model="bicycle.serialnumber" :disabled="!editing" />
          </div>
          <div class="form-group">
            <label for="lastname">Désignation</label>
            <input type="text" name="lastname" id="lastname" v-model="bicycle.designation" :disabled="!editing" />
          </div>
          <div class="flex" v-if="editing">
            <button class="btn btn-primary" type="submit" form="bicycle-form">Enregistrer</button>
          </div>
        </div>
      </form>
    </div>
    <div>
      <p class="flex space-between">Propriétaire</p>
      <Suspense>
        <template #default>
          <CustomerForm :customer-id="bicycle.ownerId" :editable="false"></CustomerForm>
        </template>
        <template #fallback>
          <div>Chargement...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>