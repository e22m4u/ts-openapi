import { Flatten } from '../../types.js';
import { PartialBy } from '../../types.js';
import { Constructor } from '../../types.js';
import { OATagMetadata } from './tag-metadata.js';
/**
 * Tag options.
 */
type OATagOptions = Flatten<PartialBy<OATagMetadata, 'name'>>;
/**
 * Tag decorator.
 *
 * @param options
 */
export declare function OATag<T extends object>(options?: OATagOptions): (target: Constructor<T>) => void;
export {};
