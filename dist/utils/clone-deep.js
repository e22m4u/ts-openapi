"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneDeep = cloneDeep;
/**
 * Clone deep.
 *
 * @param value
 */
function cloneDeep(value) {
    return JSON.parse(JSON.stringify(value));
}
