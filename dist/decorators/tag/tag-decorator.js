import { OATagReflector } from './tag-reflector.js';
import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
/**
 * Tag decorator.
 *
 * @param options
 */
export function OATag(options) {
    return function (target) {
        const decoratorType = getDecoratorTargetType(target);
        if (decoratorType !== DecoratorTargetType.CONSTRUCTOR)
            throw new Error('@OATag decorator is only supported on a class.');
        const nameByOptions = options?.name;
        const nameByClass = target.name.replace(/controller$/i, '');
        const metadata = {
            ...options,
            name: nameByOptions || nameByClass,
        };
        OATagReflector.setMetadata(metadata, target);
    };
}
