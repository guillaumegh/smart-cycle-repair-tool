<script setup lang="ts">
import { closeModal } from '@/stores/modalStore';
import { onMounted, useTemplateRef } from 'vue';
const dialog = useTemplateRef<HTMLDialogElement>('modal-dialog')
onMounted(() => {
  (dialog.value as HTMLDialogElement).showModal()
})
</script>
<template>
  <dialog ref="modal-dialog">
    <header class="modal-header">
      <h2>
        <slot name="header">Titre de la modal</slot>
      </h2>
      <button class="close-icon-btn" @click="closeModal()" aria-label="Fermer la modale"></button>
    </header>
    <main class="modal-body">
      <slot name="default">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
      </slot>
    </main>
    <footer class="modal-footer">
      <button class="btn btn-primary" @click="closeModal()">Fermer</button>
      <slot name="footer"></slot>
    </footer>
  </dialog>
</template>
<style scoped>
dialog {
  border: none;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
  overflow: hidden;
  margin: auto;
}

dialog::backdrop {
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 600;
}

.modal-body {
  padding: 24px;
  color: #475569;
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.close-icon-btn {
  background: none;
  border: none;
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, transform 0.2s;
}

.close-icon-btn:hover {
  background-color: #f1f5f9;
  transform: rotate(90deg);
}

.close-icon-btn::before,
.close-icon-btn::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 2px;
  background-color: #64748b;
  border-radius: 1px;
}

.close-icon-btn::before {
  transform: rotate(45deg);
}

.close-icon-btn::after {
  transform: rotate(-45deg);
}

.close-icon-btn:hover::before,
.close-icon-btn:hover::after {
  background-color: #0f172a;
}


</style>