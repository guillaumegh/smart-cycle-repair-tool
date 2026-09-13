<script setup lang="ts">
import BaseComponent from './BaseComponent.vue';

defineProps<{
  cycleComponent: any,
  position: boolean
}>()
</script>

<template>
  <BaseComponent :cycle-component="cycleComponent" :component-name="`Frein ${ position ? 'Avant' : 'Arrière'}`">
    <template #details>
      <b-field label="Type de fixation" horizontal>
        <b-select placeholder="Type de fixation" v-model="cycleComponent.brake_type">
          <option value="hydraulic_disc" key="hydraulic_disc">à disque hydraulique</option>
          <option value="mechanical_disc" key="mechanical_disc">à disque mécanique</option>
          <option value="v_brake" key="v_brake">V-Brake</option>
          <option value="cantilever" key="cantilever">cantilever</option>
          <option value="caliper_rim" key="caliper_rim">à étrier</option>
          <option value="drum" key="drum">à tambour</option>
        </b-select>
      </b-field>
    </template>
  </BaseComponent>
</template>