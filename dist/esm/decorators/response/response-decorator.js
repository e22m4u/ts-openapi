import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { OAResponseReflector } from './response-reflector.js';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
/**
 * Response decorator.
 *
 * @param metadata
 */
export function oaResponse(metadata) {
    return function (target, propertyKey, descriptor) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
        if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD)
            throw new Error('@oaResponse decorator is only supported on an instance method.');
        OAResponseReflector.setMetadata(metadata, target.constructor, propertyKey);
    };
}
