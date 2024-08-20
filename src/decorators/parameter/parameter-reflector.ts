import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {OAParameterMetadata} from './parameter-metadata.js';
import {OAParametersMetadataMap} from './parameter-metadata.js';
import {OA_PARAMETERS_METADATA_KEY} from './parameter-metadata.js';

/**
 * Parameter reflector.
 */
export class OAParameterReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(
    metadata: OAParameterMetadata,
    target: Constructor,
    propertyKey: string,
  ) {
    const oldMap = Reflector.getOwnMetadata(OA_PARAMETERS_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    const metadataList = newMap.get(propertyKey) ?? [];
    metadataList.push(metadata);
    newMap.set(propertyKey, metadataList);
    Reflector.defineMetadata(OA_PARAMETERS_METADATA_KEY, newMap, target);
  }

  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target: Constructor): OAParametersMetadataMap {
    const metadata = Reflector.getOwnMetadata(
      OA_PARAMETERS_METADATA_KEY,
      target,
    );
    return metadata ?? new Map();
  }
}
