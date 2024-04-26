"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OADocumentBuilder = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const decorators_1 = require("./decorators");
const decorators_2 = require("./decorators");
const decorators_3 = require("./decorators");
const decorators_4 = require("./decorators");
const decorators_5 = require("./decorators");
/**
 * Document builder.
 */
class OADocumentBuilder {
    /**
     * Constructor.
     *
     * @param doc
     */
    constructor(doc) {
        // avoid argument mutation
        this.doc = (0, utils_1.cloneDeep)(Object.assign(Object.assign({}, doc), { openapi: '3.1.0' }));
        // force openapi version
        delete this.doc.info.version;
    }
    /**
     * Returns the OADocumentObject.
     */
    build() {
        return (0, utils_1.cloneDeep)(this.doc);
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
        var _a, _b;
        // tag
        const tagMd = decorators_1.OATagReflector.getMetadata(target);
        const tagPath = (_a = tagMd === null || tagMd === void 0 ? void 0 : tagMd.path) !== null && _a !== void 0 ? _a : '';
        const tagName = tagMd === null || tagMd === void 0 ? void 0 : tagMd.name;
        if (tagMd) {
            const tag = (0, utils_1.cloneDeep)(tagMd);
            delete tag.path;
            this.doc.tags = (_b = this.doc.tags) !== null && _b !== void 0 ? _b : [];
            this.doc.tags.push(tag);
        }
        // operations
        const operationMdMap = decorators_4.OAOperationReflector.getMetadata(target);
        operationMdMap.forEach((operationMd, methodName) => {
            var _a, _b, _c, _d, _e, _f;
            const oaOperation = (0, utils_1.cloneDeep)(operationMd);
            delete oaOperation.path;
            delete oaOperation.method;
            if (tagName != null) {
                oaOperation.tags = (_a = oaOperation.tags) !== null && _a !== void 0 ? _a : [];
                oaOperation.tags.push(tagName);
            }
            const operationPath = path_1.default.join('/', tagPath, operationMd.path).replace(/\/$/, '') || '/';
            this.doc.paths = (_b = this.doc.paths) !== null && _b !== void 0 ? _b : {};
            this.doc.paths[operationPath] = (_c = this.doc.paths[operationPath]) !== null && _c !== void 0 ? _c : {};
            const oaPathItem = this.doc.paths[operationPath];
            oaPathItem[operationMd.method] = oaOperation;
            // parameters
            const parametersMdMap = decorators_3.OAParameterReflector.getMetadata(target);
            const parametersMd = parametersMdMap.get(methodName);
            if (parametersMd)
                parametersMd.reverse().forEach(parameterMd => {
                    var _a;
                    oaOperation.parameters = (_a = oaOperation.parameters) !== null && _a !== void 0 ? _a : [];
                    oaOperation.parameters.push(parameterMd);
                });
            // request body
            const requestBodiesMdMap = decorators_5.OARequestBodyReflector.getMetadata(target);
            const requestBodiesMd = requestBodiesMdMap.get(methodName);
            if (requestBodiesMd) {
                oaPathItem[operationMd.method] = (_d = oaPathItem[operationMd.method]) !== null && _d !== void 0 ? _d : {};
                const oaOperation = oaPathItem[operationMd.method];
                requestBodiesMd.reverse().forEach(requestBodyMd => {
                    var _a;
                    oaOperation.requestBody = (_a = oaOperation.requestBody) !== null && _a !== void 0 ? _a : {
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
            const responsesMdMap = decorators_2.OAResponseReflector.getMetadata(target);
            const responsesMd = responsesMdMap.get(methodName);
            if (responsesMd) {
                oaPathItem[operationMd.method] = (_e = oaPathItem[operationMd.method]) !== null && _e !== void 0 ? _e : {};
                const oaOperation = oaPathItem[operationMd.method];
                oaOperation.responses = (_f = oaOperation.responses) !== null && _f !== void 0 ? _f : {};
                const oaResponses = oaOperation.responses;
                responsesMd.reverse().forEach(responseMd => {
                    var _a, _b;
                    const statusCode = responseMd.statusCode
                        ? String(responseMd.statusCode)
                        : 'default';
                    oaResponses[statusCode] = (_a = oaResponses[statusCode]) !== null && _a !== void 0 ? _a : {
                        description: responseMd.description,
                    };
                    const oaResponse = oaResponses[statusCode];
                    oaResponse.content = (_b = oaResponse.content) !== null && _b !== void 0 ? _b : {};
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
exports.OADocumentBuilder = OADocumentBuilder;
