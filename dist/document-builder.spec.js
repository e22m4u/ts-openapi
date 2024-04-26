"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const decorators_1 = require("./decorators");
const decorators_2 = require("./decorators");
const decorators_3 = require("./decorators");
const decorators_4 = require("./decorators");
const decorators_5 = require("./decorators");
const document_types_1 = require("./document-types");
const document_types_2 = require("./document-types");
const document_types_3 = require("./document-types");
const document_types_4 = require("./document-types");
const document_builder_1 = require("./document-builder");
const OPENAPI_VERSION = '3.1.0';
const DUMMY_DOC = {
    openapi: OPENAPI_VERSION,
    info: { title: 'Test document' },
};
(0, mocha_1.describe)('OADocumentBuilder', function () {
    (0, mocha_1.describe)('constructor', function () {
        it('uses a copy of the given document as the initial schema', function () {
            const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
            const res = builder['doc'];
            (0, chai_1.expect)(res).to.be.eql(DUMMY_DOC);
            (0, chai_1.expect)(res).to.be.not.eq(DUMMY_DOC);
        });
        it('ignores a provided openapi version', function () {
            const doc = Object.assign(Object.assign({}, DUMMY_DOC), { openapi: '1.2.3' });
            const builder = new document_builder_1.OADocumentBuilder(doc);
            const res = builder['doc'];
            (0, chai_1.expect)(res).to.be.eql(DUMMY_DOC);
            (0, chai_1.expect)(res).to.be.not.eq(DUMMY_DOC);
        });
    });
    (0, mocha_1.describe)('build', function () {
        it('returns the copy of the document', function () {
            const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
            const res = builder.build();
            (0, chai_1.expect)(res).to.be.eql(DUMMY_DOC);
            (0, chai_1.expect)(res).to.be.not.eq(DUMMY_DOC);
        });
    });
    (0, mocha_1.describe)('useClassMetadata', function () {
        (0, mocha_1.describe)('tag', function () {
            it('adds the tag object by the class metadata', function () {
                let Target = class Target {
                };
                Target = __decorate([
                    (0, decorators_1.OATag)({ name: 'Tag' })
                ], Target);
                const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { tags: [{ name: 'Tag' }] }));
            });
            it('uses the class name as the tag name', function () {
                let Target = class Target {
                };
                Target = __decorate([
                    (0, decorators_1.OATag)()
                ], Target);
                const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { tags: [{ name: 'Target' }] }));
            });
            it('ignores the "Controller" postfix of the class name', function () {
                let UserController = class UserController {
                };
                UserController = __decorate([
                    (0, decorators_1.OATag)()
                ], UserController);
                const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(UserController);
                const res = builder.build();
                (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { tags: [{ name: 'User' }] }));
            });
            it('does not ignore the "Controller" postfix of the tag name that defined explicitly', function () {
                let Target = class Target {
                };
                Target = __decorate([
                    (0, decorators_1.OATag)({ name: 'UserController' })
                ], Target);
                const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { tags: [{ name: 'UserController' }] }));
            });
            it('does not add the "path" option from the tag metadata', function () {
                let Target = class Target {
                };
                Target = __decorate([
                    (0, decorators_1.OATag)({ name: 'Tag', path: '/path' })
                ], Target);
                const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { tags: [{ name: 'Tag' }] }));
            });
        });
        (0, mocha_1.describe)('operation', function () {
            it('adds the operation object by the class metadata', function () {
                class Target {
                    operation() {
                        /**/
                    }
                }
                __decorate([
                    (0, decorators_3.OAOperation)({
                        method: document_types_3.OAOperationMethod.GET,
                        path: '/operation',
                        summary: 'Operation summary',
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "operation", null);
                const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { paths: {
                        '/operation': {
                            get: {
                                summary: 'Operation summary',
                            },
                        },
                    } }));
            });
            it('adds the target tag to the operation object', function () {
                let Target = class Target {
                    operation() {
                        /**/
                    }
                };
                __decorate([
                    (0, decorators_3.OAOperation)({
                        method: document_types_3.OAOperationMethod.GET,
                        path: '/operation',
                        summary: 'Operation summary',
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "operation", null);
                Target = __decorate([
                    (0, decorators_1.OATag)()
                ], Target);
                const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { tags: [{ name: 'Target' }], paths: {
                        '/operation': {
                            get: {
                                tags: ['Target'],
                                summary: 'Operation summary',
                            },
                        },
                    } }));
            });
            it('uses the tag path as the operation path prefix', function () {
                let Target = class Target {
                    operation() {
                        /**/
                    }
                };
                __decorate([
                    (0, decorators_3.OAOperation)({
                        method: document_types_3.OAOperationMethod.GET,
                        path: '/operation',
                        summary: 'Operation summary',
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "operation", null);
                Target = __decorate([
                    (0, decorators_1.OATag)({ path: '/tag' })
                ], Target);
                const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { tags: [{ name: 'Target' }], paths: {
                        '/tag/operation': {
                            get: {
                                tags: ['Target'],
                                summary: 'Operation summary',
                            },
                        },
                    } }));
            });
        });
        (0, mocha_1.describe)('parameter', function () {
            (0, mocha_1.describe)('decorator applied to an instance method', () => {
                it('ignores parameters metadata if no operation declared', function () {
                    class Target {
                        operation() {
                            /**/
                        }
                    }
                    __decorate([
                        (0, decorators_4.OAParameter)({
                            name: 'param1',
                            in: document_types_4.OAParameterLocation.PATH,
                            schema: { type: document_types_1.OADataType.STRING },
                        }),
                        (0, decorators_4.OAParameter)({
                            name: 'param2',
                            in: document_types_4.OAParameterLocation.PATH,
                            schema: { type: document_types_1.OADataType.NUMBER },
                        }),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    (0, chai_1.expect)(res).to.be.eql(DUMMY_DOC);
                });
                it('adds declared parameters to the operation object', function () {
                    class Target {
                        operation() {
                            /**/
                        }
                    }
                    __decorate([
                        (0, decorators_3.OAOperation)({
                            method: document_types_3.OAOperationMethod.GET,
                            path: '/operation',
                            summary: 'Operation summary',
                        }),
                        (0, decorators_4.OAParameter)({
                            name: 'param1',
                            in: document_types_4.OAParameterLocation.PATH,
                            schema: { type: document_types_1.OADataType.STRING },
                        }),
                        (0, decorators_4.OAParameter)({
                            name: 'param2',
                            in: document_types_4.OAParameterLocation.PATH,
                            schema: { type: document_types_1.OADataType.NUMBER },
                        }),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { paths: {
                            '/operation': {
                                get: {
                                    summary: 'Operation summary',
                                    parameters: [
                                        {
                                            name: 'param1',
                                            in: document_types_4.OAParameterLocation.PATH,
                                            schema: { type: document_types_1.OADataType.STRING },
                                        },
                                        {
                                            name: 'param2',
                                            in: document_types_4.OAParameterLocation.PATH,
                                            schema: { type: document_types_1.OADataType.NUMBER },
                                        },
                                    ],
                                },
                            },
                        } }));
                });
            });
            (0, mocha_1.describe)('decorator applied to an instance method parameter', function () {
                it('ignores parameters metadata if no operation declared', function () {
                    class Target {
                        operation(// eslint-disable-next-line @typescript-eslint/no-unused-vars
                        param1, // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        param2) {
                            /**/
                        }
                    }
                    __decorate([
                        __param(0, (0, decorators_4.OAParameter)({
                            name: 'param1',
                            in: document_types_4.OAParameterLocation.PATH,
                            schema: { type: document_types_1.OADataType.STRING },
                        })),
                        __param(1, (0, decorators_4.OAParameter)({
                            name: 'param2',
                            in: document_types_4.OAParameterLocation.PATH,
                            schema: { type: document_types_1.OADataType.NUMBER },
                        })),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String, Number]),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    (0, chai_1.expect)(res).to.be.eql(DUMMY_DOC);
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
                        (0, decorators_3.OAOperation)({
                            method: document_types_3.OAOperationMethod.GET,
                            path: '/operation',
                            summary: 'Operation summary',
                        }),
                        __param(0, (0, decorators_4.OAParameter)({
                            name: 'param1',
                            in: document_types_4.OAParameterLocation.PATH,
                            schema: { type: document_types_1.OADataType.STRING },
                        })),
                        __param(1, (0, decorators_4.OAParameter)({
                            name: 'param2',
                            in: document_types_4.OAParameterLocation.PATH,
                            schema: { type: document_types_1.OADataType.NUMBER },
                        })),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String, Number]),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { paths: {
                            '/operation': {
                                get: {
                                    summary: 'Operation summary',
                                    parameters: [
                                        {
                                            name: 'param1',
                                            in: document_types_4.OAParameterLocation.PATH,
                                            schema: { type: document_types_1.OADataType.STRING },
                                        },
                                        {
                                            name: 'param2',
                                            in: document_types_4.OAParameterLocation.PATH,
                                            schema: { type: document_types_1.OADataType.NUMBER },
                                        },
                                    ],
                                },
                            },
                        } }));
                });
            });
        });
        (0, mocha_1.describe)('request body', function () {
            (0, mocha_1.describe)('decorator applied to an instance method', () => {
                it('ignores request body metadata if no operation declared', function () {
                    class Target {
                        operation() {
                            /**/
                        }
                    }
                    __decorate([
                        (0, decorators_5.OARequestBody)({
                            mediaType: document_types_2.OAMediaType.JSON,
                            description: 'Request body description',
                            schema: { type: document_types_1.OADataType.OBJECT },
                            example: { foo: 'bar' },
                            required: true,
                        }),
                        (0, decorators_5.OARequestBody)({
                            mediaType: document_types_2.OAMediaType.XML,
                            description: 'Request body description',
                            schema: { type: document_types_1.OADataType.OBJECT },
                            example: { bar: 'baz' },
                            required: true,
                        }),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    (0, chai_1.expect)(res).to.be.eql(DUMMY_DOC);
                });
                it('adds declared request body to the operation object', function () {
                    class Target {
                        operation() {
                            /**/
                        }
                    }
                    __decorate([
                        (0, decorators_3.OAOperation)({
                            method: document_types_3.OAOperationMethod.GET,
                            path: '/operation',
                            summary: 'Operation summary',
                        }),
                        (0, decorators_5.OARequestBody)({
                            mediaType: document_types_2.OAMediaType.JSON,
                            description: 'Request body description',
                            schema: { type: document_types_1.OADataType.OBJECT },
                            example: { foo: 'bar' },
                            required: true,
                        }),
                        (0, decorators_5.OARequestBody)({
                            mediaType: document_types_2.OAMediaType.XML,
                            description: 'Request body description',
                            schema: { type: document_types_1.OADataType.OBJECT },
                            example: { bar: 'baz' },
                            required: true,
                        }),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", []),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { paths: {
                            '/operation': {
                                get: {
                                    summary: 'Operation summary',
                                    requestBody: {
                                        description: 'Request body description',
                                        content: {
                                            [document_types_2.OAMediaType.JSON]: {
                                                schema: { type: document_types_1.OADataType.OBJECT },
                                                example: { foo: 'bar' },
                                            },
                                            [document_types_2.OAMediaType.XML]: {
                                                schema: { type: document_types_1.OADataType.OBJECT },
                                                example: { bar: 'baz' },
                                            },
                                        },
                                        required: true,
                                    },
                                },
                            },
                        } }));
                });
            });
            (0, mocha_1.describe)('decorator applied to an instance method parameter', function () {
                it('ignores request body metadata if no operation declared', function () {
                    class Target {
                        operation(// eslint-disable-next-line @typescript-eslint/no-unused-vars
                        jsonBody, // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        xmlBody) {
                            /**/
                        }
                    }
                    __decorate([
                        __param(0, (0, decorators_5.OARequestBody)({
                            mediaType: document_types_2.OAMediaType.JSON,
                            description: 'Request body description',
                            schema: { type: document_types_1.OADataType.OBJECT },
                            example: { foo: 'bar' },
                            required: true,
                        })),
                        __param(1, (0, decorators_5.OARequestBody)({
                            mediaType: document_types_2.OAMediaType.XML,
                            description: 'Request body description',
                            schema: { type: document_types_1.OADataType.OBJECT },
                            example: { bar: 'baz' },
                            required: true,
                        })),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [Object, Object]),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    (0, chai_1.expect)(res).to.be.eql(DUMMY_DOC);
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
                        (0, decorators_3.OAOperation)({
                            method: document_types_3.OAOperationMethod.GET,
                            path: '/operation',
                            summary: 'Operation summary',
                        }),
                        __param(0, (0, decorators_5.OARequestBody)({
                            mediaType: document_types_2.OAMediaType.JSON,
                            description: 'Request body description',
                            schema: { type: document_types_1.OADataType.OBJECT },
                            example: { foo: 'bar' },
                            required: true,
                        })),
                        __param(1, (0, decorators_5.OARequestBody)({
                            mediaType: document_types_2.OAMediaType.XML,
                            description: 'Request body description',
                            schema: { type: document_types_1.OADataType.OBJECT },
                            example: { bar: 'baz' },
                            required: true,
                        })),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [Object, Object]),
                        __metadata("design:returntype", void 0)
                    ], Target.prototype, "operation", null);
                    const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                    builder.useClassMetadata(Target);
                    const res = builder.build();
                    (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { paths: {
                            '/operation': {
                                get: {
                                    summary: 'Operation summary',
                                    requestBody: {
                                        description: 'Request body description',
                                        content: {
                                            [document_types_2.OAMediaType.JSON]: {
                                                schema: { type: document_types_1.OADataType.OBJECT },
                                                example: { foo: 'bar' },
                                            },
                                            [document_types_2.OAMediaType.XML]: {
                                                schema: { type: document_types_1.OADataType.OBJECT },
                                                example: { bar: 'baz' },
                                            },
                                        },
                                        required: true,
                                    },
                                },
                            },
                        } }));
                });
            });
        });
        (0, mocha_1.describe)('response', function () {
            it('ignores response metadata if no operation declared', function () {
                class Target {
                    operation() {
                        /**/
                    }
                }
                __decorate([
                    (0, decorators_2.OAResponse)({
                        statusCode: 200,
                        mediaType: document_types_2.OAMediaType.JSON,
                        description: 'Response description',
                        schema: { type: document_types_1.OADataType.OBJECT },
                        example: { foo: 'bar' },
                    }),
                    (0, decorators_2.OAResponse)({
                        statusCode: 200,
                        mediaType: document_types_2.OAMediaType.XML,
                        description: 'Response description',
                        schema: { type: document_types_1.OADataType.OBJECT },
                        example: { bar: 'baz' },
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "operation", null);
                const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                (0, chai_1.expect)(res).to.be.eql(DUMMY_DOC);
            });
            it('adds declared response to the operation object', function () {
                class Target {
                    operation() {
                        /**/
                    }
                }
                __decorate([
                    (0, decorators_3.OAOperation)({
                        method: document_types_3.OAOperationMethod.GET,
                        path: '/operation',
                        summary: 'Operation summary',
                    }),
                    (0, decorators_2.OAResponse)({
                        statusCode: 200,
                        mediaType: document_types_2.OAMediaType.JSON,
                        description: 'Response description',
                        schema: { type: document_types_1.OADataType.OBJECT },
                        example: { foo: 'bar' },
                    }),
                    (0, decorators_2.OAResponse)({
                        statusCode: 200,
                        mediaType: document_types_2.OAMediaType.XML,
                        description: 'Response description',
                        schema: { type: document_types_1.OADataType.OBJECT },
                        example: { bar: 'baz' },
                    }),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Target.prototype, "operation", null);
                const builder = new document_builder_1.OADocumentBuilder(DUMMY_DOC);
                builder.useClassMetadata(Target);
                const res = builder.build();
                (0, chai_1.expect)(res).to.be.eql(Object.assign(Object.assign({}, DUMMY_DOC), { paths: {
                        '/operation': {
                            get: {
                                summary: 'Operation summary',
                                responses: {
                                    '200': {
                                        description: 'Response description',
                                        content: {
                                            [document_types_2.OAMediaType.JSON]: {
                                                schema: { type: document_types_1.OADataType.OBJECT },
                                                example: { foo: 'bar' },
                                            },
                                            [document_types_2.OAMediaType.XML]: {
                                                schema: { type: document_types_1.OADataType.OBJECT },
                                                example: { bar: 'baz' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    } }));
            });
        });
    });
});
