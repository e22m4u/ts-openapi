import { Flatten } from './types.js';
import { Constructor } from './types.js';
import { OADocumentObject } from './document-types.js';
/**
 * OpenAPI version.
 */
export declare const OPENAPI_VERSION = "3.1.0";
/**
 * Document builder.
 */
export declare class OADocumentBuilder {
    /**
     * Open Api Document.
     *
     * @protected
     */
    protected doc: OADocumentObject;
    /**
     * Constructor.
     *
     * @param doc
     */
    constructor(doc: Flatten<Omit<OADocumentObject, 'openapi'>>);
    /**
     * Returns the OADocumentObject.
     */
    build(): OADocumentObject;
    /**
     * Use classes metadata.
     *
     * @param targets
     */
    useClassesMetadata(targets: Constructor[]): this;
    /**
     * User class metadata.
     *
     * @param target
     */
    useClassMetadata(target: Constructor): this;
}
