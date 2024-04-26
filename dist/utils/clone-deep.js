"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneDeep = void 0;
/**
 * Clone deep.
 *
 * @param value
 */
function cloneDeep(value) {
    return JSON.parse(JSON.stringify(value));
}
exports.cloneDeep = cloneDeep;
