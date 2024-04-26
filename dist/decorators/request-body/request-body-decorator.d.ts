import { Prototype } from '../../types';
import { OARequestBodyMetadata } from './request-body-metadata';
/**
 * Request body decorator.
 *
 * @param metadata
 */
export declare function OARequestBody<T extends object>(metadata: OARequestBodyMetadata): (target: Prototype<T>, propertyKey: string, indexOrDescriptor: PropertyDescriptor | number) => void;
