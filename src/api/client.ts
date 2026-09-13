import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { triggerNotification } from "../stores/notificationsStore";
import { EnumTypeNotification } from "../model/Notification";
import { hideLoader, showLoader } from "../stores/loadingStore";
import { showModal } from "../stores/modalStore";
import MissingApiKeyInLocalStorageModal from '../components/modals/MissingApiKeyInLocalStorageModal.vue'

interface IApiKeyStrategy {
  addKey(instance: InternalAxiosRequestConfig, apikey: string): void
}
class GeminiApiKeyStrategy implements IApiKeyStrategy {
  addKey(config: InternalAxiosRequestConfig, apikey: string): void {
    config.headers.set('x-goog-api-key', apikey)
  }
}
class StandardBearerStrategy implements IApiKeyStrategy {
  addKey(config: InternalAxiosRequestConfig, apikey: string): void {
    config.headers.set('Authorization', `Bearer ${apikey}`);
  }
}
class ApiKeyStrategyEngine {
  private readonly strategies: Record<string, IApiKeyStrategy> = {
    'GEMINI': new GeminiApiKeyStrategy(),
  };
  addKey(config: InternalAxiosRequestConfig, apikey: string, apiName: string) {
    const strategy = this.strategies[apiName] || new StandardBearerStrategy();
    if (strategy) {
      strategy.addKey(config, apikey);
    }
  }
}
const getApiKey = (apiName: string) => {
  return localStorage.getItem(apiName + '_API_KEYZ') ?? undefined
}

export const geminiApi = axios.create({
  baseURL: import.meta.env.VITE_GEMINI_LITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});
const engine = new ApiKeyStrategyEngine();
const setupInterceptors = (instance: AxiosInstance, apiName = 'DEFAULT') => {
  instance.interceptors.request.use((config) => {
    const apiKey = getApiKey(apiName)
    if(!apiKey) {
      showModal(MissingApiKeyInLocalStorageModal, {apiKeyName: apiName + '_API_KEY'})
      return Promise.reject(new axios.Cancel('Clé absente.'));
    }
    engine.addKey(config, apiKey, apiName)
    showLoader();
    return config;
  }, (error) => {
    hideLoader();
    return Promise.reject(error as Error);
  });

  instance.interceptors.response.use(
    (response) => {
      hideLoader();
      return response.data; 
    },
    (error) => {
      hideLoader();

      let errorMessage

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (apiName === 'GEMINI' && data?.error) {
          const geminiCode = data.error.status;
          switch (geminiCode) {
            case 'RESOURCE_EXHAUSTED':
              errorMessage = "Quota Gemini épuisé. Réessayez plus tard.";
              break;
            case 'PERMISSION_DENIED':
              errorMessage = "Clé API Gemini invalide.";
              break;
            default:
              errorMessage = `Erreur Gemini : ${data.error.message}`;
          }
        } 
        else {
          switch (status) {
            case 401: errorMessage = "Session expirée."; break;
            case 403: errorMessage = "Accès refusé."; break;
            case 404: errorMessage = "Ressource introuvable."; break;
            default: errorMessage = `Erreur serveur (${status}).`;
          }
        }
      } else {
        errorMessage = "Impossible de contacter le serveur.";
      }
      triggerNotification('Erreur', errorMessage, EnumTypeNotification.ERROR);
      return Promise.reject(error as Error);
    }
  );
};

setupInterceptors(geminiApi, 'GEMINI');
