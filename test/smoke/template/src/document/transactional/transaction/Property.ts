import { ITransactionalObject } from './ITransactionalObject';
import { ITransactionalObjectSet } from './ITransactionalObjectSet';

export function disablePropertyGetTrack(target: Object, key: string, descriptor: PropertyDescriptor) {
    const origMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const oldFlag = Property.isGetPropertyTrack;
        try {
            Property.isGetPropertyTrack = false;
            const result = origMethod.apply(this, args);
            return result;
        } finally {
            Property.isGetPropertyTrack = oldFlag;
        }
    };

    return descriptor;
}

export function disablePropertySetTrack(target: Object, key: string, descriptor: PropertyDescriptor) {
    const origMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const oldFlag = Property.isSetPropertyTrack;
        try {
            Property.isSetPropertyTrack = false;
            const result = origMethod.apply(this, args);
            return result;
        } finally {
            Property.isSetPropertyTrack = oldFlag;
        }
    };

    return descriptor;
}

/**
 * 支持事务的属性
 */
export class Property<T = any> {
    private value?: T;

    readonly name: string;
    readonly host?: ITransactionalObject;
    trackable: boolean;
    transactional: boolean;
    propertyType: string;
    static isGetPropertyTrack: boolean = true;
    static isSetPropertyTrack: boolean = true;

    constructor(name: string, host?: ITransactionalObject, value?: T) {
        this.name = name;
        this.value = value;
        this.host = host;
    }

    copy(): Property {
        const newProp = new Property(this.name, this.host, this.value);
        newProp.propertyType = this.propertyType;
        return newProp;
    }

    paste(prop: Property): void {
        this.setValue(prop.value);
    }

    getValue(): T | undefined {
        if (Property.isGetPropertyTrack && this.host) {
            this.host.onTrackProperty(this);
        }
        return this.value;
    }

    setValue(value?: T): void {
        if (this.value !== value) {
            if (value instanceof ITransactionalObjectSet) {
                value.property = this;
            } else if (value instanceof ITransactionalObject) {
                (value as ITransactionalObject)._isReferenceAsProperty = true;
            }
            if (Property.isSetPropertyTrack && this.host && this.host._isReferenceAsProperty) {
                this.host.onBeforeChangeProperty(this);
            }
            this.value = value;
            if (Property.isSetPropertyTrack && this.host && this.host._isReferenceAsProperty) {
                this.host.onChangeProperty(this);
            }
        }
    }
}
