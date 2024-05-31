import { property } from "./transactional/helper/property";
import { BasePropertyType } from "./transactional/transaction/BasePropertyType";

export default class Element {
  @property({ propertyType: BasePropertyType.String })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
