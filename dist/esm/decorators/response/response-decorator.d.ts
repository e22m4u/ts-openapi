import { Prototype } from '../../types.js';
import { OAResponseMetadata } from './response-metadata.js';
/**
 * Response decorator.
 *
 * @param metadata
 */
export declare function oaResponse<T extends object>(metadata: OAResponseMetadata): (target: Prototype<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
