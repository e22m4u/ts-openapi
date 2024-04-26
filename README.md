## @e22m4u/ts-openapi

The module produces [OpenAPI Document 3.1.0](https://spec.openapis.org/oas/v3.1.0) that described by TypeScript decorators.

## Installation

1. Add the module as a dependency.

```bash
npm install @e22m4u/ts-openapi
```

2. Its important to set these options in `tsconfig.json` file of your project.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Decorators

### @OATag

Adds tag metadata to a class that is used by the operations.

Example:

```ts
import {OATag} from '@e22m4u/ts-openapi';

@OATag({
  name: 'User',
  description: 'The User Controller',
  // the non-spec option "path" intended
  // to add a path prefix to operations
  // of the current class controller
  path: '/user',
})
class UserController {/* ... */}
```

Metadata:  
[OATagMetadata.ts](src/decorators/tag/tag-metadata.ts)

OpenApi Specs:
- [Tag Object](https://spec.openapis.org/oas/v3.1.0#tag-object)

### @OAOperation

Describes a single API operation on a path.

Example:

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

Metadata:  
[OAOperationMetadata.ts](/src/decorators/operation/operation-metadata.ts)

OpenApi Specs:
- [Paths Object](https://spec.openapis.org/oas/v3.1.0#paths-object)  
- [Path Item Object](https://spec.openapis.org/oas/v3.1.0#path-item-object)  
- [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)

### @OAResponse

Describes a single response from an API Operation.

Example:

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

Metadata:  
[OAResponseMetadata.ts](src/decorators/response/response-metadata.ts)

OpenApi Specs:
- [Responses Object](https://spec.openapis.org/oas/v3.1.0#responses-object)  
- [Response Object](https://spec.openapis.org/oas/v3.1.0#response-object)  
- [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)

### @OAParameter

Describes a single operation parameter.

Example:

```ts
import {
  OADataType,
  OAParameter,
  OAParameterLocation,
} from '@e22m4u/ts-openapi';

class UserController {
  // the decorator can be applied
  // to an instance method
  @OAParameter({
    name: 'foo',
    in: OAParameterLocation.QUERY,
    schema: {type: OADataType.STRING},
  })
  findById(
    // or an instance method parameter
    @OAParameter({
      name: 'bar',
      in: OAParameterLocation.QUERY,
      schema: {type: OADataType.STRING},
    })
    bar: number,
  ) {/* ... */}
}
```

Metadata:  
[OAParameterMetadata.ts](src/decorators/parameter/parameter-metadata.ts)

OpenApi Specs:
- [Parameter Object](https://spec.openapis.org/oas/v3.1.0#parameter-object)  
- [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)

### @OARequestBody

Describes a single request body.

Example:

```ts
import {
  OADataType,
  OAMediaType,
  OARequestBody,
} from '@e22m4u/ts-openapi';

class UserController {
  // the decorator can be applied
  // to an instance method
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
    // or an instance method parameter
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

Metadata:  
[OARequestBodyMetadata.ts](src/decorators/request-body/request-body-metadata.ts)

OpenApi Specs:
- [Request Body Object](https://spec.openapis.org/oas/v3.1.0#request-body-object)

## Example

Decorators usage.

```ts
import {
  OATag,
  OADataType,
  OAResponse,
  OAOperation,
  OAParameter,
  OAMediaType,
  OARequestBody,
  OADocumentBuilder,
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

Create OpenApi Document by the class metadata.

```ts
const builder = new OADocumentBuilder({info: {title: 'My project'}});
builder.useClassMetadata(UserController);
const openApiDocument = builder.build();

console.log(openApiDocument);
// {
//   "openapi": "3.1.0",
//   "info": {
//     "title": "My project"
//   },
//   "tags": [
//     {
//       "name": "User"
//     }
//   ],
//   "paths": {
//     "/user/{id}": {
//       "patch": {
//         "tags": [
//           "User"
//         ],
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "schema": {
//               "type": "number"
//             }
//           }
//         ],
//         "requestBody": {
//           "content": {
//             "application/json": {
//               "schema": {
//                 "type": "object",
//                 "properties": {
//                   "name": {
//                     "type": "string"
//                   },
//                   "email": {
//                     "type": "string"
//                   }
//                 }
//               }
//             }
//           }
//         },
//         "responses": {
//           "default": {
//             "description": "Patched User",
//             "content": {
//               "application/json": {
//                 "schema": {
//                   "type": "object",
//                   "properties": {
//                     "id": {
//                       "type": "number"
//                     },
//                     "name": {
//                       "type": "string"
//                     },
//                     "email": {
//                       "type": "string"
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
```

## Tests

```bash
npm run test
```

## License

MIT
