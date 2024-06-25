"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAResponse = OAResponse;
const ts_reflector_1 = require("@e22m4u/ts-reflector");
const response_reflector_1 = require("./response-reflector");
const ts_reflector_2 = require("@e22m4u/ts-reflector");
/**
 * Response decorator.
 *
 * @param metadata
 */
function OAResponse(metadata) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = (0, ts_reflector_2.getDecoratorTargetType)(target, propertyKey, descriptor);
        if (decoratorType !== ts_reflector_1.DecoratorTargetType.INSTANCE_METHOD)
            throw new Error('@OAResponse decorator is only supported on an instance method.');
        response_reflector_1.OAResponseReflector.setMetadata(metadata, target.constructor, propertyKey);
    };
}
