import { Property } from './Property';

/**
 * 支持事务的嵌套对象接口，身上可以设置支持事务的属性列表
 */
export abstract class ITransactionalObjectSet {
    property: Property;
}
