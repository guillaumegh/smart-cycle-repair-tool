export enum EnumTypeNotification {
  ERROR='error',WARNING='warning',INFO='info'
}
export interface INotification {
  titre: string
  type?: EnumTypeNotification
  message: string
  id: string
}