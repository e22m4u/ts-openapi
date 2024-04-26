import { Flatten } from '../../types';
import { PartialBy } from '../../types';
import { Constructor } from '../../types';
import { OATagMetadata } from './tag-metadata';
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
