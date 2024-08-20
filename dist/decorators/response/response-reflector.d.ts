import { Constructor } from '../../types.js';
import { OAResponseMetadata } from './response-metadata.js';
import { OAResponseMetadataMap } from './response-metadata.js';
/**
 * Response reflector.
 */
export declare class OAResponseReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata: OAResponseMetadata, target: Constructor, propertyKey: string): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): OAResponseMetadataMap;
}
