"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAOperation = OAOperation;
const ts_reflector_1 = require("@e22m4u/ts-reflector");
const operation_reflector_1 = require("./operation-reflector");
const ts_reflector_2 = require("@e22m4u/ts-reflector");
/**
 * Operation decorator.
 *
 * @param metadata
 */
function OAOperation(metadata) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = (0, ts_reflector_2.getDecoratorTargetType)(target, propertyKey, descriptor);
        if (decoratorType !== ts_reflector_1.DecoratorTargetType.INSTANCE_METHOD)
            throw new Error('@OAOperation decorator is only supported on an instance method.');
        operation_reflector_1.OAOperationReflector.setMetadata(metadata, target.constructor, propertyKey);
    };
}
