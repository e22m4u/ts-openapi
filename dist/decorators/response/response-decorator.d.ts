import { Prototype } from '../../types';
import { OAResponseMetadata } from './response-metadata';
/**
 * Response decorator.
 *
 * @param metadata
 */
export declare function OAResponse<T extends object>(metadata: OAResponseMetadata): (target: Prototype<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
