<script setup lang="ts">
import {type IColumn} from '@/model/table/IColumn'
import TableColumn from './TableColumn.vue';
defineProps<{columns: IColumn[], data?: any[]}>()
</script>
<template>
<div class="table-responsive">
  <table class="app-table">
    <thead>
      <tr>
        <th v-for="column in columns">{{ column.label ?? '' }}</th>
      </tr>
    </thead>
    <tbody v-if="data">
      <tr v-for="row in data">
        <slot name="tableColumn" :row="row">
          <table-column v-for="column in columns" :column="column" :row="row"></table-column>
        </slot>
      </tr>
    </tbody>
  </table>
</div>

</template>
<style scoped>
/* --- 1. Conteneur de Débordement Mobile (Crucial pour PWA) --- */
.table-responsive {
  width: 100%;
  overflow-x: auto; /* Permet le scroll horizontal fluide si le tableau est plus large que l'écran du tel */
  overflow-y: auto; /* Permet le scroll vertical si le tableau est très long */
  max-height: 400px; /* Optionnel : limite la hauteur pour bloquer le thead dans une zone précise */
  border: 1px solid #e2e8f0;
  border-radius: 10px; /* Même arrondi que tes modales et cartes */
  background-color: #ffffff;
  -webkit-overflow-scrolling: touch;
}

/* --- 2. Styles de la Table --- */
.app-table {
  width: 100%;
  border-collapse: collapse; /* Fusionne les bordures pour un rendu ultra-net */
  font-family: inherit;
  font-size: 0.9rem;
  text-align: left;
}

/* --- 3. Le Header Sticky (Figé en haut) --- */
.app-table thead th {
  position: sticky;
  top: 0;
  z-index: 5; /* Reste au-dessus des lignes du tbody lors du scroll */
  background-color: #f8fafc; /* Fond très légèrement grisé pour détacher le header */
  color: #475569; /* Gris ardoise texturé */
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  padding: 12px 16px;
  border-bottom: 2px solid #e2e8f0; /* Trait de séparation plus marqué */
}

/* --- 4. Les Lignes et Cellules du Corps (Tbody) --- */
.app-table tbody td {
  padding: 14px 16px; /* Confort tactile pour la sélection de ligne */
  color: #0f172a;
  border-bottom: 1px solid #f1f5f9; /* Ligne de séparation fine */
  white-space: nowrap; /* Empêche le texte de sauter à la ligne de manière moche sur mobile */
}

/* Effet d'alternance de couleur de ligne (Zebra) pour la lisibilité */
.app-table tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

/* Effet visuel au survol / clic sur Android */
.app-table tbody tr:hover {
  background-color: #f1f5f9;
}

/* --- 5. Utilitaires d'Alignement pour les Chiffres/Prix --- */
.app-table .text-right {
  text-align: right;
}

.app-table .font-medium {
  font-weight: 600;
  color: #0f172a;
}

</style>