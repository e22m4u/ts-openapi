"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/esm/index.js
var index_exports = {};
__export(index_exports, {
  OAApiKeyLocation: () => OAApiKeyLocation,
  OADataFormat: () => OADataFormat,
  OADataType: () => OADataType,
  OADocumentBuilder: () => OADocumentBuilder,
  OAMediaType: () => OAMediaType,
  OAOperationMethod: () => OAOperationMethod,
  OAOperationReflector: () => OAOperationReflector,
  OAParameterLocation: () => OAParameterLocation,
  OAParameterReflector: () => OAParameterReflector,
  OARequestBodyReflector: () => OARequestBodyReflector,
  OAResponseReflector: () => OAResponseReflector,
  OASecuritySchemeType: () => OASecuritySchemeType,
  OATagReflector: () => OATagReflector,
  OA_OPERATIONS_METADATA_KEY: () => OA_OPERATIONS_METADATA_KEY,
  OA_PARAMETERS_METADATA_KEY: () => OA_PARAMETERS_METADATA_KEY,
  OA_REQUEST_BODIES_METADATA_KEY: () => OA_REQUEST_BODIES_METADATA_KEY,
  OA_RESPONSES_METADATA_KEY: () => OA_RESPONSES_METADATA_KEY,
  OA_TAG_METADATA_KEY: () => OA_TAG_METADATA_KEY,
  OPENAPI_VERSION: () => OPENAPI_VERSION,
  oaOperation: () => oaOperation,
  oaParameter: () => oaParameter,
  oaRequestBody: () => oaRequestBody,
  oaResponse: () => oaResponse,
  oaTag: () => oaTag
});
module.exports = __toCommonJS(index_exports);

// dist/esm/document-types.js
var OAOperationMethod;
(function(OAOperationMethod2) {
  OAOperationMethod2["GET"] = "get";
  OAOperationMethod2["PUT"] = "put";
  OAOperationMethod2["POST"] = "post";
  OAOperationMethod2["DELETE"] = "delete";
  OAOperationMethod2["OPTIONS"] = "options";
  OAOperationMethod2["HEAD"] = "head";
  OAOperationMethod2["PATCH"] = "patch";
  OAOperationMethod2["TRACE"] = "trace";
})(OAOperationMethod || (OAOperationMethod = {}));
var OAParameterLocation;
(function(OAParameterLocation2) {
  OAParameterLocation2["QUERY"] = "query";
  OAParameterLocation2["HEADER"] = "header";
  OAParameterLocation2["PATH"] = "path";
  OAParameterLocation2["COOKIE"] = "cookie";
})(OAParameterLocation || (OAParameterLocation = {}));
var OADataType;
(function(OADataType2) {
  OADataType2["STRING"] = "string";
  OADataType2["NUMBER"] = "number";
  OADataType2["BOOLEAN"] = "boolean";
  OADataType2["OBJECT"] = "object";
  OADataType2["ARRAY"] = "array";
})(OADataType || (OADataType = {}));
var OADataFormat;
(function(OADataFormat2) {
  OADataFormat2["INT32"] = "int32";
  OADataFormat2["INT64"] = "int64";
  OADataFormat2["FLOAT"] = "float";
  OADataFormat2["DOUBLE"] = "double";
  OADataFormat2["PASSWORD"] = "password";
  OADataFormat2["BINARY"] = "binary";
})(OADataFormat || (OADataFormat = {}));
var OAMediaType;
(function(OAMediaType2) {
  OAMediaType2["TEXT_PLAIN"] = "text/plain";
  OAMediaType2["TEXT_HTML"] = "text/html";
  OAMediaType2["APPLICATION_XML"] = "application/xml";
  OAMediaType2["APPLICATION_JSON"] = "application/json";
  OAMediaType2["MULTIPART_FORM_DATA"] = "multipart/form-data";
})(OAMediaType || (OAMediaType = {}));
var OASecuritySchemeType;
(function(OASecuritySchemeType2) {
  OASecuritySchemeType2["API_KEY"] = "apiKey";
  OASecuritySchemeType2["HTTP"] = "http";
  OASecuritySchemeType2["MUTUAL_TLS"] = "mutualTLS";
  OASecuritySchemeType2["OAUTH_2"] = "oauth2";
  OASecuritySchemeType2["OPEN_ID_CONNECT"] = "openIdConnect";
})(OASecuritySchemeType || (OASecuritySchemeType = {}));
var OAApiKeyLocation;
(function(OAApiKeyLocation2) {
  OAApiKeyLocation2["QUERY"] = "query";
  OAApiKeyLocation2["HEADER"] = "header";
  OAApiKeyLocation2["COOKIE"] = "cookie";
})(OAApiKeyLocation || (OAApiKeyLocation = {}));

