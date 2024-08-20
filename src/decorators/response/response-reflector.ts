import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {OAResponseMetadata} from './response-metadata.js';
import {OAResponseMetadataMap} from './response-metadata.js';
import {OA_RESPONSES_METADATA_KEY} from './response-metadata.js';

/**
 * Response reflector.
 */
export class OAResponseReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(
    metadata: OAResponseMetadata,
    target: Constructor,
    propertyKey: string,
  ) {
    const oldMap = Reflector.getOwnMetadata(OA_RESPONSES_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    const metadataList = newMap.get(propertyKey) ?? [];
    metadataList.push(metadata);
    newMap.set(propertyKey, metadataList);
    Reflector.defineMetadata(OA_RESPONSES_METADATA_KEY, newMap, target);
  }

  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target: Constructor): OAResponseMetadataMap {
    const metadata = Reflector.getOwnMetadata(
      OA_RESPONSES_METADATA_KEY,
      target,
    );
    return metadata ?? new Map();
  }
}
