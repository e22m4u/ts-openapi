import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
import { OAOperationReflector } from './operation-reflector.js';
/**
 * Operation decorator.
 *
 * @param metadata
 */
export function oaOperation(metadata) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD)
            throw new Error('@oaOperation decorator is only supported on an instance method.');
        OAOperationReflector.setMetadata(metadata, target.constructor, propertyKey);
    };
}