// dist/esm/document-builder.js
var import_path = __toESM(require("path"), 1);

// dist/esm/utils/clone-deep.js
function cloneDeep(value) {
  return JSON.parse(JSON.stringify(value));
}
__name(cloneDeep, "cloneDeep");

// dist/esm/decorators/tag/tag-metadata.js
var import_ts_reflector = require("@e22m4u/ts-reflector");
var OA_TAG_METADATA_KEY = new import_ts_reflector.MetadataKey("openApiTagMetadataKey");

// dist/esm/decorators/tag/tag-reflector.js
var import_ts_reflector2 = require("@e22m4u/ts-reflector");
var _OATagReflector = class _OATagReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   */
  static setMetadata(metadata, target) {
    return import_ts_reflector2.Reflector.defineMetadata(OA_TAG_METADATA_KEY, metadata, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    return import_ts_reflector2.Reflector.getOwnMetadata(OA_TAG_METADATA_KEY, target);
  }
};
__name(_OATagReflector, "OATagReflector");
var OATagReflector = _OATagReflector;

// dist/esm/decorators/tag/tag-decorator.js
var import_ts_reflector3 = require("@e22m4u/ts-reflector");
var import_ts_reflector4 = require("@e22m4u/ts-reflector");
function oaTag(options) {
  return function(target) {
    const decoratorType = (0, import_ts_reflector4.getDecoratorTargetType)(target);
    if (decoratorType !== import_ts_reflector3.DecoratorTargetType.CONSTRUCTOR)
      throw new Error("@oaTag decorator is only supported on a class.");
    const nameByOptions = options == null ? void 0 : options.name;
    const nameByClass = target.name.replace(/controller$/i, "");
    const metadata = {
      ...options,
      name: nameByOptions || nameByClass
    };
    OATagReflector.setMetadata(metadata, target);
  };
}
__name(oaTag, "oaTag");

// dist/esm/decorators/response/response-metadata.js
var import_ts_reflector5 = require("@e22m4u/ts-reflector");
var OA_RESPONSES_METADATA_KEY = new import_ts_reflector5.MetadataKey("openApiResponsesMetadataKey");

