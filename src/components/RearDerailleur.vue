<script setup lang="ts">
import BaseComponent from './BaseComponent.vue';

defineProps<{
  cycleComponent: any
}>()
</script>

<template>
  <BaseComponent :cycle-component="cycleComponent" component-name="Dérailleur Arrière">
    <template #details>
      <b-field label="Nombre de vitesses" horizontal>
        <b-input v-model="cycleComponent.speeds_count"></b-input>
      </b-field>
      <b-field label="Chape" horizontal>
        <b-select placeholder="Type de chape" v-model="cycleComponent.cage_length">
          <option value="short" key="short">courte</option>
          <option value="medium" key="medium">moyenne</option>
          <option value="long" key="long">longue</option>
        </b-select>
      </b-field>
    </template>
  </BaseComponent>
</template>