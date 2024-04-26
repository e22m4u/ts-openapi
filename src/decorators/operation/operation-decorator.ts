import {Prototype} from '../../types';
import {Constructor} from '../../types';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {OAOperationMetadata} from './operation-metadata';
import {OAOperationReflector} from './operation-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';

/**
 * Operation decorator.
 *
 * @param metadata
 */
export function OAOperation<T extends object>(metadata: OAOperationMetadata) {
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
        '@OAOperation decorator is only supported on an instance method.',
      );
    OAOperationReflector.setMetadata(
      metadata,
      target.constructor as Constructor<T>,
      propertyKey,
    );
  };
}
