import {MetadataKey} from '@e22m4u/ts-reflector';
import {OAParameterObject} from '../../document-types';

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
export const OA_PARAMETERS_METADATA_KEY =
  new MetadataKey<OAParametersMetadataMap>('openApiParametersMetadataKey');
