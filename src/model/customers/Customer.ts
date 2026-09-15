import type { ICustomerDTO } from "./ICustomerDTO"

export class Customer {
  id: string
  firstname: string
  lastname: string
  phoneNumber: string
  email: string
  address: string
  registrationDate: Date
  constructor(customer: ICustomerDTO) {
    this.id = customer.id
    this.firstname = customer.firstname
    this.lastname = customer.lastname
    this.address = customer.address
    this.phoneNumber = customer.phoneNumber
    this.email = customer.email
    this.registrationDate = this.convertToDate(customer.registrationDate)
  }
  convertToDate(dateString: string) {
    let d = dateString.split("/");
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;     
}
}