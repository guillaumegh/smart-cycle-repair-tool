<script setup lang="ts">
import BaseModal from '@/components/modals/BaseModal.vue'
import { closeModal } from '@/stores/modalStore';
import { ref } from 'vue';
const props = defineProps<{
  apiKeyName: string
}>()
const apiKey = ref('')
const submit = () => {
  localStorage.setItem(props.apiKeyName, apiKey.value)
  closeModal()
}
</script>
<template>
<BaseModal>
  <template #header>Api key manquante</template>
  <form id="api-key-form" @submit.prevent="submit" class="modal-form">
    <label for="apikey">Veuillez saisir l'api key {{ apiKeyName }}</label>
    <input type="text" name="apikey" id="apikey" v-model="apiKey" />
  </form>
  <template #footer>
    <button class="btn btn-secondary" :disabled="!apiKey.length" type="submit" form="api-key-form">OK</button>
  </template>
</BaseModal>
</template>
<style scoped>
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.modal-form label {
  font-size: 0.875rem;
  color: #475569;
}
.modal-form input {
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.modal-form input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
</style>