// OpenApi version 3.1.0
// https://spec.openapis.org/oas/v3.1.0
/**
 * Operation Method.
 * https://spec.openapis.org/oas/v3.1.0#path-item-object
 */
export var OAOperationMethod;
(function (OAOperationMethod) {
    OAOperationMethod["GET"] = "get";
    OAOperationMethod["PUT"] = "put";
    OAOperationMethod["POST"] = "post";
    OAOperationMethod["DELETE"] = "delete";
    OAOperationMethod["OPTIONS"] = "options";
    OAOperationMethod["HEAD"] = "head";
    OAOperationMethod["PATCH"] = "patch";
    OAOperationMethod["TRACE"] = "trace";
})(OAOperationMethod || (OAOperationMethod = {}));
/**
 * Parameter Location.
 * https://spec.openapis.org/oas/v3.1.0#parameter-locations
 */
export var OAParameterLocation;
(function (OAParameterLocation) {
    OAParameterLocation["QUERY"] = "query";
    OAParameterLocation["HEADER"] = "header";
    OAParameterLocation["PATH"] = "path";
    OAParameterLocation["COOKIE"] = "cookie";
})(OAParameterLocation || (OAParameterLocation = {}));
/**
 * Data type.
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-4.2.1
 */
export var OADataType;
(function (OADataType) {
    OADataType["STRING"] = "string";
    OADataType["NUMBER"] = "number";
    OADataType["BOOLEAN"] = "boolean";
    OADataType["OBJECT"] = "object";
    OADataType["ARRAY"] = "array";
})(OADataType || (OADataType = {}));
/**
 * Data format.
 * https://spec.openapis.org/oas/v3.1.0#dataTypeFormat
 */
export var OADataFormat;
(function (OADataFormat) {
    OADataFormat["INT32"] = "int32";
    OADataFormat["INT64"] = "int64";
    OADataFormat["FLOAT"] = "float";
    OADataFormat["DOUBLE"] = "double";
    OADataFormat["PASSWORD"] = "password";
    OADataFormat["BINARY"] = "binary";
})(OADataFormat || (OADataFormat = {}));
/**
 * Media type.
 * https://spec.openapis.org/oas/v3.1.0#media-types
 */
export var OAMediaType;
(function (OAMediaType) {
    OAMediaType["TEXT_PLAIN"] = "text/plain";
    OAMediaType["TEXT_HTML"] = "text/html";
    OAMediaType["APPLICATION_XML"] = "application/xml";
    OAMediaType["APPLICATION_JSON"] = "application/json";
    OAMediaType["MULTIPART_FORM_DATA"] = "multipart/form-data";
})(OAMediaType || (OAMediaType = {}));
/**
 * Security Scheme Type.
 * https://spec.openapis.org/oas/v3.1.0#security-scheme-object
 */
export var OASecuritySchemeType;
(function (OASecuritySchemeType) {
    OASecuritySchemeType["API_KEY"] = "apiKey";
    OASecuritySchemeType["HTTP"] = "http";
    OASecuritySchemeType["MUTUAL_TLS"] = "mutualTLS";
    OASecuritySchemeType["OAUTH_2"] = "oauth2";
    OASecuritySchemeType["OPEN_ID_CONNECT"] = "openIdConnect";
})(OASecuritySchemeType || (OASecuritySchemeType = {}));
/**
 * Api Key Location.
 * https://spec.openapis.org/oas/v3.1.0#security-scheme-object
 */
export var OAApiKeyLocation;
(function (OAApiKeyLocation) {
    OAApiKeyLocation["QUERY"] = "query";
    OAApiKeyLocation["HEADER"] = "header";
    OAApiKeyLocation["COOKIE"] = "cookie";
})(OAApiKeyLocation || (OAApiKeyLocation = {}));
