<script setup lang="ts">
defineProps<{
  cycleComponent: any,
  componentName: string
}>()
</script>

<template>
  <b-collapse class="card" animation="slide">
    <template #trigger="props">
      <div
          class="card-header"
          role="button"
          :aria-expanded="props.open"
      >
          <p class="card-header-title">{{ componentName }}</p>
          <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
              </b-icon>
          </a>
      </div>
    </template>
    <div class="card-content">
      <div class="content">
        <b-field grouped>
          <b-field label="Marque" horizontal>
            <b-input v-model="cycleComponent.brand"></b-input>
          </b-field>
          <b-field label="Gamme" horizontal>
            <b-input v-model="cycleComponent.groupeset"></b-input>
          </b-field>
          <b-field label="Modèle" horizontal>
            <b-input v-model="cycleComponent.model_number"></b-input>
          </b-field>
        </b-field>
        <b-field grouped>
          <slot name="details"></slot>
        </b-field>
      </div>
    </div>
    <footer class="card-footer" >
      <b-slider class="card-footer-item" style="display: block!important;" :type="cycleComponent.confidence_score > 85 ? 'is-success' : 'is-danger'" v-model="cycleComponent.confidence_score" show-value></b-slider>
    </footer>
  </b-collapse>
</template>