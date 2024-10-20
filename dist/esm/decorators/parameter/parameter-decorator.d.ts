import { Prototype } from '../../types.js';
import { OAParameterObject } from '../../document-types.js';
/**
 * Parameter decorator.
 *
 * @param metadata
 */
export declare function oaParameter<T extends object>(metadata: OAParameterObject): (target: Prototype<T>, propertyKey: string, indexOrDescriptor: PropertyDescriptor | number) => void;
