// OpenApi version 3.1.0
// https://spec.openapis.org/oas/v3.1.0

/**
 * Document object.
 * https://spec.openapis.org/oas/v3.1.0#openapi-object
 */
export type OADocumentObject = {
  openapi: string;
  info: OAInfoObject;
  jsonSchemaDialect?: string;
  servers?: OAServerObject[];
  paths?: OAPathsObject;
  components?: OAComponentsObject;
  security?: OASecurityRequirementObject[];
  tags?: OATagObject[];
  externalDocs?: OAExternalDocumentationObject;
};

/**
 * Info Object.
 * https://spec.openapis.org/oas/v3.1.0#info-object
 */
export type OAInfoObject = {
  title: string;
  summary?: string;
  description?: string;
  termsOfService?: string;
  contact?: OAContactObject;
  license?: OALicenseObject;
  version?: string;
};

/**
 * Contact Object.
 * https://spec.openapis.org/oas/v3.1.0#contact-object
 */
export type OAContactObject = {
  name?: string;
  url?: string;
  email?: string;
};

/**
 * License Object.
 * https://spec.openapis.org/oas/v3.1.0#license-object
 */
export type OALicenseObject = {
  name: string;
  identifier?: string;
  url?: string;
};

/**
 * Server Object.
 * https://spec.openapis.org/oas/v3.1.0#server-object
 */
export type OAServerObject = {
  url: string;
  description?: string;
  variables?: {[name: string]: OAServerVariableObject | undefined};
};

/**
 * Server variable object.
 */
export type OAServerVariableObject = {
  enum?: string[];
  default: string;
  description?: string;
};

/**
 * Paths Object.
 * https://spec.openapis.org/oas/v3.1.0#paths-object
 */
export type OAPathsObject = {
  [path: string]: OAPathItemObject | undefined;
};

/**
 * Path Item Object
 * https://spec.openapis.org/oas/v3.1.0#path-item-object
 */
export type OAPathItemObject = {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: OAOperationObject;
  put?: OAOperationObject;
  post?: OAOperationObject;
  delete?: OAOperationObject;
  options?: OAOperationObject;
  head?: OAOperationObject;
  patch?: OAOperationObject;
  trace?: OAOperationObject;
  servers?: OAServerObject[];
  parameters?: (OAParameterObject | OAReferenceObject)[];
};

/**
 * Operation Method.
 * https://spec.openapis.org/oas/v3.1.0#path-item-object
 */
export enum OAOperationMethod {
  GET = 'get',
  PUT = 'put',
  POST = 'post',
  DELETE = 'delete',
  OPTIONS = 'options',
  HEAD = 'head',
  PATCH = 'patch',
  TRACE = 'trace',
}

/**
 * Parameter Object.
 * https://spec.openapis.org/oas/v3.1.0#parameter-object
 */
export type OAParameterObject = {
  name: string;
  in: OAParameterLocation;
  description?: string;
  required?: boolean;
  deprecated?: false;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: OASchemaObject;
};

/**
 * Parameter Location.
 * https://spec.openapis.org/oas/v3.1.0#parameter-locations
 */
export enum OAParameterLocation {
  QUERY = 'query',
  HEADER = 'header',
  PATH = 'path',
  COOKIE = 'cookie',
}

/**
 * Reference Object.
 * https://spec.openapis.org/oas/v3.1.0#reference-object
 */
export type OAReferenceObject = {
  $ref: string;
  summary?: string;
  description?: string;
};

/**
 * Schema Object.
 * https://spec.openapis.org/oas/v3.1.0#schema-object
 */
export type OASchemaObject = {
  type?: OADataType;
  format?: OADataFormat;
  items?: OASchemaObject | OAReferenceObject;
  required?: string[];
  minimum?: number;
  maximum?: number;
  default?: unknown;
  properties?: OASchemaPropertiesObject;
  discriminator?: OADiscriminatorObject;
  xml?: OAXmlObject;
  externalDocs?: OAExternalDocumentationObject;
};

