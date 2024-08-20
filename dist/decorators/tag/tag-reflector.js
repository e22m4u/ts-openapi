import { Reflector } from '@e22m4u/ts-reflector';
import { OA_TAG_METADATA_KEY } from './tag-metadata.js';
/**
 * Tag reflector.
 */
export class OATagReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     */
    static setMetadata(metadata, target) {
        return Reflector.defineMetadata(OA_TAG_METADATA_KEY, metadata, target);
    }
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target) {
        return Reflector.getOwnMetadata(OA_TAG_METADATA_KEY, target);
    }
}
