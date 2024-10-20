import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {OAResponseMetadata} from './response-metadata.js';
import {OAResponseReflector} from './response-reflector.js';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';

/**
 * Response decorator.
 *
 * @param metadata
 */
export function oaResponse<T extends object>(metadata: OAResponseMetadata) {
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
        '@oaResponse decorator is only supported on an instance method.',
      );
    OAResponseReflector.setMetadata(
      metadata,
      target.constructor as Constructor<T>,
      propertyKey,
    );
  };
}
