import { Prototype } from '../../types.js';
import { OAOperationMetadata } from './operation-metadata.js';
/**
 * Operation decorator.
 *
 * @param metadata
 */
export declare function OAOperation<T extends object>(metadata: OAOperationMetadata): (target: Prototype<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
