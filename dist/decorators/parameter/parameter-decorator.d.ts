import { Prototype } from '../../types.js';
import { OAParameterObject } from '../../document-types.js';
/**
 * Parameter decorator.
 *
 * @param metadata
 */
export declare function OAParameter<T extends object>(metadata: OAParameterObject): (target: Prototype<T>, propertyKey: string, indexOrDescriptor: PropertyDescriptor | number) => void;
