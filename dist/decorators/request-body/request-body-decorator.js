"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OARequestBody = void 0;
const ts_reflector_1 = require("@e22m4u/ts-reflector");
const ts_reflector_2 = require("@e22m4u/ts-reflector");
const request_body_reflector_1 = require("./request-body-reflector");
/**
 * Request body decorator.
 *
 * @param metadata
 */
function OARequestBody(metadata) {
    return function (target, propertyKey, indexOrDescriptor) {
        const decoratorType = (0, ts_reflector_2.getDecoratorTargetType)(target, propertyKey, indexOrDescriptor);
        if (decoratorType !== ts_reflector_1.DecoratorTargetType.INSTANCE_METHOD &&
            decoratorType !== ts_reflector_1.DecoratorTargetType.INSTANCE_METHOD_PARAMETER) {
            throw new Error('@OARequestBody decorator is only supported on an instance method ' +
                'or an instance method parameter.');
        }
        request_body_reflector_1.OARequestBodyReflector.setMetadata(metadata, target.constructor, propertyKey);
    };
}
exports.OARequestBody = OARequestBody;
