<script setup lang="ts">
import type { Bicycle } from '@/model/bicycles/Bicycle';

defineProps<{data: Bicycle}>()
</script>
<template>
  <li  class="card">
    <div class="flex-row gap-20 flex-left">
      <span class="badge badge-cycle flex">Cycle</span>
      <h4 class="card-title flex">{{ data.serialnumber }}</h4>
      <span class="flex">{{ data.designation }}</span>
    </div>
    <div>
      <RouterLink :to="{ name: 'bicycle-detail', params: { id: data.id } } " class="nav-item">
        <span><i class="fa-solid fa-bicycle"></i></span>
      </RouterLink>
    </div>
  </li>
</template>