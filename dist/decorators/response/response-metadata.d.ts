import { MetadataKey } from '@e22m4u/ts-reflector';
import { OAMediaType } from '../../document-types';
import { OASchemaObject } from '../../document-types';
/**
 * Response metadata.
 */
export type OAResponseMetadata = {
    statusCode?: 'default' | number;
    mediaType: OAMediaType | string;
    description: string;
    schema: OASchemaObject;
    example?: unknown;
};
/**
 * Response metadata map.
 */
export type OAResponseMetadataMap = Map<string, OAResponseMetadata[]>;
/**
 * Responses metadata key.
 */
export declare const OA_RESPONSES_METADATA_KEY: MetadataKey<OAResponseMetadataMap>;
