'use strict';

const uuid = require('uuid/v4');

const persone = require('./generators/person');
const nickname = require('./generators/nickname');
const contacts = require('./generators/contacts');
const birthdate = require('./generators/birthdate');
const transliteration = require('./generators/transliteration');
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
}, {
    key: 'transliteration',
    safe: true,
    order: 1000,
    config: ['familyName', 'givenName', 'patronym', 'fullName', 'shortName', 'pseudoName', 'initialsName'],
    generator: transliteration
}];

class PersonGenerator {

    constructor() {
        generators.forEach((g, i) => {
            if (!g.order) g.order = (i + 1) * 10;
        });
    }

    generate() {
        let response = {}, gens = generators.sort((a, b) => { return a.order - b.order; });
        Object.keys(gens).forEach(key => {
            let result = gens[key].generator.apply(this, [utils, response, gens[key].config || null]);
            if (result instanceof Object) {
                response = Object.assign({}, response, result);
            } else {
                response[gens[key].key] = result;
            }
        });
        return response;
    }

    addGenerator(key, generator, config, order) {
        let index;
        if (generators.some((e, i) => { index = i; return e.key === key; })) {
            if (generators.some(e => { return e.key === key && e.safe; })) {
                throw new Error('Generator "' + key + '" already exists and can not be replaced');
            } else {
                generators[index] = {
                    key: key,
                    safe: false,
                    order: order || generators[generators.length - 1].order + 10,
                    config: config || null,
                    generator: generator
                };
            }
        } else {
            generators.push({
                key: key,
                safe: false,
                order: order || generators[generators.length - 1].order + 10,
                config: config || null,
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
            result.push({
                key: g.key,
                order: g.order
            });
        });
        return result;
    }
}

module.exports = new PersonGenerator();