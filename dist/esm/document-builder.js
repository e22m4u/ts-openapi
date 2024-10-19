import path from 'path';
import { cloneDeep } from './utils/index.js';
import { OATagReflector } from './decorators/index.js';
import { OAParameterLocation } from './document-types.js';
import { OAResponseReflector } from './decorators/index.js';
import { OAParameterReflector } from './decorators/index.js';
import { OAOperationReflector } from './decorators/index.js';
import { OARequestBodyReflector } from './decorators/index.js';
/**
 * Document builder.
 */
export class OADocumentBuilder {
    /**
     * Open Api Document.
     *
     * @protected
     */
    doc;
    /**
     * Constructor.
     *
     * @param doc
     */
    constructor(doc) {
        // avoid argument mutation
        this.doc = cloneDeep({ ...doc, openapi: '3.1.0' });
        // force openapi version
        this.doc.info.version = '3.1.0';
    }
    /**
     * Returns the OADocumentObject.
     */
    build() {
        return cloneDeep(this.doc);
    }
    /**
     * Use classes metadata.
     *
     * @param targets
     */
    useClassesMetadata(targets) {
        targets.forEach(target => this.useClassMetadata(target));
        return this;
    }
    /**
     * User class metadata.
     *
     * @param target
     */
    useClassMetadata(target) {
        // tag
        const tagMd = OATagReflector.getMetadata(target);
        const tagPath = tagMd?.path ?? '';
        const tagName = tagMd?.name;
        if (tagMd) {
            const tag = cloneDeep(tagMd);
            delete tag.path;
            this.doc.tags = this.doc.tags ?? [];
            this.doc.tags.push(tag);
        }
        // operations
        const operationMdMap = OAOperationReflector.getMetadata(target);
        operationMdMap.forEach((operationMd, methodName) => {
            const oaOperation = cloneDeep(operationMd);
            delete oaOperation.path;
            delete oaOperation.method;
            if (tagName != null) {
                oaOperation.tags = oaOperation.tags ?? [];
                oaOperation.tags.push(tagName);
            }
            const operationPath = path.join('/', tagPath, operationMd.path).replace(/\/$/, '') || '/';
            this.doc.paths = this.doc.paths ?? {};
            this.doc.paths[operationPath] = this.doc.paths[operationPath] ?? {};
            const oaPathItem = this.doc.paths[operationPath];
            oaPathItem[operationMd.method] = oaOperation;
            // parameters
            const parametersMdMap = OAParameterReflector.getMetadata(target);
            const parametersMd = parametersMdMap.get(methodName);
            if (parametersMd)
                parametersMd.reverse().forEach(parameterMd => {
                    oaOperation.parameters = oaOperation.parameters ?? [];
                    const required = parameterMd.in === OAParameterLocation.PATH || parameterMd.required;
                    oaOperation.parameters.push({ ...parameterMd, required });
                });
            // request body
            const requestBodiesMdMap = OARequestBodyReflector.getMetadata(target);
            const requestBodiesMd = requestBodiesMdMap.get(methodName);
            if (requestBodiesMd) {
                oaPathItem[operationMd.method] = oaPathItem[operationMd.method] ?? {};
                const oaOperation = oaPathItem[operationMd.method];
                requestBodiesMd.reverse().forEach(requestBodyMd => {
                    oaOperation.requestBody = oaOperation.requestBody ?? {
                        description: requestBodyMd.description,
                        content: {},
                        required: requestBodyMd.required,
                    };
                    const oaRequestBody = oaOperation.requestBody;
                    oaRequestBody.content[requestBodyMd.mediaType] = {
                        schema: requestBodyMd.schema,
                        example: requestBodyMd.example,
                    };
                });
            }
            // response
            const responsesMdMap = OAResponseReflector.getMetadata(target);
            const responsesMd = responsesMdMap.get(methodName);
            if (responsesMd) {
                oaPathItem[operationMd.method] = oaPathItem[operationMd.method] ?? {};
                const oaOperation = oaPathItem[operationMd.method];
                oaOperation.responses = oaOperation.responses ?? {};
                const oaResponses = oaOperation.responses;
                responsesMd.reverse().forEach(responseMd => {
                    const statusCode = responseMd.statusCode
                        ? String(responseMd.statusCode)
                        : 'default';
                    oaResponses[statusCode] = oaResponses[statusCode] ?? {
                        description: responseMd.description,
                    };
                    const oaResponse = oaResponses[statusCode];
                    oaResponse.content = oaResponse.content ?? {};
                    const oaContent = oaResponse.content;
                    oaContent[responseMd.mediaType] = {
                        schema: responseMd.schema,
                        example: responseMd.example,
                    };
                });
            }
        });
        return this;
    }
}