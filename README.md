## @e22m4u/ts-openapi

ES-модуль содержит набор TypeScript декораторов для генерации
[OpenAPI Документа](https://spec.openapis.org/oas/v3.1.0) версии 3.1.0

## Установка

```bash
npm install @e22m4u/ts-openapi
```

Для поддержки ESM и работы декораторов требуется добавить следующие
опции в файл `tsconfig.json` вашего проекта.

```json
{
  "module": "NodeNext",
  "moduleResolution": "NodeNext",
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Пример

Опишите спецификацию вашего контроллера с помощью [декораторов](#Декораторы)
класса, методов и их параметров.

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

Создайте OpenApi документ используя мета-данные контроллера.

```ts
import {OADocumentBuilder} from '@e22m4u/ts-openapi';

const builder = new OADocumentBuilder({info: {title: 'My project'}});
builder.useClassMetadata(UserController);
const doc = builder.build();

console.log(doc);
```

Результат

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

## Декораторы

### @OATag

Добавляет метаданные тега к классу.

```ts
import {OATag} from '@e22m4u/ts-openapi';

@OATag({
  name: 'User',
  description: 'The User Controller',
  // параметр "path" используется как
  // префикс маршрута для операций
  // данного контроллера
  path: '/user',
})
class UserController {/* ... */}
```

[OATagMetadata.ts](src/decorators/tag/tag-metadata.ts)

Спецификация:
- [Tag Object](https://spec.openapis.org/oas/v3.1.0#tag-object)

### @OAOperation

Описывает операцию на определенном маршруте.

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

Спецификация:
- [Paths Object](https://spec.openapis.org/oas/v3.1.0#paths-object)  
- [Path Item Object](https://spec.openapis.org/oas/v3.1.0#path-item-object)  
- [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)

### @OAResponse

Описывает возвращаемый ответ операции.

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

Спецификация:
- [Responses Object](https://spec.openapis.org/oas/v3.1.0#responses-object)  
- [Response Object](https://spec.openapis.org/oas/v3.1.0#response-object)  
- [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)

### @OAParameter

Описывает параметр операции.

```ts
import {
  OADataType,
  OAParameter,
  OAParameterLocation,
} from '@e22m4u/ts-openapi';

class UserController {
  // декоратор параметра можно
  // применить к методу
  @OAParameter({
    name: 'foo',
    in: OAParameterLocation.QUERY,
    schema: {type: OADataType.STRING},
  })
  findById(
    // или непосредственно
    // к нужному параметру
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

Спецификация:
- [Parameter Object](https://spec.openapis.org/oas/v3.1.0#parameter-object)  
- [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)

### @OARequestBody

Описывает тело принимаемого запроса.

```ts
import {
  OADataType,
  OAMediaType,
  OARequestBody,
} from '@e22m4u/ts-openapi';

class UserController {
  // декоратор тела запроса
  // можно применить к методу
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
    // или непосредственно
    // к нужному параметру
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

Спецификация:
- [Request Body Object](https://spec.openapis.org/oas/v3.1.0#request-body-object)

## Тесты

```bash
npm run test
```

## Лицензия

MIT
