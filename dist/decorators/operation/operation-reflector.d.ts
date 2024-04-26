import { Constructor } from '../../types';
import { OAOperationMetadata } from './operation-metadata';
import { OAOperationMetadataMap } from './operation-metadata';
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
