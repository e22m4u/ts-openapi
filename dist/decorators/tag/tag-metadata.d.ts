import { MetadataKey } from '@e22m4u/ts-reflector';
import { OATagObject } from '../../document-types';
/**
 * Tag metadata.
 */
export type OATagMetadata = {
    path?: string;
} & OATagObject;
/**
 * Tag metadata key.
 */
export declare const OA_TAG_METADATA_KEY: MetadataKey<OATagMetadata>;
