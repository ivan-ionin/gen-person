'use strict;'

const lib = require('./src/main');

lib.addGenerator('names', (utils, data) => {
    return {
        fullName: [data.familyName, data.givenName, data.patronym].join(' '),
        shortName: [data.givenName, data.patronym.substr(0, 1) + '.', data.familyName].join(' '),
        pseudoName: [data.givenName, '`' + data.nickName + '`', data.familyName].join(' '),
        initialsName: [data.familyName, data.givenName.substr(0, 1) + '.' + data.patronym.substr(0, 1) + '.'].join(' ')
    }
}, null, 100);

// lib.remGenerator('names');

console.log('Generations ...');

if (process.argv.length > 2 && process.argv[2].match(/^\d+$/)) {
    let counter = parseInt(process.argv[2]);
    while (counter) {
        console.log(lib.generate());
        counter --;
    }
} else {
    console.log(lib.generate());
}

console.log('Generators ...');

console.log(lib.showGenerators());