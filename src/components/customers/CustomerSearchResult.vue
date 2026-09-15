<script setup lang="ts">
import type { Customer } from '@/model/customers/Customer';
const props = defineProps<{data: Customer}>()
console.log(props.data)
</script>
<template>
  <li  class="card">
    <div class="flex-row gap-20 flex-left">
      <span class="badge badge-client flex">Client</span>
      <h4 class="card-title flex">{{ data.firstname }} {{ data.lastname }}</h4>
      <span class="flex">{{ data.address }}</span>
    </div>
    <div>
      <RouterLink :to="{ name: 'customer-detail', params: { id: data.id } } " class="nav-item">
        <span><i class="fa-solid fa-circle-user"></i></span>
      </RouterLink>
    </div>
  </li>
</template>