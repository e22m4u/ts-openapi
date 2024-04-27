import {expect} from 'chai';
import {describe} from 'mocha';
import {OATag} from './decorators';
import {OAResponse} from './decorators';
import {OAOperation} from './decorators';
import {OAParameter} from './decorators';
import {OARequestBody} from './decorators';
import {OADataType} from './document-types';
import {OAMediaType} from './document-types';
import {OAOperationMethod} from './document-types';
import {OADocumentBuilder} from './document-builder';
import {OAParameterLocation} from './document-types';

const OPENAPI_VERSION = '3.1.0';
const DUMMY_DOC = {
  openapi: OPENAPI_VERSION,
  info: {title: 'Test document'},
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
      const doc = {...DUMMY_DOC, openapi: '1.2.3'};
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
        @OATag({name: 'Tag'})
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
        @OATag()
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
        @OATag()
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
        @OATag({name: 'UserController'})
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
        @OATag({name: 'Tag', path: '/path'})
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
          @OAOperation({
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
        @OATag()
        class Target {
          @OAOperation({
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
        @OATag({path: '/tag'})
        class Target {
          @OAOperation({
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
      describe('decorator applied to an instance method', () => {
        it('ignores parameters metadata if no operation declared', function () {
          class Target {
            @OAParameter({
              name: 'param1',
              in: OAParameterLocation.QUERY,
              schema: {type: OADataType.STRING},
            })
            @OAParameter({
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
            @OAOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            @OAParameter({
              name: 'param1',
              in: OAParameterLocation.QUERY,
              schema: {type: OADataType.STRING},
            })
            @OAParameter({
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
            @OAOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            @OAParameter({
              name: 'param1',
              in: OAParameterLocation.PATH,
              schema: {type: OADataType.STRING},
            })
            @OAParameter({
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
              @OAParameter({
                name: 'param1',
                in: OAParameterLocation.QUERY,
                schema: {type: OADataType.STRING},
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              param1: string,
              @OAParameter({
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
            @OAOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            operation(
              @OAParameter({
                name: 'param1',
                in: OAParameterLocation.QUERY,
                schema: {type: OADataType.STRING},
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              param1: string,
              @OAParameter({
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
            @OAOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            operation(
              @OAParameter({
                name: 'param1',
                in: OAParameterLocation.PATH,
                schema: {type: OADataType.STRING},
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              param1: string,
              @OAParameter({
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
      describe('decorator applied to an instance method', () => {
        it('ignores request body metadata if no operation declared', function () {
          class Target {
            @OARequestBody({
              mediaType: OAMediaType.JSON,
              description: 'Request body description',
              schema: {type: OADataType.OBJECT},
              example: {foo: 'bar'},
              required: true,
            })
            @OARequestBody({
              mediaType: OAMediaType.XML,
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
            @OAOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            @OARequestBody({
              mediaType: OAMediaType.JSON,
              description: 'Request body description',
              schema: {type: OADataType.OBJECT},
              example: {foo: 'bar'},
              required: true,
            })
            @OARequestBody({
              mediaType: OAMediaType.XML,
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
                      [OAMediaType.JSON]: {
                        schema: {type: OADataType.OBJECT},
                        example: {foo: 'bar'},
                      },
                      [OAMediaType.XML]: {
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
              @OARequestBody({
                mediaType: OAMediaType.JSON,
                description: 'Request body description',
                schema: {type: OADataType.OBJECT},
                example: {foo: 'bar'},
                required: true,
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              jsonBody: object,
              @OARequestBody({
                mediaType: OAMediaType.XML,
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
            @OAOperation({
              method: OAOperationMethod.GET,
              path: '/operation',
              summary: 'Operation summary',
            })
            operation(
              @OARequestBody({
                mediaType: OAMediaType.JSON,
                description: 'Request body description',
                schema: {type: OADataType.OBJECT},
                example: {foo: 'bar'},
                required: true,
              }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
              jsonBody: object,
              @OARequestBody({
                mediaType: OAMediaType.XML,
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
                      [OAMediaType.JSON]: {
                        schema: {type: OADataType.OBJECT},
                        example: {foo: 'bar'},
                      },
                      [OAMediaType.XML]: {
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
          @OAResponse({
            statusCode: 200,
            mediaType: OAMediaType.JSON,
            description: 'Response description',
            schema: {type: OADataType.OBJECT},
            example: {foo: 'bar'},
          })
          @OAResponse({
            statusCode: 200,
            mediaType: OAMediaType.XML,
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
          @OAOperation({
            method: OAOperationMethod.GET,
            path: '/operation',
            summary: 'Operation summary',
          })
          @OAResponse({
            statusCode: 200,
            mediaType: OAMediaType.JSON,
            description: 'Response description',
            schema: {type: OADataType.OBJECT},
            example: {foo: 'bar'},
          })
          @OAResponse({
            statusCode: 200,
            mediaType: OAMediaType.XML,
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
                      [OAMediaType.JSON]: {
                        schema: {type: OADataType.OBJECT},
                        example: {foo: 'bar'},
                      },
                      [OAMediaType.XML]: {
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
