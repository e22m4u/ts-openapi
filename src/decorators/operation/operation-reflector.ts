import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {OAOperationMetadata} from './operation-metadata.js';
import {OAOperationMetadataMap} from './operation-metadata.js';
import {OA_OPERATIONS_METADATA_KEY} from './operation-metadata.js';

/**
 * Operation reflector.
 */
export class OAOperationReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(
    metadata: OAOperationMetadata,
    target: Constructor,
    propertyKey: string,
  ) {
    const oldMap = Reflector.getOwnMetadata(OA_OPERATIONS_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    newMap.set(propertyKey, metadata);
    Reflector.defineMetadata(OA_OPERATIONS_METADATA_KEY, newMap, target);
  }

  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target: Constructor): OAOperationMetadataMap {
    const metadata = Reflector.getOwnMetadata(
      OA_OPERATIONS_METADATA_KEY,
      target,
    );
    return metadata ?? new Map();
  }
}
