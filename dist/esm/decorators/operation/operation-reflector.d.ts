import { Constructor } from '../../types.js';
import { OAOperationMetadata } from './operation-metadata.js';
import { OAOperationMetadataMap } from './operation-metadata.js';
/**
 * Operation reflector.
 */
export declare class OAOperationReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata: OAOperationMetadata, target: Constructor, propertyKey: string): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): OAOperationMetadataMap;
}
