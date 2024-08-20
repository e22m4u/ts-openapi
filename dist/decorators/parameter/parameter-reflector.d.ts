import { Constructor } from '../../types.js';
import { OAParameterMetadata } from './parameter-metadata.js';
import { OAParametersMetadataMap } from './parameter-metadata.js';
/**
 * Parameter reflector.
 */
export declare class OAParameterReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata: OAParameterMetadata, target: Constructor, propertyKey: string): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): OAParametersMetadataMap;
}
