import { ref, type Component, shallowRef } from "vue";
export enum EnumModalType {
  MISSING_API_KEY_IN_LOCAL_STORAGE='missingApiKeyInLocalStorage'
}

export const currentOpenModal = shallowRef<undefined|Component>(undefined)
export const currentOpenModalProps = ref<any>({})
export const showModalMissingApiKeyInLocalStorage = ref(false)
export const showModal = (modalType: Component, props: any) => {
  currentOpenModal.value = modalType
  currentOpenModalProps.value = props
}
export const closeModal = () => {
  currentOpenModal.value = undefined
  currentOpenModalProps.value = undefined
}