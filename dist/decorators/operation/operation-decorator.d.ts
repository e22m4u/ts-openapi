import { Prototype } from '../../types';
import { OAOperationMetadata } from './operation-metadata';
/**
 * Operation decorator.
 *
 * @param metadata
 */
export declare function OAOperation<T extends object>(metadata: OAOperationMetadata): (target: Prototype<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
