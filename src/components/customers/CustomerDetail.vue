<script setup lang="ts">
import { getCustomerById } from '@/dexie/customers';
import { onMounted, ref } from 'vue';

const props = defineProps<{id: string}>()
const customer = ref()
onMounted(async () => {
  customer.value = await getCustomerById(props.id)
})
</script>
<template>
  <div><pre>{{ customer }}</pre></div>
</template>