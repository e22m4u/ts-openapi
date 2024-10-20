import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {OAOperationMetadata} from './operation-metadata.js';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {OAOperationReflector} from './operation-reflector.js';

/**
 * Operation decorator.
 *
 * @param metadata
 */
export function oaOperation<T extends object>(metadata: OAOperationMetadata) {
  return function (
    target: Prototype<T>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const decoratorType = getDecoratorTargetType(
      target,
      propertyKey,
      descriptor,
    );
    if (decoratorType !== DecoratorTargetType.INSTANCE_METHOD)
      throw new Error(
        '@oaOperation decorator is only supported on an instance method.',
      );
    OAOperationReflector.setMetadata(
      metadata,
      target.constructor as Constructor<T>,
      propertyKey,
    );
  };
}
