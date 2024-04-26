"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAParameter = void 0;
const ts_reflector_1 = require("@e22m4u/ts-reflector");
const ts_reflector_2 = require("@e22m4u/ts-reflector");
const parameter_reflector_1 = require("./parameter-reflector");
/**
 * Parameter decorator.
 *
 * @param metadata
 */
function OAParameter(metadata) {
    return function (target, propertyKey, indexOrDescriptor) {
        const decoratorType = (0, ts_reflector_2.getDecoratorTargetType)(target, propertyKey, indexOrDescriptor);
        if (decoratorType !== ts_reflector_1.DecoratorTargetType.INSTANCE_METHOD &&
            decoratorType !== ts_reflector_1.DecoratorTargetType.INSTANCE_METHOD_PARAMETER) {
            throw new Error('@OAParameter decorator is only supported on an instance method ' +
                'or an instance method parameter.');
        }
        parameter_reflector_1.OAParameterReflector.setMetadata(metadata, target.constructor, propertyKey);
    };
}
exports.OAParameter = OAParameter;
