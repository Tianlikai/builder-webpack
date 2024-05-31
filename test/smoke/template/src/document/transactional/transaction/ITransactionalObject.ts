import { Property } from "./Property";

/**
 * 支持事务的对象接口，身上可以设置支持事务的属性列表
 */
export abstract class ITransactionalObject {
  readonly propertyMap: { [key: string]: Property } = {};
  static MapperKey: string;

  /** 是否被作为属性字段设置到其他的对象上 */
  _isReferenceAsProperty = false;

  get isPersistence() {
    return true;
  }

  addProperty(property: Property): void {
    this.propertyMap[property.name] = property;
  }

  getProperty(name: string): Property | undefined {
    return this.propertyMap[name];
  }

  getSerializableType(): string {
    /**
     * JS中的类本质上是一个对象（闭包），所以在this.constructor上定义的MapperKey
     * 不等同于ITransactionalObject上的MapperKey，这样每个子类都有不同的MapperKey
     * 详见：ObjectMapper的实现
     */
    return (this.constructor as typeof ITransactionalObject).MapperKey;
  }

  abstract onTrackProperty(property: Property): void;

  abstract onBeforeChangeProperty(prop: Property): void;

  abstract onChangeProperty(prop: Property): void;

  abstract dumpAsObj(): any;
}
