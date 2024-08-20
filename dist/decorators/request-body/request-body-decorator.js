import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { OARequestBodyReflector } from './request-body-reflector.js';
/**
 * Request body decorator.
 *
 * @param metadata
 */
export function OARequestBody(metadata) {
    return function (target, propertyKey, indexOrDescriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, indexOrDescriptor);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD &&
            decoratorType !== DecoratorTargetType.INSTANCE_METHOD_PARAMETER) {
            throw new Error('@OARequestBody decorator is only supported on an instance method ' +
                'or an instance method parameter.');
        }
        OARequestBodyReflector.setMetadata(metadata, target.constructor, propertyKey);
    };
}
