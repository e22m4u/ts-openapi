import { Constructor } from '../../types';
import { OAParameterMetadata } from './parameter-metadata';
import { OAParametersMetadataMap } from './parameter-metadata';
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
