import { Bicycle } from "@/model/bicycles/Bicycle";
import type { IBicycleDTO } from "@/model/bicycles/IBicycleDTO";
import { Customer } from "@/model/customers/Customer";
import type { ICustomerDTO } from "@/model/customers/ICustomerDTO";
import axios from "axios";

export const getCustomers = async (lastSyncDate?: Date): Promise<Array<Customer>> => {
  return axios.get<Array<ICustomerDTO>>("/api/customers")
  .then((response) => {
    const data = response.data.map(c => new Customer(c))
    if(!lastSyncDate) return data
    return data.filter(c => c.changeDate > lastSyncDate)
  })
}

export const getBicycles = async (lastSyncDate?: Date): Promise<Array<Bicycle>> => {
  return axios.get<Array<IBicycleDTO>>("/api/bicycles")
  .then((response) => {
    const data = response.data.map(b => new Bicycle(b))
    if(!lastSyncDate) return data
    return data.filter(c => c.changeDate > lastSyncDate)
  })
}

export const getUserByFirstNameOrLastName = async (prompt: string): Promise<Array<{lastname: string, firstname: string}>> => {
  const lowerCasedPrompt = prompt.toLowerCase()
  return axios.get<Array<{lastname: string, firstname: string}>>("/api/customers")
  .then((response) => {
    return response.data.filter(u => u.lastname.toLowerCase().includes(lowerCasedPrompt) || u.firstname.toLowerCase().includes(lowerCasedPrompt))
  })
}