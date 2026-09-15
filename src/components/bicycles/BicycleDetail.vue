<script setup lang="ts">
import BicycleForm from '@/components/bicycles/BicycleForm.vue'

defineProps<{id: string}>()
</script>
<template>
  <Suspense>
    <template #default>
      <BicycleForm :bicycleId="id" />
    </template>
    <template #fallback>
      <div>Chargement...</div>
    </template>
  </Suspense>
</template>