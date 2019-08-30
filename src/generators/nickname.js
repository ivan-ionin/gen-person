'use strict';

const vowels = ['A', 'E', 'I', 'O', 'U'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

module.exports = (utils, data) => {
    let charSets = [], nickName = '';
    let count = utils.rand(5, 9);
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
    return {
        nickName: nickName
    };
};