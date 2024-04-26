import { Constructor } from '../../types';
import { OATagMetadata } from './tag-metadata';
/**
 * Tag reflector.
 */
export declare class OATagReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     */
    static setMetadata(metadata: OATagMetadata, target: Constructor): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): OATagMetadata | undefined;
}
