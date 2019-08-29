'use strict';

const uuid = require('uuid/v4');

const MENS_NAMES = require('./data/mens.names');
const WOMENS_NAMES = require('./data/womens.names');
const FAMILIES = require('./data/families');

const utils = require('./common/utils');

class PersonGenerator {

    gen() {
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
        let charSets = [], nickName = '';
        let count = utils.rand(5, 9);
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
        if (Math.random() > 0.49) {
            charSets.push(vowels);
            charSets.push(consonants);
        } else {
            charSets.push(consonants);
            charSets.push(vowels);
        }
        while (count) {
            nickName += utils.getRandomFrom((count % 2) ? charSets[0] : charSets[1]);
            count --;
        }
        nickName = nickName.substr(0, 1) + nickName.substr(1).toLowerCase();
        const year = utils.rand(1970, new Date().getFullYear - 16);
        const month = utils.rand(1, 12);
        let day = utils.rand(1, 31);
        const leap = utils.leap(year);
        if (2 === month) {
            if (leap) {
                day = (29 < day) ? 29 : day;
            } else {
                day = (28 < day) ? 28 : day;
            }
        } else {
            if ((!(month % 2) && month < 8) || (month % 2 && month > 7)) {
                day = (day > 30) ? 30 : day;
            }
        }
        const birthDate = new Date(year + '-' + month + '-' + day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (today.getMonth() - birthDate.getMonth() < 0 || (today.getMonth() - birthDate.getMonth() === 0 && today.getDate() < birthDate.getDate())) {
            age --;
        }
        return {
            id: utils.rand(1001, 9999),
            uuid: uuid(),
            familyName: familyName,
            givenName: givenName,
            patronym: patronym,
            gender: gender,
            nickName: nickName,
            email: nickName.toLowerCase() + '@' + utils.getRandomFrom(['mail.ru', 'list.ru', 'yandex.ru', 'google.com', 'rambler.ru', 'yahoo.com']),
            phone: parseInt('7' + utils.rand(901, 999) + utils.rand(1000000, 9999999)),
            birthDate: birthDate,
            age: age
        };
    }
}

module.exports = new PersonGenerator();