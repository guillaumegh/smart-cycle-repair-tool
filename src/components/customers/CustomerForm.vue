<script setup lang="ts">
import { getCustomerById, updateCustomer } from '@/dexie/customers';
import type { Customer } from '@/model/customers/Customer';
import { ref } from 'vue';

const props = defineProps<{customerId: string}>()
const customer = ref<Customer>(await getCustomerById(props.customerId))
const editing = ref(false)
const navigate = () => {
  const query = encodeURIComponent(customer.value.address);
  const url = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${query}&travelmode=bicycling`;
  window.open(url, '_blank');
}
const saveData = async () => {
  await updateCustomer(customer.value)
  editing.value = false
}
</script>
<template>
  <div>
    <form id="customer-form" @submit.prevent="saveData">
      <div class="flex-column">
        <div class="flex-row space-between" style="margin-bottom: 10px;">
          <p class="flex space-between">Enregistré depuis le {{ customer.registrationDate.toLocaleDateString('fr') }}</p>
          <p><i class="fa-solid fa-edit" @click.prevent="editing=true"></i></p>
        </div>
        <div class="form-group" >
          <label for="firstname">Prénom</label>
          <input type="text" name="firstname" id="firstname" v-model="customer.firstname"  :disabled="!editing"/>
        </div>
        <div class="form-group" >
          <label for="lastname">Nom</label>
          <input type="text" name="lastname" id="lastname" v-model="customer.lastname"  :disabled="!editing"/>
        </div>
        <div class="form-group" >
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model="customer.email"  :disabled="!editing"/>
        </div>
        <div class="form-group" >
          <label for="phoneNumber">Numéro de téléphone</label>
          <input type="tel" name="phoneNumber" id="phoneNumber" v-model="customer.phoneNumber"  :disabled="!editing" />
          <a :href="`tel:${customer.phoneNumber}`" rel="external"><i class="fa-solid fa-phone"></i></a>
          <a :href="`sms:${customer.phoneNumber}`" rel="external"><i class="fa-solid fa-sms"></i></a>
        </div>
        <div class="form-group" >
          <label for="address">Adresse</label>
          <input type="text" name="address" id="address" v-model="customer.address"  :disabled="!editing" />
          <a href="#" @click.prevent="navigate"><i class="fa-solid fa-map"></i></a>
        </div>
        <div class="flex" v-if="editing">
          <button class="btn btn-primary" type="submit" form="customer-form">Enregistrer</button>
        </div>
      </div>
    </form>
  </div>
</template>