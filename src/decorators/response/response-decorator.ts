import {Prototype} from '../../types';
import {Constructor} from '../../types';
import {OAResponseMetadata} from './response-metadata';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {OAResponseReflector} from './response-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';

/**
 * Response decorator.
 *
 * @param metadata
 */
export function OAResponse<T extends object>(metadata: OAResponseMetadata) {
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
        '@OAResponse decorator is only supported on an instance method.',
      );
    OAResponseReflector.setMetadata(
      metadata,
      target.constructor as Constructor<T>,
      propertyKey,
    );
  };
}
