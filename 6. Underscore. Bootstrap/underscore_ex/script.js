(function () {
    var people = [
        {
            name: 'Ivan',
            lastName: 'Ivanov',
            age: 20
        },
        {
            name: 'Petr',
            lastName: 'Petrov',
            age: 22
        },
        {
            name: 'Fedor',
            lastName: 'Fedorov',
            age: 27
        },
        {
            name: 'Denis',
            lastName: 'Denisov',
            age: 20
        },
        {
            name: 'Nikolay',
            lastName: 'Nikolayev',
            age: 23
        },
        {
            name: 'Sergey',
            lastName: 'Sergeev',
            age: 25
        },
        {
            name: 'Maxim',
            lastName: 'Maximov',
            age: 32
        },
        {
            name: 'Dmitry',
            lastName: 'Dmitryev',
            age: 33
        },
        {
            name: 'Alexandr',
            lastName: 'Alexandrov',
            age: 29
        },
        {
            name: 'Victor',
            lastName: 'Victorov',
            age: 37
        }
    ];

    var averageAge = _.reduce(people, function (memo, person) {
        return memo + (person.age);
    }, 0) / people.length;

    console.log('An average age of all people in the list is: ' + Math.ceil(averageAge * 100) / 100 + ' years.');

    var twentyToThirtyYearsOldPeopleListSortedByAgeDescending = _.chain(people).filter(function (person) {
        return person.age >= 20 && person.age <= 30;
    }).sortBy('age').value();

    console.log('List of people are between 20 and 30 years old ages by descending: ');
    _.each(twentyToThirtyYearsOldPeopleListSortedByAgeDescending, function (person) {
        console.log(person.age);
    });

    _.each(people, function (person) {
        person.fullName = person.name + ' ' + person.lastName;
    });

    console.log('List of all people properties: ');
    _.each(people, function (person) {
        console.log('"name": ' + person.name + ', "lastName": '+ person.lastName +
            ', "age": ' + person.age + ', "fullName": ' + person.fullName);
    });
})();