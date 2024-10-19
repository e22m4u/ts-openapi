import { Prototype } from '../../types.js';
import { OARequestBodyMetadata } from './request-body-metadata.js';
/**
 * Request body decorator.
 *
 * @param metadata
 */
export declare function OARequestBody<T extends object>(metadata: OARequestBodyMetadata): (target: Prototype<T>, propertyKey: string, indexOrDescriptor: PropertyDescriptor | number) => void;
