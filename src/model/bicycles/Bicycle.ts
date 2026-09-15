import type { IBicycleDTO } from "@/model/bicycles/IBicycleDTO";
import { PlainJsObject } from "../PlainJsObject";
import type { Customer } from "../customers/Customer";

export class Bicycle extends PlainJsObject{
  id: string
  serialnumber?: string
  designation: string
  ownerId: string
  owner?: Customer
  changeDate: Date
  constructor(dto: IBicycleDTO) {
    super()
    this.id = dto.id
    this.serialnumber = dto.serialnumber
    this.designation = dto.designation
    this.ownerId = dto.owner
    this.changeDate = this.convertToDate(dto.changeDate)
  }
}