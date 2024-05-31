import { BasePropertyType } from "../transaction/BasePropertyType";

interface Options {
  propertyType?: string;
  transactional?: boolean;
  trackable?: boolean;
}

export const __propertyMap: any = {};

/**
 * 注解方式定义一个支持事务的属性
 * @param options 属性类型
 * @returns 支持事务的属性
 */
export function property(options?: Options) {
  const {
    propertyType = BasePropertyType.Unknown,
    transactional = true,
    trackable = true,
  } = options || {};
  console.log("property");
  return function (target: Object, propertyName: string) {
    let value: any;

    Object.defineProperty(target, propertyName, {
      configurable: true,
      enumerable: true,
      get(this: any) {
        console.log("get");
        return value;
        // // 函数调用存在性能开销
        // let prop = this.propertyMap[propertyName];
        // if (prop === undefined) {
        //   prop = new Property(propertyName, this, undefined);
        //   prop.propertyType = propertyType;
        //   prop.transactional = transactional;
        //   prop.trackable = trackable;
        //   this.propertyMap[propertyName] = prop;
        // }
        // return prop.getValue();
      },
      set(this: any, val: any) {
        console.log("set");
        value = val;
        // this[propertyName] = value;
        // let prop = this.propertyMap[propertyName];
        // if (prop === undefined) {
        //   prop = new Property(propertyName, this, undefined);
        //   prop.propertyType = propertyType;
        //   prop.transactional = transactional;
        //   prop.trackable = trackable;
        //   this.propertyMap[propertyName] = prop;
        // }
        // prop.setValue(value);
      },
    });

    return Object.getOwnPropertyDescriptor(target, propertyName);
  };
}
