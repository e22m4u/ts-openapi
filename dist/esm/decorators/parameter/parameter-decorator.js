import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { OAParameterReflector } from './parameter-reflector.js';
/**
 * Parameter decorator.
 *
 * @param metadata
 */
export function oaParameter(metadata) {
    return function (target, propertyKey, indexOrDescriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, indexOrDescriptor);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD &&
            decoratorType !== DecoratorTargetType.INSTANCE_METHOD_PARAMETER) {
            throw new Error('@oaParameter decorator is only supported on an instance method ' +
                'or an instance method parameter.');
        }
        OAParameterReflector.setMetadata(metadata, target.constructor, propertyKey);
    };
}
