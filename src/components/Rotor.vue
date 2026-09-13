<script setup lang="ts">
import BaseComponent from './BaseComponent.vue';

defineProps<{
  cycleComponent: any,
  position: boolean
}>()
</script>

<template>
  <BaseComponent :cycle-component="cycleComponent" :component-name="`Disque de frein ${ position ? 'Avant' : 'Arrière'}`">
    <template #details>
      <b-field label="Diamètre en mm" horizontal>
        <b-input v-model="cycleComponent.diameter_mm"></b-input>
      </b-field>
      <b-field label="Type de fixation" horizontal>
        <b-select placeholder="Type de fixation" v-model="cycleComponent.mounting_standard">
          <option value="6_bolt" key="6_bolt">à 6 trous</option>
          <option value="centerlock" key="centerlock">Centerlock</option>
        </b-select>
      </b-field>
    </template>
  </BaseComponent>
</template>