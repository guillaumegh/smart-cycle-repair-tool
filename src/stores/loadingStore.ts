import { computed, ref } from "vue";
const activeRequests = ref(0)
export const isLoading = computed(() => activeRequests.value > 0)
export const showLoader = () => {
  activeRequests.value++
}
export const hideLoader = () => {
  if(activeRequests.value > 0) {
    activeRequests.value--
  }
}