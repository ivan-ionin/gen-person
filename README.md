# gen-person
Генерация пользователей

## Итак
Часто для образования тестовой среды или для использования в моках нужны тестовые данные, при этом статичные данные не всегды бывают достаточными

## По этому

    console.log(require('gen-person').gen());

...

    npm test

    // {
    //    id: 4245,
    //    uuid: 'c3ecf92a-cc03-491b-afdb-caf6af4a4c2a',
    //    familyName: 'Завьялов',
    //    givenName: 'Иулиан',
    //    patronym: 'Климентович',
    //    gender: 'm',
    //    nickName: 'Osixo',
    //    email: 'osixo@google.com',
    //    phone: 79879513950,
    //    birthDate: 2001-08-27T20:00:00.000Z,
    //    age: 18
    // }

    // Или ... где N - количество генераций

    node test.js N
