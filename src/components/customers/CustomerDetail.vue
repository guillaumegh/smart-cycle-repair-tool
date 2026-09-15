<script setup lang="ts">
import CustomerForm from '@/components/customers/CustomerForm.vue'

defineProps<{id: string}>()
</script>
<template>
  <Suspense>
    <template #default>
      <CustomerForm :customerId="id" />
    </template>
    <template #fallback>
      <div>Chargement...</div>
    </template>
  </Suspense>
</template>