/**
 * Schema Properties Object.
 * https://spec.openapis.org/oas/v3.1.0#schema-object
 */
export type OASchemaPropertiesObject = {
  [name: string]: OASchemaObject | OAReferenceObject | undefined;
};

/**
 * Data type.
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-4.2.1
 */
export enum OADataType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array',
}

/**
 * Data format.
 * https://spec.openapis.org/oas/v3.1.0#dataTypeFormat
 */
export enum OADataFormat {
  INT32 = 'int32',
  INT64 = 'int64',
  FLOAT = 'float',
  DOUBLE = 'double',
  PASSWORD = 'password',
  BINARY = 'binary',
}

/**
 * Discriminator Object.
 * https://spec.openapis.org/oas/v3.1.0#discriminator-object
 */
export type OADiscriminatorObject = {
  propertyName: string;
  mapping: {[name: string]: string | undefined};
};

/**
 * Xml Object.
 * https://spec.openapis.org/oas/v3.1.0#xml-object
 */
export type OAXmlObject = {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
};

/**
 * External Documentation Object.
 * https://spec.openapis.org/oas/v3.1.0#external-documentation-object
 */
export type OAExternalDocumentationObject = {
  description?: string;
  url: string;
};

/**
 * Operation Object.
 * https://spec.openapis.org/oas/v3.1.0#operation-object
 */
export type OAOperationObject = {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: OAExternalDocumentationObject;
  operationId?: string;
  parameters?: (OAParameterObject | OAReferenceObject)[];
  requestBody?: OARequestBodyObject | OAReferenceObject;
  responses?: OAResponsesObject;
  callbacks?: {[key: string]: OACallbackObject | OAReferenceObject | undefined};
};

/**
 * Callback Object.
 * https://spec.openapis.org/oas/v3.1.0#callback-object
 */
export type OACallbackObject = {
  [expression: string]: OAPathItemObject | OAReferenceObject | undefined;
};

/**
 * Request Body Object.
 * https://spec.openapis.org/oas/v3.1.0#request-body-object
 */
export type OARequestBodyObject = {
  description?: string;
  content: {[mediaType: string]: OAMediaTypeObject};
  required?: boolean;
};

/**
 * Media type.
 * https://spec.openapis.org/oas/v3.1.0#media-types
 */
export enum OAMediaType {
  TEXT_PLAIN = 'text/plain',
  TEXT_HTML = 'text/html',
  APPLICATION_XML = 'application/xml',
  APPLICATION_JSON = 'application/json',
  MULTIPART_FORM_DATA = 'multipart/form-data',
}

/**
 * Responses Object.
 * https://spec.openapis.org/oas/v3.1.0#responses-object
 */
export type OAResponsesObject = {
  [httpStatusCode: string]: OAResponseObject | OAReferenceObject | undefined;
};

/**
 * Response Object.
 * https://spec.openapis.org/oas/v3.1.0#response-object
 */
export type OAResponseObject = {
  description: string;
  headers?: {[name: string]: OAHeaderObject | OAReferenceObject | undefined};
  content?: {[mediaType: string]: OAMediaTypeObject | undefined};
  links?: {[name: string]: OAReferenceObject};
};

/**
 * Media Type Object.
 * https://spec.openapis.org/oas/v3.1.0#media-type-object
 */
export type OAMediaTypeObject = {
  schema?: OASchemaObject;
  example?: unknown;
  examples?: {[name: string]: OAExampleObject | OAReferenceObject | undefined};
  encoding?: {[name: string]: OAEncodingObject | undefined};
};

/**
 * Example Object.
 * https://spec.openapis.org/oas/v3.1.0#example-object
 */
export type OAExampleObject = {
  summary?: string;
  description?: string;
  value?: string;
  externalValue?: string;
};

/**
 * Encoding Object.
 * https://spec.openapis.org/oas/v3.1.0#encoding-object
 */
