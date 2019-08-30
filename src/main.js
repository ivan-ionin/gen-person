'use strict';

const uuid = require('uuid/v4');

const persone = require('./generators/person');
const nickname = require('./generators/nickname');
const contacts = require('./generators/contacts');
const birthdate = require('./generators/birthdate');
const utils = require('./common/utils');

let generators = [{
    key: 'ids',
    safe: true,
    generator: () => {
        return {
            id: utils.rand(1001, 9999),
            uuid: uuid()
        };
    }
}, {
    key: 'person',
    safe: true,
    generator: persone
}, {
    key: 'nickname',
    safe: true,
    generator: nickname
}, {
    key: 'contacts',
    safe: true,
    generator: contacts
}, {
    key: 'birthdate',
    safe: true,
    generator: birthdate
}];

class PersonGenerator {

    constructor() {
        
    }

    generate() {
        let response = {};
        Object.keys(generators).forEach(key => {
            let result = generators[key].generator.apply(this, [utils, response]);
            if (result instanceof Object) {
                response = Object.assign({}, response, result);
            } else {
                response[generators[key].key] = result;
            }
        });
        return response;
    }

    addGenerator(key, generator) {
        let index;
        if (generators.some((e, i) => { index = i; return e.key === key; })) {
            if (generators.some(e => { return e.key === key && e.safe; })) {
                throw new Error('Generator "' + key + '" already exists and can not be replaced');
            } else {
                generators[index] = {
                    key: key,
                    safe: false,
                    generator: generator
                };
            }
        } else {
            generators.push({
                key: key,
                safe: false,
                generator: generator
            });
        }
    }

    remGenerator(key) {
        let index;
        if (generators.some((e, i) => { index = i; return e.key === key; })) {
            if (generators.some(e => { return e.key === key && e.safe; })) {
                throw new Error('Generator "' + key + '" is protected');
            } else {
                generators.splice(index, 1);
            }
        } else {
            throw new Error('Generator "' + key + '" is not exists');
        }
    }

    showGenerators() {
        let result = [];
        generators.forEach(g => {
            result.push(g.key);
        });
        return result;
    }
}

module.exports = new PersonGenerator();