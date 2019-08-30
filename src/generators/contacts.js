'use strict';

module.exports = (utils, data) => {
    return {
        email: data.nickName.toLowerCase() + '@' + utils.getRandomFrom(['mail.ru', 'list.ru', 'yandex.ru', 'google.com', 'rambler.ru', 'yahoo.com']),
        phone: parseInt('7' + utils.rand(901, 999) + utils.rand(1000000, 9999999))
    };
};