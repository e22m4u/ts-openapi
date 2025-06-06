import {Flatten} from '../../types.js';
import {PartialBy} from '../../types.js';
import {Constructor} from '../../types.js';
import {OATagMetadata} from './tag-metadata.js';
import {OATagReflector} from './tag-reflector.js';
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
export function oaTag<T extends object>(options?: OATagOptions) {
  return function (target: Constructor<T>) {
    const decoratorType = getDecoratorTargetType(target);
    if (decoratorType !== DecoratorTargetType.CONSTRUCTOR)
      throw new Error('@oaTag decorator is only supported on a class.');
    const nameByOptions = options?.name;
    const nameByClass = target.name.replace(/controller$/i, '');
    const metadata = {
      ...options,
      name: nameByOptions || nameByClass,
    };
    OATagReflector.setMetadata(metadata, target);
  };
}
