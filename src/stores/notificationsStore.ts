import { ref } from "vue"
import { EnumTypeNotification, type INotification } from "../model/Notification"
import {v4 as uuid} from 'uuid';

export const notifications = ref<Array<INotification>>([])

export const triggerNotification = (titre: string, message: string, type: EnumTypeNotification = EnumTypeNotification.ERROR) => {
  notifications.value.push({
    titre,
    message: message, 
    type: type, 
    id: uuid()
  } as INotification) 
}
export const closeNotification = (notification: INotification) => {
  notifications.value = notifications.value.filter(n => n.id !== notification.id)
}