## @e22m4u/ts-openapi

*English | [Русский](./README-ru.md)*

TypeScript decorators for generating
[The OpenAPI Document 3.1.0](https://spec.openapis.org/oas/v3.1.0)

## Installation

```bash
npm install @e22m4u/ts-openapi
```

#### Decorators support

To enable decorators support add the following
options to your `tsconfig.json` file.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Example

Describing controller operations using [decorators](#Decorators)
for class, methods and parameters.

```ts
import {
  OATag,
  OADataType,
  OAResponse,
  OAOperation,
  OAParameter,
  OAMediaType,
  OARequestBody,
  OAOperationMethod,
  OAParameterLocation,
} from '@e22m4u/ts-openapi';

type User = {
  id: number,
  name: string,
  email: string,
}

@OATag({
  name: 'User',
  path: '/user',
})
class UserController {
  @OAOperation({
    method: OAOperationMethod.PATCH,
    path: '/{id}',
  })
  @OAResponse({
    mediaType: OAMediaType.JSON,
    description: 'Patched User',
    schema: {
      type: OADataType.OBJECT,
      properties: {
        id: {type: OADataType.NUMBER},
        name: {type: OADataType.STRING},
        email: {type: OADataType.STRING},
      },
    },
  })
  patchById(
    @OAParameter({
      name: 'id',
      in: OAParameterLocation.PATH,
      schema: {type: OADataType.NUMBER},
    })
    id: string,
    @OARequestBody({
      mediaType: OAMediaType.JSON,
      schema: {
        type: OADataType.OBJECT,
        properties: {
          name: {type: OADataType.STRING},
          email: {type: OADataType.STRING},
        },
      },
    })
    body: User,
  ): User {
    // ...
  }
}
```

Generating the OpenAPI document using the controller
class from previous example.

```ts
import {OADocumentBuilder} from '@e22m4u/ts-openapi';

const builder = new OADocumentBuilder({info: {title: 'My project'}});
builder.useClassMetadata(UserController);
const doc = builder.build();

console.log(doc);
```

The `build` method returns the OpenAPI document
described in the given controller.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "My project"
  },
  "tags": [
    {
      "name": "User"
    }
  ],
  "paths": {
    "/user/{id}": {
      "patch": {
        "tags": [
          "User"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "schema": {
              "type": "number"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "default": {
            "description": "Patched User",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "name": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## Decorators

### @OATag

Describes a group of controller operations.

```ts
import {OATag} from '@e22m4u/ts-openapi';

@OATag({
  name: 'User',
  description: 'The User Controller',
  // the "path" parameter is used as
  // a route prefix for operations
  // of this controller
  path: '/user',
})
class UserController {/* ... */}
```

[OATagMetadata.ts](src/decorators/tag/tag-metadata.ts)

Specification:
- [Tag Object](https://spec.openapis.org/oas/v3.1.0#tag-object)

### @OAOperation

Describes an operation for a specific route.

```ts
import {
  OAOperation,
  OAOperationMethod,
} from '@e22m4u/ts-openapi';

class UserController {
  @OAOperation({
    method: OAOperationMethod.GET,
    path: '/users/{id}',
    summary: 'Find by the given id',
    description: 'Returns a model',
    // ...
  })
  findById() {/* ... */}
}
```

[OAOperationMetadata.ts](/src/decorators/operation/operation-metadata.ts)

Specification:
- [Paths Object](https://spec.openapis.org/oas/v3.1.0#paths-object)  
- [Path Item Object](https://spec.openapis.org/oas/v3.1.0#path-item-object)  
- [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)

### @OAResponse

Describes an operation response.

```ts
import {
  OADataType,
  OAResponse,
  OAMediaType,
} from '@e22m4u/ts-openapi';

class UserController {
  @OAResponse({
    statusCode: 200,
    mediaType: OAMediaType.JSON,
    description: 'Response description',
    schema: {
      type: OADataType.OBJECT,
      parameters: {
        id: {type: OADataType.NUMBER},
        name: {type: OADataType.STRING},
      },
    },
    example: {
      id: 10,
      name: 'John Doe',
    },
    // ...
  })
  findById() {/* ... */}
}
```

[OAResponseMetadata.ts](src/decorators/response/response-metadata.ts)

Specification:
- [Responses Object](https://spec.openapis.org/oas/v3.1.0#responses-object)  
- [Response Object](https://spec.openapis.org/oas/v3.1.0#response-object)  
- [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)

### @OAParameter

Describes an operation parameter.

```ts
import {
  OADataType,
  OAParameter,
  OAParameterLocation,
} from '@e22m4u/ts-openapi';

class UserController {
  // the decorator can be
  // applied to the method
  @OAParameter({
    name: 'foo',
    in: OAParameterLocation.QUERY,
    schema: {type: OADataType.STRING},
  })
  findById(
    // or directly to the parameter
    @OAParameter({
      name: 'bar',
      in: OAParameterLocation.QUERY,
      schema: {type: OADataType.STRING},
    })
    bar: number,
  ) {/* ... */}
}
```

[OAParameterMetadata.ts](src/decorators/parameter/parameter-metadata.ts)

Specification:
- [Parameter Object](https://spec.openapis.org/oas/v3.1.0#parameter-object)  
- [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)

### @OARequestBody

Describes a request body.

```ts
import {
  OADataType,
  OAMediaType,
  OARequestBody,
} from '@e22m4u/ts-openapi';

class UserController {
  // the decorator can be
  // applied to the method
  @OARequestBody({
    mediaType: OAMediaType.JSON,
    schema: {
      type: OADataType.OBJECT,
      properties: {
        name: {type: OADataType.STRING},
        email: {type: OADataType.STRING},
      },
    },
  })
  create(
    // or directly to the parameter
    @OARequestBody({
      mediaType: OAMediaType.JSON,
      schema: {
        type: OADataType.OBJECT,
        properties: {
          name: {type: OADataType.STRING},
          email: {type: OADataType.STRING},
        },
      },
    })
    body: object,
  ) {/* ... */}
}
```

[OARequestBodyMetadata.ts](src/decorators/request-body/request-body-metadata.ts)

Specification:
- [Request Body Object](https://spec.openapis.org/oas/v3.1.0#request-body-object)

## Tests

```bash
npm run test
```

## License

MIT
