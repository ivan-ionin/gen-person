'use strict';

const transliterate = require('transliteration').transliterate;

module.exports = (utils, data, config) => {
    if (config && config.length) {
        let result = {};
        config.forEach(key => {
            if (data[key]) {
                result[key] = transliterate(data[key]);
            }
        });
        return { transliterations: result };
    }
    return {};
};