// dist/esm/decorators/response/response-reflector.js
var import_ts_reflector6 = require("@e22m4u/ts-reflector");
var _OAResponseReflector = class _OAResponseReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(metadata, target, propertyKey) {
    var _a;
    const oldMap = import_ts_reflector6.Reflector.getOwnMetadata(OA_RESPONSES_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    const metadataList = (_a = newMap.get(propertyKey)) != null ? _a : [];
    metadataList.push(metadata);
    newMap.set(propertyKey, metadataList);
    import_ts_reflector6.Reflector.defineMetadata(OA_RESPONSES_METADATA_KEY, newMap, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    const metadata = import_ts_reflector6.Reflector.getOwnMetadata(OA_RESPONSES_METADATA_KEY, target);
    return metadata != null ? metadata : /* @__PURE__ */ new Map();
  }
};
__name(_OAResponseReflector, "OAResponseReflector");
var OAResponseReflector = _OAResponseReflector;

// dist/esm/decorators/response/response-decorator.js
var import_ts_reflector7 = require("@e22m4u/ts-reflector");
var import_ts_reflector8 = require("@e22m4u/ts-reflector");
function oaResponse(metadata) {
  return function(target, propertyKey, descriptor) {
    const decoratorType = (0, import_ts_reflector8.getDecoratorTargetType)(target, propertyKey, descriptor);
    if (decoratorType !== import_ts_reflector7.DecoratorTargetType.INSTANCE_METHOD)
      throw new Error("@oaResponse decorator is only supported on an instance method.");
    OAResponseReflector.setMetadata(metadata, target.constructor, propertyKey);
  };
}
__name(oaResponse, "oaResponse");

// dist/esm/decorators/parameter/parameter-metadata.js
var import_ts_reflector9 = require("@e22m4u/ts-reflector");
var OA_PARAMETERS_METADATA_KEY = new import_ts_reflector9.MetadataKey("openApiParametersMetadataKey");

// dist/esm/decorators/parameter/parameter-reflector.js
var import_ts_reflector10 = require("@e22m4u/ts-reflector");
var _OAParameterReflector = class _OAParameterReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(metadata, target, propertyKey) {
    var _a;
    const oldMap = import_ts_reflector10.Reflector.getOwnMetadata(OA_PARAMETERS_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    const metadataList = (_a = newMap.get(propertyKey)) != null ? _a : [];
    metadataList.push(metadata);
    newMap.set(propertyKey, metadataList);
    import_ts_reflector10.Reflector.defineMetadata(OA_PARAMETERS_METADATA_KEY, newMap, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    const metadata = import_ts_reflector10.Reflector.getOwnMetadata(OA_PARAMETERS_METADATA_KEY, target);
    return metadata != null ? metadata : /* @__PURE__ */ new Map();
  }
};
__name(_OAParameterReflector, "OAParameterReflector");
var OAParameterReflector = _OAParameterReflector;

// dist/esm/decorators/parameter/parameter-decorator.js
var import_ts_reflector11 = require("@e22m4u/ts-reflector");
var import_ts_reflector12 = require("@e22m4u/ts-reflector");
function oaParameter(metadata) {
  return function(target, propertyKey, indexOrDescriptor) {
    const decoratorType = (0, import_ts_reflector12.getDecoratorTargetType)(target, propertyKey, indexOrDescriptor);
    if (decoratorType !== import_ts_reflector11.DecoratorTargetType.INSTANCE_METHOD && decoratorType !== import_ts_reflector11.DecoratorTargetType.INSTANCE_METHOD_PARAMETER) {
      throw new Error("@oaParameter decorator is only supported on an instance method or an instance method parameter.");
    }
    OAParameterReflector.setMetadata(metadata, target.constructor, propertyKey);
  };
}
__name(oaParameter, "oaParameter");

// dist/esm/decorators/operation/operation-metadata.js
var import_ts_reflector13 = require("@e22m4u/ts-reflector");
var OA_OPERATIONS_METADATA_KEY = new import_ts_reflector13.MetadataKey("openApiOperationsMetadataKey");

// dist/esm/decorators/operation/operation-reflector.js
var import_ts_reflector14 = require("@e22m4u/ts-reflector");
var _OAOperationReflector = class _OAOperationReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(metadata, target, propertyKey) {
    const oldMap = import_ts_reflector14.Reflector.getOwnMetadata(OA_OPERATIONS_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    newMap.set(propertyKey, metadata);
    import_ts_reflector14.Reflector.defineMetadata(OA_OPERATIONS_METADATA_KEY, newMap, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    const metadata = import_ts_reflector14.Reflector.getOwnMetadata(OA_OPERATIONS_METADATA_KEY, target);
    return metadata != null ? metadata : /* @__PURE__ */ new Map();
  }
};
__name(_OAOperationReflector, "OAOperationReflector");
var OAOperationReflector = _OAOperationReflector;

// dist/esm/decorators/operation/operation-decorator.js
var import_ts_reflector15 = require("@e22m4u/ts-reflector");
var import_ts_reflector16 = require("@e22m4u/ts-reflector");
function oaOperation(metadata) {
  return function(target, propertyKey, descriptor) {
    const decoratorType = (0, import_ts_reflector16.getDecoratorTargetType)(target, propertyKey, descriptor);
    if (decoratorType !== import_ts_reflector15.DecoratorTargetType.INSTANCE_METHOD)
      throw new Error("@oaOperation decorator is only supported on an instance method.");
    OAOperationReflector.setMetadata(metadata, target.constructor, propertyKey);
  };
}
__name(oaOperation, "oaOperation");

// dist/esm/decorators/request-body/request-body-metadata.js
var import_ts_reflector17 = require("@e22m4u/ts-reflector");
var OA_REQUEST_BODIES_METADATA_KEY = new import_ts_reflector17.MetadataKey("openApiRequestBodiesMetadataKey");

// dist/esm/decorators/request-body/request-body-reflector.js
var import_ts_reflector18 = require("@e22m4u/ts-reflector");
var _OARequestBodyReflector = class _OARequestBodyReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(metadata, target, propertyKey) {
    var _a;
    const oldMap = import_ts_reflector18.Reflector.getOwnMetadata(OA_REQUEST_BODIES_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    const metadataList = (_a = newMap.get(propertyKey)) != null ? _a : [];
    metadataList.push(metadata);
    newMap.set(propertyKey, metadataList);
    import_ts_reflector18.Reflector.defineMetadata(OA_REQUEST_BODIES_METADATA_KEY, newMap, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    const metadata = import_ts_reflector18.Reflector.getOwnMetadata(OA_REQUEST_BODIES_METADATA_KEY, target);
    return metadata != null ? metadata : /* @__PURE__ */ new Map();
  }
};
__name(_OARequestBodyReflector, "OARequestBodyReflector");
var OARequestBodyReflector = _OARequestBodyReflector;

// dist/esm/decorators/request-body/request-body-decorator.js
var import_ts_reflector19 = require("@e22m4u/ts-reflector");
var import_ts_reflector20 = require("@e22m4u/ts-reflector");
function oaRequestBody(metadata) {
  return function(target, propertyKey, indexOrDescriptor) {
    const decoratorType = (0, import_ts_reflector20.getDecoratorTargetType)(target, propertyKey, indexOrDescriptor);
    if (decoratorType !== import_ts_reflector19.DecoratorTargetType.INSTANCE_METHOD && decoratorType !== import_ts_reflector19.DecoratorTargetType.INSTANCE_METHOD_PARAMETER) {
      throw new Error("@oaRequestBody decorator is only supported on an instance method or an instance method parameter.");
    }
    OARequestBodyReflector.setMetadata(metadata, target.constructor, propertyKey);
  };
}
__name(oaRequestBody, "oaRequestBody");

// dist/esm/document-builder.js
var OPENAPI_VERSION = "3.1.0";
var _OADocumentBuilder = class _OADocumentBuilder {
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
    this.doc = cloneDeep({ ...doc, openapi: OPENAPI_VERSION });
    this.doc.info.version = OPENAPI_VERSION;
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
    targets.forEach((target) => this.useClassMetadata(target));
    return this;
  }
  /**
   * User class metadata.
   *
   * @param target
   */
  useClassMetadata(target) {
    var _a, _b;
    const tagMd = OATagReflector.getMetadata(target);
    const tagPath = (_a = tagMd == null ? void 0 : tagMd.path) != null ? _a : "";
    const tagName = tagMd == null ? void 0 : tagMd.name;
    if (tagMd) {
      const tag = cloneDeep(tagMd);
      delete tag.path;
      this.doc.tags = (_b = this.doc.tags) != null ? _b : [];
      this.doc.tags.push(tag);
    }
    const operationMdMap = OAOperationReflector.getMetadata(target);
    operationMdMap.forEach((operationMd, methodName) => {
      var _a2, _b2, _c, _d, _e, _f;
      const oaOperation2 = cloneDeep(operationMd);
      delete oaOperation2.path;
      delete oaOperation2.method;
      if (tagName != null) {
        oaOperation2.tags = (_a2 = oaOperation2.tags) != null ? _a2 : [];
        oaOperation2.tags.push(tagName);
      }
      const operationPath = import_path.default.join("/", tagPath, operationMd.path).replace(/\/$/, "") || "/";
      this.doc.paths = (_b2 = this.doc.paths) != null ? _b2 : {};
      this.doc.paths[operationPath] = (_c = this.doc.paths[operationPath]) != null ? _c : {};
      const oaPathItem = this.doc.paths[operationPath];
      oaPathItem[operationMd.method] = oaOperation2;
      const parametersMdMap = OAParameterReflector.getMetadata(target);
      const parametersMd = parametersMdMap.get(methodName);
      if (parametersMd)
        parametersMd.reverse().forEach((parameterMd) => {
          var _a3;
          oaOperation2.parameters = (_a3 = oaOperation2.parameters) != null ? _a3 : [];
          const required = parameterMd.in === OAParameterLocation.PATH || parameterMd.required;
          oaOperation2.parameters.push({ ...parameterMd, required });
        });
      const requestBodiesMdMap = OARequestBodyReflector.getMetadata(target);
      const requestBodiesMd = requestBodiesMdMap.get(methodName);
      if (requestBodiesMd) {
        oaPathItem[operationMd.method] = (_d = oaPathItem[operationMd.method]) != null ? _d : {};
        const oaOperation3 = oaPathItem[operationMd.method];
        requestBodiesMd.reverse().forEach((requestBodyMd) => {
          var _a3;
          oaOperation3.requestBody = (_a3 = oaOperation3.requestBody) != null ? _a3 : {
            description: requestBodyMd.description,
            content: {},
            required: requestBodyMd.required
          };
          const oaRequestBody2 = oaOperation3.requestBody;
          oaRequestBody2.content[requestBodyMd.mediaType] = {
            schema: requestBodyMd.schema,
            example: requestBodyMd.example
          };
        });
      }
      const responsesMdMap = OAResponseReflector.getMetadata(target);
      const responsesMd = responsesMdMap.get(methodName);
      if (responsesMd) {
        oaPathItem[operationMd.method] = (_e = oaPathItem[operationMd.method]) != null ? _e : {};
        const oaOperation3 = oaPathItem[operationMd.method];
        oaOperation3.responses = (_f = oaOperation3.responses) != null ? _f : {};
        const oaResponses = oaOperation3.responses;
        responsesMd.reverse().forEach((responseMd) => {
          var _a3, _b3;
          const statusCode = responseMd.statusCode ? String(responseMd.statusCode) : "default";
          oaResponses[statusCode] = (_a3 = oaResponses[statusCode]) != null ? _a3 : {
            description: responseMd.description
          };
          const oaResponse2 = oaResponses[statusCode];
          oaResponse2.content = (_b3 = oaResponse2.content) != null ? _b3 : {};
          const oaContent = oaResponse2.content;
          oaContent[responseMd.mediaType] = {
            schema: responseMd.schema,
            example: responseMd.example
          };
        });
      }
    });
    return this;
  }
};
__name(_OADocumentBuilder, "OADocumentBuilder");
var OADocumentBuilder = _OADocumentBuilder;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OAApiKeyLocation,
  OADataFormat,
  OADataType,
  OADocumentBuilder,
  OAMediaType,
  OAOperationMethod,
  OAOperationReflector,
  OAParameterLocation,
  OAParameterReflector,
  OARequestBodyReflector,
  OAResponseReflector,
  OASecuritySchemeType,
  OATagReflector,
  OA_OPERATIONS_METADATA_KEY,
  OA_PARAMETERS_METADATA_KEY,
  OA_REQUEST_BODIES_METADATA_KEY,
  OA_RESPONSES_METADATA_KEY,
  OA_TAG_METADATA_KEY,
  OPENAPI_VERSION,
  oaOperation,
  oaParameter,
  oaRequestBody,
  oaResponse,
  oaTag
});
