import {Constructor} from '../../types';
import {Reflector} from '@e22m4u/ts-reflector';
import {OARequestBodyMetadata} from './request-body-metadata';
import {OARequestBodiesMetadataMap} from './request-body-metadata';
import {OA_REQUEST_BODIES_METADATA_KEY} from './request-body-metadata';

/**
 * Request body reflector.
 */
export class OARequestBodyReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(
    metadata: OARequestBodyMetadata,
    target: Constructor,
    propertyKey: string,
  ) {
    const oldMap = Reflector.getOwnMetadata(
      OA_REQUEST_BODIES_METADATA_KEY,
      target,
    );
    const newMap = new Map(oldMap);
    const metadataList = newMap.get(propertyKey) ?? [];
    metadataList.push(metadata);
    newMap.set(propertyKey, metadataList);
    Reflector.defineMetadata(OA_REQUEST_BODIES_METADATA_KEY, newMap, target);
  }

  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target: Constructor): OARequestBodiesMetadataMap {
    const metadata = Reflector.getOwnMetadata(
      OA_REQUEST_BODIES_METADATA_KEY,
      target,
    );
    return metadata ?? new Map();
  }
}
