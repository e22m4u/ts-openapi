"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAOperationReflector = void 0;
const ts_reflector_1 = require("@e22m4u/ts-reflector");
const operation_metadata_1 = require("./operation-metadata");
/**
 * Operation reflector.
 */
class OAOperationReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata, target, propertyKey) {
        const oldMap = ts_reflector_1.Reflector.getOwnMetadata(operation_metadata_1.OA_OPERATIONS_METADATA_KEY, target);
        const newMap = new Map(oldMap);
        newMap.set(propertyKey, metadata);
        ts_reflector_1.Reflector.defineMetadata(operation_metadata_1.OA_OPERATIONS_METADATA_KEY, newMap, target);
    }
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target) {
        const metadata = ts_reflector_1.Reflector.getOwnMetadata(operation_metadata_1.OA_OPERATIONS_METADATA_KEY, target);
        return metadata !== null && metadata !== void 0 ? metadata : new Map();
    }
}
exports.OAOperationReflector = OAOperationReflector;
