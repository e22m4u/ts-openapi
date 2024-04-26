import {Flatten} from '../../types';
import {PartialBy} from '../../types';
import {Constructor} from '../../types';
import {OATagMetadata} from './tag-metadata';
import {OATagReflector} from './tag-reflector';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';

/**
 * Tag options.
 */
type OATagOptions = Flatten<PartialBy<OATagMetadata, 'name'>>;

/**
 * Tag decorator.
 *
 * @param options
 */
export function OATag<T extends object>(options?: OATagOptions) {
  return function (target: Constructor<T>) {
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
