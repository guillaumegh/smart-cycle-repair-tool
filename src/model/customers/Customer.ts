import { PlainJsObject } from "../PlainJsObject"
import type { ICustomerDTO } from "./ICustomerDTO"

export class Customer extends PlainJsObject{
  id: string
  firstname: string
  lastname: string
  phoneNumber: string
  email: string
  address: string
  changeDate: Date
  constructor(customer: ICustomerDTO) {
    super()
    this.id = customer.id
    this.firstname = customer.firstname
    this.lastname = customer.lastname
    this.address = customer.address
    this.phoneNumber = customer.phoneNumber
    this.email = customer.email
    this.changeDate = this.convertToDate(customer.changeDate)
  }
}