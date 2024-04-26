"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OATag = void 0;
const tag_reflector_1 = require("./tag-reflector");
const ts_reflector_1 = require("@e22m4u/ts-reflector");
const ts_reflector_2 = require("@e22m4u/ts-reflector");
/**
 * Tag decorator.
 *
 * @param options
 */
function OATag(options) {
    return function (target) {
        const decoratorType = (0, ts_reflector_2.getDecoratorTargetType)(target);
        if (decoratorType !== ts_reflector_1.DecoratorTargetType.CONSTRUCTOR)
            throw new Error('@OATag decorator is only supported on a class.');
        const nameByOptions = options === null || options === void 0 ? void 0 : options.name;
        const nameByClass = target.name.replace(/controller$/i, '');
        const metadata = Object.assign(Object.assign({}, options), { name: nameByOptions || nameByClass });
        tag_reflector_1.OATagReflector.setMetadata(metadata, target);
    };
}
exports.OATag = OATag;
