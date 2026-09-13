<script setup lang="ts">
import { computed } from 'vue';
import { EnumTypeNotification, type INotification } from '../../model/Notification';
import { closeNotification } from '../../stores/notificationsStore'
const props = defineProps<{ notification: INotification }>()
const __type = computed(() => {
  if (!props.notification.type) return 'toast-success'
  switch (props.notification.type) {
    case EnumTypeNotification.ERROR: return 'toast-error'
    case EnumTypeNotification.WARNING: return 'toast-warning'
    case EnumTypeNotification.INFO: return 'toast-success'
    default: return 'toast-success'
  }
})
const __icon = computed(() => {
  if (!props.notification.type) return '✓'
  switch (props.notification.type) {
    case EnumTypeNotification.ERROR: return '✕'
    case EnumTypeNotification.WARNING: return '!'
    case EnumTypeNotification.INFO: return '✓'
    default: return '✓'
  }
})
</script>
<template>
  <div class="toast-card" :class="__type" role="status" id="monToast">
    <header class="toast-header">
      <div class="toast-title-wrapper">
        <span class="toast-icon">{{ __icon }}</span>
        <h3>{{ notification.titre }}</h3>
      </div>
      <button class="toast-close-btn" @click="closeNotification(notification)"
        aria-label="Fermer la notification"></button>
    </header>
    <main class="toast-body">
      <p>{{ notification.message }}</p>
    </main>
  </div>
</template>
<style scoped>
.toast-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08);
  font-family: system-ui, -apple-system, sans-serif;
  overflow: hidden;
  border: 1px solid #f1f5f9;
  border-left: 4px solid transparent;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(50px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-success {
  border-left-color: #10b981;
}

.toast-success .toast-icon {
  background-color: #ecfdf5;
  color: #10b981;
}

.toast-warning {
  border-left-color: #f59e0b;
}

.toast-warning .toast-icon {
  background-color: #fffbeb;
  color: #b45309;
}

.toast-error {
  border-left-color: #ef4444;
}

.toast-error .toast-icon {
  background-color: #fef2f2;
  color: #ef4444;
}

.toast-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  position: relative;
  z-index: 2;
}

.toast-title-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
}

.toast-header h3 {
  margin: 0;
  font-size: 0.95rem;
  color: #0f172a;
  font-weight: 600;
}

.toast-body {
  padding: 14px 16px;
  background-color: #ffffff;
}

.toast-body p {
  margin: 0;
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
}

.toast-close-btn {
  background: none;
  border: none;
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, transform 0.2s;
}

.toast-close-btn:hover {
  background-color: #f1f5f9;
  transform: rotate(90deg);
}

.toast-close-btn::before,
.toast-close-btn::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 1.5px;
  background-color: #94a3b8;
  border-radius: 1px;
}

.toast-close-btn::before {
  transform: rotate(45deg);
}

.toast-close-btn::after {
  transform: rotate(-45deg);
}

.toast-close-btn:hover::before,
.toast-close-btn:hover::after {
  background-color: #334155;
}</style>