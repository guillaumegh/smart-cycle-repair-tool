<script setup lang="ts">
import { onMounted } from 'vue';
import { notifications } from '@/stores/notificationsStore'
import { currentOpenModalProps, currentOpenModal } from '@/stores/modalStore'
import Notification from '@/components/notifications/Notification.vue'
import { RouterView } from 'vue-router';
import { getBicycles, getCustomers } from './services/shifterApiService';
import { addCustomers } from '@/dexie/customers'
import {getLastSyncDate, updateSynchro} from '@/dexie/synchro'
import { addBicycles } from './dexie/bicycles';
onMounted(async () => {
  // triggerNotification('error', "nrcbfcbrcbfcfycehdheudh ehduehd eud edihjeiudhe dedeuh f", EnumTypeNotification.ERROR)
  // triggerNotification('attention', "nrcbfcbrcbfcfycehdheudh ehduehd eud edihjeiudhe dedeuh f", EnumTypeNotification.WARNING)
  // triggerNotification('cool', "nrcbfcbrcbfcfycehdheudh ehduehd eud edihjeiudhe dedeuh f", EnumTypeNotification.INFO)
  // showModal(MissingApiKeyInLocalStorageModal, { apiKeyName: 'GEMINI_API_KEY' })
  const lastCustomerSynchro = await getLastSyncDate('customers')
  const customersUpdates = await getCustomers(lastCustomerSynchro?.lastSyncDate)
  if(customersUpdates?.length) {
    await addCustomers(customersUpdates) 
    await updateSynchro('customers', lastCustomerSynchro) 
  }
  const lastBicyclesSynchro = await getLastSyncDate('bicycles')

  const bicyclesUpdates = await getBicycles(lastBicyclesSynchro?.lastSyncDate)
  if(bicyclesUpdates?.length) {
    await addBicycles(bicyclesUpdates) 
    await updateSynchro('bicycles', lastBicyclesSynchro) 
  }
})
</script>

<template>
  <div id="app" class="app-layout">
    <!-- ZONE DES MODALS -->
    <component :is="currentOpenModal" v-bind="currentOpenModalProps"></component>
    <!-- ZONE DES NOTIFICATIONS -->
    <div class="toast-container" v-if="notifications.length">
      <Notification v-for="notification in notifications" :key="notification.id" :notification="notification">
      </Notification>
    </div>
    <!-- LAYOUT -->
    <header class="app-header">
      <div class="header-brand">
        <div class="header-logo-wrapper">
          <i class="fa-solid fa-screwdriver-wrench brand-icon"></i>
        </div>
        <h1>Smart Cycle <span>Repair Tool</span></h1>
      </div>

      <div class="header-actions">
        <!-- Indicateur d'état connecté / PWA autonome -->
        <span class="status-badge" aria-label="Application en ligne"></span>
      </div>
    </header>
    <main class="app-content">
      <RouterView></RouterView>
    </main>
    <nav class="app-nav">
      <RouterLink to="/" class="nav-item">
        <span><i class="fa-solid fa-house"></i></span>
        <span class="nav-label">Home</span>
      </RouterLink>
      <RouterLink to="/customer-infos" class="nav-item">
        <span><i class="fa-solid fa-circle-user"></i></span>
        <span class="nav-label">Fiche Client</span>
      </RouterLink>
      <RouterLink to="/bike-infos" class="nav-item">
        <span><i class="fa-solid fa-bicycle"></i></span>
        <span class="nav-label">Fiche Vélo</span>
      </RouterLink>
      <RouterLink to="/estimate" class="nav-item">
        <span><i class="fa-solid fa-screwdriver-wrench"></i></span>
        <span class="nav-label">Réaliser un devis</span>
      </RouterLink>
    </nav>

  </div>
</template>
<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* Utilise 100dvh si ton navigateur est récent pour les barres d'outils dynamiques */
  height: 100dvh;
  width: 100%;
}

.app-header {
  height: var(--header-height);
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); /* Dégradé sombre profond */
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

/* Effet décoratif mécanique en filigrane (Roue / Engrenage en arrière-plan) */
.app-header::after {
  content: '\f085'; /* Code Unicode FontAwesome pour l'engrenage (gears) */
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  position: absolute;
  right: -15px;
  bottom: -25px;
  font-size: 5.5rem;
  color: rgba(255, 255, 255, 0.025); /* Ultra discret */
  transform: rotate(15deg);
  pointer-events: none;
}

/* Zone Marque / Titre */
.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2; /* Passe au-dessus du filigrane */
}

/* Wrapper de l'icône logo avec effet brillant */
.header-logo-wrapper {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
}

.brand-icon {
  font-size: 0.95rem;
  color: #ffffff;
}

/* Typographie du Titre */
.app-header h1 {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #ffffff;
  margin: 0;
}

/* Le "Repair Tool" en surbrillance bleue électrique */
.app-header h1 span {
  display: block; /* Passe à la ligne sur petit écran pour rester compact, ou en ligne selon tes goûts */
  font-size: 0.75rem;
  font-weight: 500;
  color: #60a5fa; /* Bleu clair mécanique */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: -1px;
}

/* Zone Actions / Statut */
.header-actions {
  display: flex;
  align-items: center;
  z-index: 2;
}

/* Pastille Statut Clignotante (Mode connecté) */
.status-badge {
  width: 8px;
  height: 8px;
  background-color: #10b981; /* Vert émeraude */
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

/* Petit effet de pulsation natif pour le côté vivant */
.status-badge::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}


/* Zone de contenu défilante (Le secret de l'effet natif) */
.app-content {
  flex: 1;
  overflow-y: auto;
  /* Seul le contenu défile si la fiche client ou vélo est longue */
  padding: 16px;
  -webkit-overflow-scrolling: touch;
  /* Scroll fluide sur périphériques tactiles */
}

/* Navigation basse (Bottom Bar permanente pour les pouces) */
.app-nav {
  height: var(--nav-height);
  background-color: var(--bg-surface);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-shrink: 0;
  /* Ne s'écrase jamais */
  padding-bottom: env(safe-area-inset-bottom);
  /* Gère la barre de navigation Android par gestes */
}

/* Boutons de navigation */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 1.2rem;
  /* Taille de l'icône */
  gap: 4px;
  transition: color 0.2s;
}

.nav-label {
  font-size: 0.70rem;
  font-weight: 500;
}

/* État actif géré automatiquement par Vue Router */
.router-link-active {
  color: var(--primary);
}

/* --- 4. Le conteneur de notifications fixé en haut --- */
.toast-container {
  position: fixed;
  top: 12px;
  right: 12px;
  left: 12px;
  /* Sur mobile, on donne toute la largeur moins les marges */
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9999;
  pointer-events: none;
}

/* On force la carte notification à s'adapter élégamment au mobile */
.toast-container :deep(.toast-card) {
  pointer-events: auto;
  width: 100%;
  /* Prend toute la largeur disponible sur l'écran du tel */
}

</style>
