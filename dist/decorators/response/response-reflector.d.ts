import { Constructor } from '../../types';
import { OAResponseMetadata } from './response-metadata';
import { OAResponseMetadataMap } from './response-metadata';
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
