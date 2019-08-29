const leap = (year) => {
    return (((0 === year % 4) && (0 !== year % 100)) || (0 === year % 400));
};

const rand = (min, max) => {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
};

const zero = (num, len) => {
    len = len || 2;
    const res = num + '';
    if (res.length < len) {
        return ('0').repeat(len - res.length) + res;
    }
    return '' + res;
};

const getRandomFrom = (list) => {
    return list[rand(0, list.length - 1)];
};

module.exports = {
    leap: leap,
    rand: rand,
    zero: zero,
    getRandomFrom: getRandomFrom
};