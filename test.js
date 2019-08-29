'use strict;'

const lib = require('./src/main');

if (process.argv.length > 2 && process.argv[2].match(/^\d+$/)) {
    let counter = parseInt(process.argv[2]);
    while (counter) {
        console.log(lib.gen());
        counter --;
    }
} else {
    console.log(lib.gen());
}