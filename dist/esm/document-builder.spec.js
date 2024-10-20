var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { expect } from 'chai';
import { describe } from 'mocha';
import { oaTag } from './decorators/index.js';
import { OADataType } from './document-types.js';
import { OAMediaType } from './document-types.js';
import { oaResponse } from './decorators/index.js';
import { oaOperation } from './decorators/index.js';
import { oaParameter } from './decorators/index.js';
import { oaRequestBody } from './decorators/index.js';
import { OAOperationMethod } from './document-types.js';
import { OADocumentBuilder } from './document-builder.js';
import { OAParameterLocation } from './document-types.js';
const OPENAPI_VERSION = '3.1.0';
const DUMMY_DOC = {
    openapi: OPENAPI_VERSION,
    info: {
        title: 'Test document',
        version: OPENAPI_VERSION,
    },
};
describe('OADocumentBuilder', function () {
    describe('constructor', function () {
        it('uses a copy of the given document as the initial schema', function () {
            const builder = new OADocumentBuilder(DUMMY_DOC);
            const res = builder['doc'];
            expect(res).to.be.eql(DUMMY_DOC);
            expect(res).to.be.not.eq(DUMMY_DOC);
        });
        it('ignores a provided openapi version', function () {
            const doc = JSON.parse(JSON.stringify(DUMMY_DOC));
            doc.openapi = '1.2.3';
            doc.info.version = '1.2.3';
            const builder = new OADocumentBuilder(doc);
            const res = builder['doc'];
            expect(res).to.be.eql(DUMMY_DOC);
            expect(res).to.be.not.eq(DUMMY_DOC);
        });
    });
    describe('build', function () {
        it('returns the copy of the document', function () {
            const builder = new OADocumentBuilder(DUMMY_DOC);
            const res = builder.build();
            expect(res).to.be.eql(DUMMY_DOC);
            expect(res).to.be.not.eq(DUMMY_DOC);
        });
    });
    describe('useClassMetadata', function () {
        describe('tag', function () {
            it('adds the tag object by the class metadata', function () {
                let Target = class Target {
                };
                Target = __decorate([
                    oaTag({ name: 'Tag' })
                ], Target);
                const builder = new OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                expect(res).to.be.eql({
                    ...DUMMY_DOC,
                    tags: [{ name: 'Tag' }],
                });
            });
            it('uses the class name as the tag name', function () {
                let Target = class Target {
                };
                Target = __decorate([
                    oaTag()
                ], Target);
                const builder = new OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                expect(res).to.be.eql({
                    ...DUMMY_DOC,
                    tags: [{ name: 'Target' }],
                });
            });
            it('ignores the "Controller" postfix of the class name', function () {
                let UserController = class UserController {
                };
                UserController = __decorate([
                    oaTag()
                ], UserController);
                const builder = new OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(UserController);
                const res = builder.build();
                expect(res).to.be.eql({
                    ...DUMMY_DOC,
                    tags: [{ name: 'User' }],
                });
            });
            it('does not ignore the "Controller" postfix of the tag name that defined explicitly', function () {
                let Target = class Target {
                };
                Target = __decorate([
                    oaTag({ name: 'UserController' })
                ], Target);
                const builder = new OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                expect(res).to.be.eql({
                    ...DUMMY_DOC,
                    tags: [{ name: 'UserController' }],
                });
            });
            it('does not add the "path" option from the tag metadata', function () {
                let Target = class Target {
                };
                Target = __decorate([
                    oaTag({ name: 'Tag', path: '/path' })
                ], Target);
                const builder = new OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                expect(res).to.be.eql({
                    ...DUMMY_DOC,
                    tags: [{ name: 'Tag' }],
                });
            });
        });
        describe('operation', function () {
            it('adds the operation object by the class metadata', function () {
                class Target {
                    operation() {
                        /**/
                    }
                }
                __decorate([
                    oaOperation({
                        method: OAOperationMethod.GET,
                        path: '/operation',
                        summary: 'Operation summary',
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "operation", null);
                const builder = new OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                expect(res).to.be.eql({
                    ...DUMMY_DOC,
                    paths: {
                        '/operation': {
                            get: {
                                summary: 'Operation summary',
                            },
                        },
                    },
                });
            });
            it('adds the target tag to the operation object', function () {
                let Target = class Target {
                    operation() {
                        /**/
                    }
                };
                __decorate([
                    oaOperation({
                        method: OAOperationMethod.GET,
                        path: '/operation',
                        summary: 'Operation summary',
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "operation", null);
                Target = __decorate([
                    oaTag()
                ], Target);
                const builder = new OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                expect(res).to.be.eql({
                    ...DUMMY_DOC,
                    tags: [{ name: 'Target' }],
                    paths: {
                        '/operation': {
                            get: {
                                tags: ['Target'],
                                summary: 'Operation summary',
                            },
                        },
                    },
                });
            });
            it('uses the tag path as the operation path prefix', function () {
                let Target = class Target {
                    operation() {
                        /**/
                    }
                };
                __decorate([
                    oaOperation({
                        method: OAOperationMethod.GET,
                        path: '/operation',
                        summary: 'Operation summary',
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "operation", null);
                Target = __decorate([
                    oaTag({ path: '/tag' })
                ], Target);
                const builder = new OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                expect(res).to.be.eql({
                    ...DUMMY_DOC,
                    tags: [{ name: 'Target' }],
                    paths: {
                        '/tag/operation': {
                            get: {
                                tags: ['Target'],
                                summary: 'Operation summary',
                            },
                        },
                    },
                });
            });
        });
        describe('parameter', function () {
            describe('decorator applied to an instance method', () => {
                it('ignores parameters metadata if no operation declared', function () {
                    class Target {
                        operation() {
                            /**/
                        }
                    }
                    __decorate([
                        oaParameter({
                            name: 'param1',
                            in: OAParameterLocation.QUERY,
                            schema: { type: OADataType.STRING },
                        }),
                        oaParameter({
                            name: 'param2',
                            in: OAParameterLocation.QUERY,
                            schema: { type: OADataType.NUMBER },
                        }),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    expect(res).to.be.eql(DUMMY_DOC);
                });
                it('adds declared parameters to the operation object', function () {
                    class Target {
                        operation() {
                            /**/
                        }
                    }
                    __decorate([
                        oaOperation({
                            method: OAOperationMethod.GET,
                            path: '/operation',
                            summary: 'Operation summary',
                        }),
                        oaParameter({
                            name: 'param1',
                            in: OAParameterLocation.QUERY,
                            schema: { type: OADataType.STRING },
                        }),
                        oaParameter({
                            name: 'param2',
                            in: OAParameterLocation.QUERY,
                            schema: { type: OADataType.NUMBER },
                        }),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    expect(res).to.be.eql({
                        ...DUMMY_DOC,
                        paths: {
                            '/operation': {
                                get: {
                                    summary: 'Operation summary',
                                    parameters: [
                                        {
                                            name: 'param1',
                                            in: OAParameterLocation.QUERY,
                                            schema: { type: OADataType.STRING },
                                        },
                                        {
                                            name: 'param2',
                                            in: OAParameterLocation.QUERY,
                                            schema: { type: OADataType.NUMBER },
                                        },
                                    ],
                                },
                            },
                        },
                    });
                });
                it('makes path parameters required', function () {
                    class Target {
                        operation() {
                            /**/
                        }
                    }
                    __decorate([
                        oaOperation({
                            method: OAOperationMethod.GET,
                            path: '/operation',
                            summary: 'Operation summary',
                        }),
                        oaParameter({
                            name: 'param1',
                            in: OAParameterLocation.PATH,
                            schema: { type: OADataType.STRING },
                        }),
                        oaParameter({
                            name: 'param2',
                            in: OAParameterLocation.PATH,
                            schema: { type: OADataType.NUMBER },
                        }),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    expect(res).to.be.eql({
                        ...DUMMY_DOC,
                        paths: {
                            '/operation': {
                                get: {
                                    summary: 'Operation summary',
                                    parameters: [
                                        {
                                            name: 'param1',
                                            in: OAParameterLocation.PATH,
                                            schema: { type: OADataType.STRING },
                                            required: true,
                                        },
                                        {
                                            name: 'param2',
                                            in: OAParameterLocation.PATH,
                                            schema: { type: OADataType.NUMBER },
                                            required: true,
                                        },
                                    ],
                                },
                            },
                        },
                    });
                });
            });
            describe('decorator applied to an instance method parameter', function () {
                it('ignores parameters metadata if no operation declared', function () {
                    class Target {
                        operation(// eslint-disable-next-line @typescript-eslint/no-unused-vars
                        param1, // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        param2) {
                            /**/
                        }
                    }
                    __decorate([
                        __param(0, oaParameter({
                            name: 'param1',
                            in: OAParameterLocation.QUERY,
                            schema: { type: OADataType.STRING },
                        })),
                        __param(1, oaParameter({
                            name: 'param2',
                            in: OAParameterLocation.QUERY,
                            schema: { type: OADataType.NUMBER },
                        })),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String, Number]),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    expect(res).to.be.eql(DUMMY_DOC);
                });
                it('adds declared parameters to the operation object', function () {
                    class Target {
                        operation(// eslint-disable-next-line @typescript-eslint/no-unused-vars
                        param1, // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        param2) {
                            /**/
                        }
                    }
                    __decorate([
                        oaOperation({
                            method: OAOperationMethod.GET,
                            path: '/operation',
                            summary: 'Operation summary',
                        }),
                        __param(0, oaParameter({
                            name: 'param1',
                            in: OAParameterLocation.QUERY,
                            schema: { type: OADataType.STRING },
                        })),
                        __param(1, oaParameter({
                            name: 'param2',
                            in: OAParameterLocation.QUERY,
                            schema: { type: OADataType.NUMBER },
                        })),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String, Number]),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    expect(res).to.be.eql({
                        ...DUMMY_DOC,
                        paths: {
                            '/operation': {
                                get: {
                                    summary: 'Operation summary',
                                    parameters: [
                                        {
                                            name: 'param1',
                                            in: OAParameterLocation.QUERY,
                                            schema: { type: OADataType.STRING },
                                        },
                                        {
                                            name: 'param2',
                                            in: OAParameterLocation.QUERY,
                                            schema: { type: OADataType.NUMBER },
                                        },
                                    ],
                                },
                            },
                        },
                    });
                });
                it('makes path parameters required', function () {
                    class Target {
                        operation(// eslint-disable-next-line @typescript-eslint/no-unused-vars
                        param1, // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        param2) {
                            /**/
                        }
                    }
                    __decorate([
                        oaOperation({
                            method: OAOperationMethod.GET,
                            path: '/operation',
                            summary: 'Operation summary',
                        }),
                        __param(0, oaParameter({
                            name: 'param1',
                            in: OAParameterLocation.PATH,
                            schema: { type: OADataType.STRING },
                        })),
                        __param(1, oaParameter({
                            name: 'param2',
                            in: OAParameterLocation.PATH,
                            schema: { type: OADataType.NUMBER },
                        })),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String, Number]),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    expect(res).to.be.eql({
                        ...DUMMY_DOC,
                        paths: {
                            '/operation': {
                                get: {
                                    summary: 'Operation summary',
                                    parameters: [
                                        {
                                            name: 'param1',
                                            in: OAParameterLocation.PATH,
                                            schema: { type: OADataType.STRING },
                                            required: true,
                                        },
                                        {
                                            name: 'param2',
                                            in: OAParameterLocation.PATH,
                                            schema: { type: OADataType.NUMBER },
                                            required: true,
                                        },
                                    ],
                                },
                            },
                        },
                    });
                });
            });
        });
        describe('request body', function () {
            describe('decorator applied to an instance method', () => {
                it('ignores request body metadata if no operation declared', function () {
                    class Target {
                        operation() {
                            /**/
                        }
                    }
                    __decorate([
                        oaRequestBody({
                            mediaType: OAMediaType.APPLICATION_JSON,
                            description: 'Request body description',
                            schema: { type: OADataType.OBJECT },
                            example: { foo: 'bar' },
                            required: true,
                        }),
                        oaRequestBody({
                            mediaType: OAMediaType.APPLICATION_XML,
                            description: 'Request body description',
                            schema: { type: OADataType.OBJECT },
                            example: { bar: 'baz' },
                            required: true,
                        }),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    expect(res).to.be.eql(DUMMY_DOC);
                });
                it('adds declared request body to the operation object', function () {
                    class Target {
                        operation() {
                            /**/
                        }
                    }
                    __decorate([
                        oaOperation({
                            method: OAOperationMethod.GET,
                            path: '/operation',
                            summary: 'Operation summary',
                        }),
                        oaRequestBody({
                            mediaType: OAMediaType.APPLICATION_JSON,
                            description: 'Request body description',
                            schema: { type: OADataType.OBJECT },
                            example: { foo: 'bar' },
                            required: true,
                        }),
                        oaRequestBody({
                            mediaType: OAMediaType.APPLICATION_XML,
                            description: 'Request body description',
                            schema: { type: OADataType.OBJECT },
                            example: { bar: 'baz' },
                            required: true,
                        }),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    expect(res).to.be.eql({
                        ...DUMMY_DOC,
                        paths: {
                            '/operation': {
                                get: {
                                    summary: 'Operation summary',
                                    requestBody: {
                                        description: 'Request body description',
                                        content: {
                                            [OAMediaType.APPLICATION_JSON]: {
                                                schema: { type: OADataType.OBJECT },
                                                example: { foo: 'bar' },
                                            },
                                            [OAMediaType.APPLICATION_XML]: {
                                                schema: { type: OADataType.OBJECT },
                                                example: { bar: 'baz' },
                                            },
                                        },
                                        required: true,
                                    },
                                },
                            },
                        },
                    });
                });
            });
            describe('decorator applied to an instance method parameter', function () {
                it('ignores request body metadata if no operation declared', function () {
                    class Target {
                        operation(// eslint-disable-next-line @typescript-eslint/no-unused-vars
                        jsonBody, // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        xmlBody) {
                            /**/
                        }
                    }
                    __decorate([
                        __param(0, oaRequestBody({
                            mediaType: OAMediaType.APPLICATION_JSON,
                            description: 'Request body description',
                            schema: { type: OADataType.OBJECT },
                            example: { foo: 'bar' },
                            required: true,
                        })),
                        __param(1, oaRequestBody({
                            mediaType: OAMediaType.APPLICATION_XML,
                            description: 'Request body description',
                            schema: { type: OADataType.OBJECT },
                            example: { bar: 'baz' },
                            required: true,
                        })),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [Object, Object]),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    expect(res).to.be.eql(DUMMY_DOC);
                });
                it('adds declared request body to the operation object', function () {
                    class Target {
                        operation(// eslint-disable-next-line @typescript-eslint/no-unused-vars
                        jsonBody, // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        xmlBody) {
                            /**/
                        }
                    }
                    __decorate([
                        oaOperation({
                            method: OAOperationMethod.GET,
                            path: '/operation',
                            summary: 'Operation summary',
                        }),
                        __param(0, oaRequestBody({
                            mediaType: OAMediaType.APPLICATION_JSON,
                            description: 'Request body description',
                            schema: { type: OADataType.OBJECT },
                            example: { foo: 'bar' },
                            required: true,
                        })),
                        __param(1, oaRequestBody({
                            mediaType: OAMediaType.APPLICATION_XML,
                            description: 'Request body description',
                            schema: { type: OADataType.OBJECT },
                            example: { bar: 'baz' },
                            required: true,
                        })),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [Object, Object]),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    expect(res).to.be.eql({
                        ...DUMMY_DOC,
                        paths: {
                            '/operation': {
                                get: {
                                    summary: 'Operation summary',
                                    requestBody: {
                                        description: 'Request body description',
                                        content: {
                                            [OAMediaType.APPLICATION_JSON]: {
                                                schema: { type: OADataType.OBJECT },
                                                example: { foo: 'bar' },
                                            },
                                            [OAMediaType.APPLICATION_XML]: {
                                                schema: { type: OADataType.OBJECT },
                                                example: { bar: 'baz' },
                                            },
                                        },
                                        required: true,
                                    },
                                },
                            },
                        },
                    });
                });
            });
        });
        describe('response', function () {
            it('ignores response metadata if no operation declared', function () {
                class Target {
                    operation() {
                        /**/
                    }
                }
                __decorate([
                    oaResponse({
                        statusCode: 200,
                        mediaType: OAMediaType.APPLICATION_JSON,
                        description: 'Response description',
                        schema: { type: OADataType.OBJECT },
                        example: { foo: 'bar' },
                    }),
                    oaResponse({
                        statusCode: 200,
                        mediaType: OAMediaType.APPLICATION_XML,
                        description: 'Response description',
                        schema: { type: OADataType.OBJECT },
                        example: { bar: 'baz' },
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "operation", null);
                const builder = new OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                expect(res).to.be.eql(DUMMY_DOC);
            });
            it('adds declared response to the operation object', function () {
                class Target {
                    operation() {
                        /**/
                    }
                }
                __decorate([
                    oaOperation({
                        method: OAOperationMethod.GET,
                        path: '/operation',
                        summary: 'Operation summary',
                    }),
                    oaResponse({
                        statusCode: 200,
                        mediaType: OAMediaType.APPLICATION_JSON,
                        description: 'Response description',
                        schema: { type: OADataType.OBJECT },
                        example: { foo: 'bar' },
                    }),
                    oaResponse({
                        statusCode: 200,
                        mediaType: OAMediaType.APPLICATION_XML,
                        description: 'Response description',
                        schema: { type: OADataType.OBJECT },
                        example: { bar: 'baz' },
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "operation", null);
                const builder = new OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                expect(res).to.be.eql({
                    ...DUMMY_DOC,
                    paths: {
                        '/operation': {
                            get: {
                                summary: 'Operation summary',
                                responses: {
                                    '200': {
                                        description: 'Response description',
                                        content: {
                                            [OAMediaType.APPLICATION_JSON]: {
                                                schema: { type: OADataType.OBJECT },
                                                example: { foo: 'bar' },
                                            },
                                            [OAMediaType.APPLICATION_XML]: {
                                                schema: { type: OADataType.OBJECT },
                                                example: { bar: 'baz' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                });
            });
        });
    });
});
