"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAResponseReflector = void 0;
const ts_reflector_1 = require("@e22m4u/ts-reflector");
const response_metadata_1 = require("./response-metadata");
/**
 * Response reflector.
 */
class OAResponseReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata, target, propertyKey) {
        var _a;
        const oldMap = ts_reflector_1.Reflector.getOwnMetadata(response_metadata_1.OA_RESPONSES_METADATA_KEY, target);
        const newMap = new Map(oldMap);
        const metadataList = (_a = newMap.get(propertyKey)) !== null && _a !== void 0 ? _a : [];
        metadataList.push(metadata);
        newMap.set(propertyKey, metadataList);
        ts_reflector_1.Reflector.defineMetadata(response_metadata_1.OA_RESPONSES_METADATA_KEY, newMap, target);
    }
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target) {
        const metadata = ts_reflector_1.Reflector.getOwnMetadata(response_metadata_1.OA_RESPONSES_METADATA_KEY, target);
        return metadata !== null && metadata !== void 0 ? metadata : new Map();
    }
}
exports.OAResponseReflector = OAResponseReflector;