export type OAEncodingObject = {
  contentType?: string;
  headers?: {[name: string]: OAHeaderObject | OAReferenceObject | undefined};
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
};

/**
 * Header Object.
 * https://spec.openapis.org/oas/v3.1.0#header-object
 */
export type OAHeaderObject = Omit<OAParameterObject, 'name' | 'in'>;

/**
 * Link Object.
 * https://spec.openapis.org/oas/v3.1.0#link-object
 */
export type OALinkObject = {
  operationRef?: string;
  operationId?: string;
  parameters?: {[name: string]: unknown | undefined};
  requestBody?: unknown;
  description?: string;
  server?: OAServerObject;
};

/**
 * Components Object.
 * https://spec.openapis.org/oas/v3.1.0#components-object
 */
export type OAComponentsObject = {
  schemas?: {[name: string]: OASchemaObject | undefined};
  responses?: {
    [name: string]: OAResponseObject | OAReferenceObject | undefined;
  };
  parameters?: {
    [name: string]: OAParameterObject | OAReferenceObject | undefined;
  };
  examples?: {[name: string]: OAExampleObject | OAReferenceObject | undefined};
  requestBodies?: {
    [name: string]: OARequestBodyObject | OAReferenceObject | undefined;
  };
  headers?: {[name: string]: OAHeaderObject | OAReferenceObject | undefined};
  securitySchemes?: {
    [name: string]: OASecuritySchemeObject | OAReferenceObject | undefined;
  };
  links?: {[name: string]: OALinkObject | OAReferenceObject | undefined};
  callbacks?: {
    [name: string]: OACallbackObject | OAReferenceObject | undefined;
  };
  pathItems?: {
    [name: string]: OAPathItemObject | OAReferenceObject | undefined;
  };
};

/**
 * Security Scheme Object.
 * https://spec.openapis.org/oas/v3.1.0#security-scheme-object
 */
export type OASecuritySchemeObject = {
  type: OASecuritySchemeType;
  description?: string;
  name?: string;
  in?: OAApiKeyLocation;
  scheme?: string;
  bearerFormat?: string;
  flows?: OAOAuthFlowsObject;
};

/**
 * Security Scheme Type.
 * https://spec.openapis.org/oas/v3.1.0#security-scheme-object
 */
export enum OASecuritySchemeType {
  API_KEY = 'apiKey',
  HTTP = 'http',
  MUTUAL_TLS = 'mutualTLS',
  OAUTH_2 = 'oauth2',
  OPEN_ID_CONNECT = 'openIdConnect',
}

/**
 * Api Key Location.
 * https://spec.openapis.org/oas/v3.1.0#security-scheme-object
 */
export enum OAApiKeyLocation {
  QUERY = 'query',
  HEADER = 'header',
  COOKIE = 'cookie',
}

/**
 * OAuth Flows Object.
 * https://spec.openapis.org/oas/v3.1.0#oauth-flows-object
 */
export type OAOAuthFlowsObject = {
  implicit?: OAOAuthFlowObject;
  password?: OAOAuthFlowObject;
  clientCredentials?: OAOAuthFlowObject;
  authorizationCode?: OAOAuthFlowObject;
};

/**
 * OAuth Flow Object.
 * https://spec.openapis.org/oas/v3.1.0#oauth-flow-object
 */
export type OAOAuthFlowObject = {
  authorizationUrl: string;
  tokenUrl: string;
  refreshUrl?: string;
  scopes: {[name: string]: string | undefined};
};

/**
 * Security Requirement Object.
 * https://spec.openapis.org/oas/v3.1.0#security-requirement-object
 */
export type OASecurityRequirementObject = {
  [name: string]: string[] | undefined;
};

/**
 * Tag object.
 * https://spec.openapis.org/oas/v3.1.0#tag-object
 */
export type OATagObject = {
  name: string;
  description?: string;
  externalDocs?: OAExternalDocumentationObject;
};
