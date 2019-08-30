'use strict';

module.exports = (utils, data) => {
    const year = utils.rand(1970, new Date().getFullYear() - 16);
    const month = utils.rand(1, 12);
    let day = utils.rand(1, 31);
    const hour = utils.rand(0, 23);
    const minute = utils.rand(0, 59);
    const second = utils.rand(0, 59);
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
    const birthDate = new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() - birthDate.getMonth() < 0 || (today.getMonth() - birthDate.getMonth() === 0 && today.getDate() < birthDate.getDate())) {
        age --;
    }
    return {
        birthDate: birthDate,
        age: age
    };
};