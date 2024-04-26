import {MetadataKey} from '@e22m4u/ts-reflector';
import {OAMediaType} from '../../document-types';
import {OASchemaObject} from '../../document-types';

/**
 * Request body metadata.
 */
export type OARequestBodyMetadata = {
  mediaType: OAMediaType | string;
  description?: string;
  schema: OASchemaObject;
  example?: unknown;
  required?: boolean;
};

/**
 * Request bodies metadata map.
 */
export type OARequestBodiesMetadataMap = Map<string, OARequestBodyMetadata[]>;

/**
 * Request body metadata key.
 */
export const OA_REQUEST_BODIES_METADATA_KEY =
  new MetadataKey<OARequestBodiesMetadataMap>('openApiRequestBodiesMetadataKey');
