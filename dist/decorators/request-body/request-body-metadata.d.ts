import { MetadataKey } from '@e22m4u/ts-reflector';
import { OAMediaType } from '../../document-types.js';
import { OASchemaObject } from '../../document-types.js';
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
export declare const OA_REQUEST_BODIES_METADATA_KEY: MetadataKey<OARequestBodiesMetadataMap>;
