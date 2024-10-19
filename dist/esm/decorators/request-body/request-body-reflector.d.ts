import { Constructor } from '../../types.js';
import { OARequestBodyMetadata } from './request-body-metadata.js';
import { OARequestBodiesMetadataMap } from './request-body-metadata.js';
/**
 * Request body reflector.
 */
export declare class OARequestBodyReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata: OARequestBodyMetadata, target: Constructor, propertyKey: string): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): OARequestBodiesMetadataMap;
}
