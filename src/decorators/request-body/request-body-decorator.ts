import {Prototype} from '../../types';
import {Constructor} from '../../types';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {OARequestBodyMetadata} from './request-body-metadata';
import {OARequestBodyReflector} from './request-body-reflector';

/**
 * Request body decorator.
 *
 * @param metadata
 */
export function OARequestBody<T extends object>(
  metadata: OARequestBodyMetadata,
) {
  return function (
    target: Prototype<T>,
    propertyKey: string,
    indexOrDescriptor: PropertyDescriptor | number,
  ) {
    const decoratorType = getDecoratorTargetType(
      target,
      propertyKey,
      indexOrDescriptor,
    );
    if (
      decoratorType !== DecoratorTargetType.INSTANCE_METHOD &&
      decoratorType !== DecoratorTargetType.INSTANCE_METHOD_PARAMETER
    ) {
      throw new Error(
        '@OARequestBody decorator is only supported on an instance method ' +
          'or an instance method parameter.',
      );
    }
    OARequestBodyReflector.setMetadata(
      metadata,
      target.constructor as Constructor<T>,
      propertyKey,
    );
  };
}
