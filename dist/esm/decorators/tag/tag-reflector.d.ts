import { Constructor } from '../../types.js';
import { OATagMetadata } from './tag-metadata.js';
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
