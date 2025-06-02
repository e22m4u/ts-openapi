import {expect} from 'chai';
import {oaTag} from './decorators/index.js';
import {OADataType} from './document-types.js';
import {OAMediaType} from './document-types.js';
import {oaResponse} from './decorators/index.js';
import {oaOperation} from './decorators/index.js';
import {oaParameter} from './decorators/index.js';
import {oaRequestBody} from './decorators/index.js';
import {OAOperationMethod} from './document-types.js';
import {OPENAPI_VERSION} from './document-builder.js';
import {OADocumentBuilder} from './document-builder.js';
import {OAParameterLocation} from './document-types.js';

const DUMMY_DOC = {
  openapi: OPENAPI_VERSION,
  info: {
    title: 'Test document',
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
        @oaTag({name: 'Tag'})
        class Target {}
        const builder = new OADocumentBuilder(DUMMY_DOC);
        builder.useClassMetadata(Target);
        const res = builder.build();
        expect(res).to.be.eql({
          ...DUMMY_DOC,
          tags: [{name: 'Tag'}],
        });
      });

      it('uses the class name as the tag name', function () {
        @oaTag()
        class Target {}
        const builder = new OADocumentBuilder(DUMMY_DOC);
        builder.useClassMetadata(Target);
        const res = builder.build();
        expect(res).to.be.eql({
          ...DUMMY_DOC,
          tags: [{name: 'Target'}],
        });
      });

      it('ignores the "Controller" postfix of the class name', function () {
        @oaTag()
        class UserController {}
        const builder = new OADocumentBuilder(DUMMY_DOC);
        builder.useClassMetadata(UserController);
        const res = builder.build();
        expect(res).to.be.eql({
          ...DUMMY_DOC,
          tags: [{name: 'User'}],
        });
      });

      it('does not ignore the "Controller" postfix of the tag name that defined explicitly', function () {
        @oaTag({name: 'UserController'})
        class Target {}
        const builder = new OADocumentBuilder(DUMMY_DOC);
        builder.useClassMetadata(Target);
        const res = builder.build();
        expect(res).to.be.eql({
          ...DUMMY_DOC,
          tags: [{name: 'UserController'}],
        });
      });

      it('does not add the "path" option from the tag metadata', function () {
        @oaTag({name: 'Tag', path: '/path'})
        class Target {}
        const builder = new OADocumentBuilder(DUMMY_DOC);
        builder.useClassMetadata(Target);
        const res = builder.build();
        expect(res).to.be.eql({
          ...DUMMY_DOC,
          tags: [{name: 'Tag'}],
        });
      });
    });

    describe('operation', function () {
      it('adds the operation object by the class metadata', function () {
        class Target {
          @oaOperation({
            method: OAOperationMethod.GET,
            path: '/operation',
            summary: 'Operation summary',
          })
          operation() {
            /**/
          }
        }
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
        @oaTag()
        class Target {
          @oaOperation({
            method: OAOperationMethod.GET,
            path: '/operation',
            summary: 'Operation summary',
          })
          operation() {
            /**/
          }
        }
        const builder = new OADocumentBuilder(DUMMY_DOC);
        builder.useClassMetadata(Target);
        const res = builder.build();
        expect(res).to.be.eql({
          ...DUMMY_DOC,
          tags: [{name: 'Target'}],
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
        @oaTag({path: '/tag'})
        class Target {
          @oaOperation({
            method: OAOperationMethod.GET,
            path: '/operation',
            summary: 'Operation summary',
          })
          operation() {
            /**/
          }
        }
        const builder = new OADocumentBuilder(DUMMY_DOC);
        builder.useClassMetadata(Target);
        const res = builder.build();
        expect(res).to.be.eql({
          ...DUMMY_DOC,
          tags: [{name: 'Target'}],
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
      describe('decorator applied to an instance method', function () {
        it('ignores parameters metadata if no operation declared', function () {
          class Target {
            @oaParameter({
              name: 'param1',
              in: OAParameterLocation.QUERY,
              schema: {type: OADataType.STRING},
            })
            @oaParameter({
              name: 'param2',
              in: OAParameterLocation.QUERY,
              schema: {type: OADataType.NUMBER},
            })
            operation() {
              /**/
            }
          }
          const builder = new OADocumentBuilder(DUMMY_DOC);
          builder.useClassMetadata(Target);
          const res = builder.build();
          expect(res).to.be.eql(DUMMY_DOC);
        });

        it('adds declared parameters to the operation object', function () {
          class Target {
            @oaOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            @oaParameter({
              name: 'param1',
              in: OAParameterLocation.QUERY,
              schema: {type: OADataType.STRING},
            })
            @oaParameter({
              name: 'param2',
              in: OAParameterLocation.QUERY,
              schema: {type: OADataType.NUMBER},
            })
            operation() {
              /**/
            }
          }
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
                      schema: {type: OADataType.STRING},
                    },
                    {
                      name: 'param2',
                      in: OAParameterLocation.QUERY,
                      schema: {type: OADataType.NUMBER},
                    },
                  ],
                },
              },
            },
          });
        });

        it('makes path parameters required', function () {
          class Target {
            @oaOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            @oaParameter({
              name: 'param1',
              in: OAParameterLocation.PATH,
              schema: {type: OADataType.STRING},
            })
            @oaParameter({
              name: 'param2',
              in: OAParameterLocation.PATH,
              schema: {type: OADataType.NUMBER},
            })
            operation() {
              /**/
            }
          }
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
                      schema: {type: OADataType.STRING},
                      required: true,
                    },
                    {
                      name: 'param2',
                      in: OAParameterLocation.PATH,
                      schema: {type: OADataType.NUMBER},
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
            operation(
              @oaParameter({
                name: 'param1',
                in: OAParameterLocation.QUERY,
                schema: {type: OADataType.STRING},
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              param1: string,
              @oaParameter({
                name: 'param2',
                in: OAParameterLocation.QUERY,
                schema: {type: OADataType.NUMBER},
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              param2: number,
            ) {
              /**/
            }
          }
          const builder = new OADocumentBuilder(DUMMY_DOC);
          builder.useClassMetadata(Target);
          const res = builder.build();
          expect(res).to.be.eql(DUMMY_DOC);
        });

        it('adds declared parameters to the operation object', function () {
          class Target {
            @oaOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            operation(
              @oaParameter({
                name: 'param1',
                in: OAParameterLocation.QUERY,
                schema: {type: OADataType.STRING},
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              param1: string,
              @oaParameter({
                name: 'param2',
                in: OAParameterLocation.QUERY,
                schema: {type: OADataType.NUMBER},
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              param2: number,
            ) {
              /**/
            }
          }
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
                      schema: {type: OADataType.STRING},
                    },
                    {
                      name: 'param2',
                      in: OAParameterLocation.QUERY,
                      schema: {type: OADataType.NUMBER},
                    },
                  ],
                },
              },
            },
          });
        });

        it('makes path parameters required', function () {
          class Target {
            @oaOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            operation(
              @oaParameter({
                name: 'param1',
                in: OAParameterLocation.PATH,
                schema: {type: OADataType.STRING},
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              param1: string,
              @oaParameter({
                name: 'param2',
                in: OAParameterLocation.PATH,
                schema: {type: OADataType.NUMBER},
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              param2: number,
            ) {
              /**/
            }
          }
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
                      schema: {type: OADataType.STRING},
                      required: true,
                    },
                    {
                      name: 'param2',
                      in: OAParameterLocation.PATH,
                      schema: {type: OADataType.NUMBER},
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
      describe('decorator applied to an instance method', function () {
        it('ignores request body metadata if no operation declared', function () {
          class Target {
            @oaRequestBody({
              mediaType: OAMediaType.APPLICATION_JSON,
              description: 'Request body description',
              schema: {type: OADataType.OBJECT},
              example: {foo: 'bar'},
              required: true,
            })
            @oaRequestBody({
              mediaType: OAMediaType.APPLICATION_XML,
              description: 'Request body description',
              schema: {type: OADataType.OBJECT},
              example: {bar: 'baz'},
              required: true,
            })
            operation() {
              /**/
            }
          }
          const builder = new OADocumentBuilder(DUMMY_DOC);
          builder.useClassMetadata(Target);
          const res = builder.build();
          expect(res).to.be.eql(DUMMY_DOC);
        });

        it('adds declared request body to the operation object', function () {
          class Target {
            @oaOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            @oaRequestBody({
              mediaType: OAMediaType.APPLICATION_JSON,
              description: 'Request body description',
              schema: {type: OADataType.OBJECT},
              example: {foo: 'bar'},
              required: true,
            })
            @oaRequestBody({
              mediaType: OAMediaType.APPLICATION_XML,
              description: 'Request body description',
              schema: {type: OADataType.OBJECT},
              example: {bar: 'baz'},
              required: true,
            })
            operation() {
              /**/
            }
          }
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
                        schema: {type: OADataType.OBJECT},
                        example: {foo: 'bar'},
                      },
                      [OAMediaType.APPLICATION_XML]: {
                        schema: {type: OADataType.OBJECT},
                        example: {bar: 'baz'},
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
            operation(
              @oaRequestBody({
                mediaType: OAMediaType.APPLICATION_JSON,
                description: 'Request body description',
                schema: {type: OADataType.OBJECT},
                example: {foo: 'bar'},
                required: true,
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              jsonBody: object,
              @oaRequestBody({
                mediaType: OAMediaType.APPLICATION_XML,
                description: 'Request body description',
                schema: {type: OADataType.OBJECT},
                example: {bar: 'baz'},
                required: true,
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              xmlBody: object,
            ) {
              /**/
            }
          }
          const builder = new OADocumentBuilder(DUMMY_DOC);
          builder.useClassMetadata(Target);
          const res = builder.build();
          expect(res).to.be.eql(DUMMY_DOC);
        });

        it('adds declared request body to the operation object', function () {
          class Target {
            @oaOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            operation(
              @oaRequestBody({
                mediaType: OAMediaType.APPLICATION_JSON,
                description: 'Request body description',
                schema: {type: OADataType.OBJECT},
                example: {foo: 'bar'},
                required: true,
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              jsonBody: object,
              @oaRequestBody({
                mediaType: OAMediaType.APPLICATION_XML,
                description: 'Request body description',
                schema: {type: OADataType.OBJECT},
                example: {bar: 'baz'},
                required: true,
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              xmlBody: object,
            ) {
              /**/
            }
          }
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
                        schema: {type: OADataType.OBJECT},
                        example: {foo: 'bar'},
                      },
                      [OAMediaType.APPLICATION_XML]: {
                        schema: {type: OADataType.OBJECT},
                        example: {bar: 'baz'},
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
          @oaResponse({
            statusCode: 200,
            mediaType: OAMediaType.APPLICATION_JSON,
            description: 'Response description',
            schema: {type: OADataType.OBJECT},
            example: {foo: 'bar'},
          })
          @oaResponse({
            statusCode: 200,
            mediaType: OAMediaType.APPLICATION_XML,
            description: 'Response description',
            schema: {type: OADataType.OBJECT},
            example: {bar: 'baz'},
          })
          operation() {
            /**/
          }
        }
        const builder = new OADocumentBuilder(DUMMY_DOC);
        builder.useClassMetadata(Target);
        const res = builder.build();
        expect(res).to.be.eql(DUMMY_DOC);
      });

      it('adds declared response to the operation object', function () {
        class Target {
          @oaOperation({
            method: OAOperationMethod.GET,
            path: '/operation',
            summary: 'Operation summary',
          })
          @oaResponse({
            statusCode: 200,
            mediaType: OAMediaType.APPLICATION_JSON,
            description: 'Response description',
            schema: {type: OADataType.OBJECT},
            example: {foo: 'bar'},
          })
          @oaResponse({
            statusCode: 200,
            mediaType: OAMediaType.APPLICATION_XML,
            description: 'Response description',
            schema: {type: OADataType.OBJECT},
            example: {bar: 'baz'},
          })
          operation() {
            /**/
          }
        }
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
                        schema: {type: OADataType.OBJECT},
                        example: {foo: 'bar'},
                      },
                      [OAMediaType.APPLICATION_XML]: {
                        schema: {type: OADataType.OBJECT},
                        example: {bar: 'baz'},
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
