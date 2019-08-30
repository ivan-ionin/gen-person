# gen-person
Генерация пользователей

## Итак
Часто для образования тестовой среды или для использования в моках нужны тестовые данные, при этом статичные данные не всегды бывают достаточными

## По этому

    const lib = require('gen-person');

    console.log(lib.generate());

...

    npm test

    // {
    //     id: 8803,
    //     uuid: '8c3e95c3-2bd1-40f9-a0e1-0a81e660e781',
    //     familyName: 'Худяков',
    //     givenName: 'Архипп',
    //     patronym: 'Провович',
    //     gender: 'm',
    //     nickName: 'Yohafu',
    //     email: 'yohafu@rambler.ru',
    //     phone: 79276164924,
    //     birthDate: 1973-04-17T04:56:06.000Z,
    //    age: 46
    // }

    // Или ... где N - количество генераций

    node test.js N

## Пользовательские генерации
Для примера я добавил генератор names:

    lib.addGenerator('names', (utils, data) => {
        return {
            fullName: [data.familyName, data.givenName, data.patronym].join(' '),
            shortName: [data.givenName, data.patronym.substr(0, 1) + '.', data.familyName].join(' '),
            pseudoName: [data.givenName, '`' + data.nickName + '`', data.familyName].join(' '),
            initialsName: [data.familyName, data.givenName.substr(0, 1) + '.' + data.patronym.substr(0, 1) + '.'].join(' ')
        }
    });

После чего в выдаче появились дополнительные поля

    // {
    //     fullName: 'Худяков Архипп Провович',
    //     shortName: 'Архипп П. Худяков',
    //     pseudoName: 'Архипп `Yohafu` Худяков',
    //     initialsName: 'Худяков А.П.'
    // }

Удаление генераторов

    lib.remGenerator('names');

## Список генераторов

    let gList = lib.showGenerators();

    console.log(gList, ':)');

### PS: Я в шоке, о Боже, вот это да!
Это не я писал. Это друзья камит докинули.