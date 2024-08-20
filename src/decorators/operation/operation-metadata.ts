import {MetadataKey} from '@e22m4u/ts-reflector';
import {OAOperationMethod} from '../../document-types.js';
import {OAOperationObject} from '../../document-types.js';

/**
 * Operation metadata.
 */
export type OAOperationMetadata = {
  method: OAOperationMethod;
  path: string;
} & OAOperationObject;

/**
 * Operation metadata map.
 */
export type OAOperationMetadataMap = Map<string, OAOperationMetadata>;

/**
 * Operations metadata key.
 */
export const OA_OPERATIONS_METADATA_KEY =
  new MetadataKey<OAOperationMetadataMap>('openApiOperationsMetadataKey');
