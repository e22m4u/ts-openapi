import { MetadataKey } from '@e22m4u/ts-reflector';
import { OAParameterObject } from '../../document-types.js';
/**
 * Parameter metadata.
 */
export type OAParameterMetadata = OAParameterObject;
/**
 * Parameters metadata map.
 */
export type OAParametersMetadataMap = Map<string, OAParameterMetadata[]>;
/**
 * Parameters metadata key.
 */
export declare const OA_PARAMETERS_METADATA_KEY: MetadataKey<OAParametersMetadataMap>;
