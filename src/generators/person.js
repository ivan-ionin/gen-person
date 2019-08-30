'use strict';

const MENS_NAMES = require('../data/mens.names');
const WOMENS_NAMES = require('../data/womens.names');
const FAMILIES = require('../data/families');

module.exports = (utils, data) => {
    let familyName, givenName, patronym, gender;
    if (Math.random() > 0.49) {
        // men
        familyName = utils.getRandomFrom(FAMILIES);
        givenName = utils.getRandomFrom(MENS_NAMES);
        patronym = utils.getRandomFrom(MENS_NAMES).replace('ё', 'е');
        if (patronym.match(/ий$/)) {
            patronym = patronym.replace(/ий$/, 'ьевич');
        } else if (patronym.match(/й$/)) {
            patronym = patronym.replace(/й$/, 'евич');
        } else {
            patronym += 'ович';
        }
        gender = 'm';
    } else {
        // women
        familyName = utils.getRandomFrom(FAMILIES) + 'а';
        givenName = utils.getRandomFrom(WOMENS_NAMES);
        patronym = utils.getRandomFrom(MENS_NAMES).replace('ё', 'е');
        if (patronym.match(/ий$/)) {
            patronym = patronym.replace(/ий$/, 'ьевна');
        } else if (patronym.match(/й$/)) {
            patronym = patronym.replace(/й$/, 'евна');
        } else {
            patronym += 'овна';
        }
        gender = 'w';
    }
    return {
        familyName: familyName,
        givenName: givenName,
        patronym: patronym,
        gender: gender
    };
};