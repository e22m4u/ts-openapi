"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const clone_deep_js_1 = require("./clone-deep.js");
describe('cloneDeep', function () {
    it('returns a deep copy of a given object', function () {
        const value = {
            stringProp: 'string',
            numberProp: 10,
            booleanProp: true,
            arrayProp: [1, 2, 3],
            objectProp: {
                foo: 'string',
                bar: 'string',
            },
            nullProp: null,
        };
        const result = (0, clone_deep_js_1.cloneDeep)(value);
        (0, chai_1.expect)(result).to.be.eql(value);
        (0, chai_1.expect)(result).to.be.not.eq(value);
        (0, chai_1.expect)(result.arrayProp).to.be.not.eq(value.arrayProp);
        (0, chai_1.expect)(result.arrayProp).to.be.eql(value.arrayProp);
        (0, chai_1.expect)(result.objectProp).to.be.not.eq(value.objectProp);
        (0, chai_1.expect)(result.objectProp).to.be.eql(value.objectProp);
    });
});
