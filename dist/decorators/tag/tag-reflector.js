"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OATagReflector = void 0;
const ts_reflector_1 = require("@e22m4u/ts-reflector");
const tag_metadata_1 = require("./tag-metadata");
/**
 * Tag reflector.
 */
class OATagReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     */
    static setMetadata(metadata, target) {
        return ts_reflector_1.Reflector.defineMetadata(tag_metadata_1.OA_TAG_METADATA_KEY, metadata, target);
    }
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target) {
        return ts_reflector_1.Reflector.getOwnMetadata(tag_metadata_1.OA_TAG_METADATA_KEY, target);
    }
}
exports.OATagReflector = OATagReflector;
