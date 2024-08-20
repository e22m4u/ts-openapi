import {Prototype} from '../../types.js';
import {Constructor} from '../../types.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {OAParameterObject} from '../../document-types.js';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {OAParameterReflector} from './parameter-reflector.js';

/**
 * Parameter decorator.
 *
 * @param metadata
 */
export function OAParameter<T extends object>(metadata: OAParameterObject) {
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
        '@OAParameter decorator is only supported on an instance method ' +
          'or an instance method parameter.',
      );
    }
    OAParameterReflector.setMetadata(
      metadata,
      target.constructor as Constructor<T>,
      propertyKey,
    );
  };
}
