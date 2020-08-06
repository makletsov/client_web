var express = require('express');
var router = express.Router();

var newContactId = 1;
var contacts = [];

router.get('/contacts', function(req, res) {
  var term = (req.query.term || '').toUpperCase();

  res.send(term.length === 0
      ? contacts
      : contacts.filter(function (contact) {
        return contact.name.toUpperCase().indexOf(term) >= 0 || contact.phone.toUpperCase().indexOf(term) >= 0;
      }));
});

router.post('/contacts/delete', function (req, res) {
  var id = +req.body.id;
  var message = '';

  var hasContact = contacts.some(function (contact) {
    return contact.id === id;
  });

  if (hasContact) {
    contacts = contacts.filter(function (contact) {
      return contact.id !== id;
    });
  } else {
    message = 'Contact with given id isn\'t exists!';
  }

  res.send({
    success: hasContact,
    message: message
  });
});

router.post('/contacts/add', function (req, res) {
  function sendErrorRequest(status, message) {
    res.status(status).send({
      success: false,
      message: message
    });
  }

  function checkProperty(property, regexp) {
    var check = property.match(regexp);

    return check && check.length === 1 && property === check[0];
  }

  function normalisePhoneNumber() {
    return this.replace(/[()\- ]/g, "");
  }

  var contact = req.body.contact;

  if (!contact) {
    sendErrorRequest(400,'Contact to add should be transferred in a request body!');
    return;
  }

  for (var property in contact) {
    property = property.trim();
  }

  contact.phone = normalisePhoneNumber.call(contact.phone);

  if (!contact.firstName) {
    sendErrorRequest(400,'Contact to add should contain the first name!');
    return;
  }

  if (!contact.lastName) {
    sendErrorRequest(400,'Contact to add should contain the last name!');
    return;
  }

  if (!contact.phone) {
    sendErrorRequest(400,'Contact to add should contain a phone number!');
    return;
  }

  var nameRegExp = /[a-zA-Zа-яА-ЯёЁ]+[-?a-zA-Zа-яА-ЯёЁ]*/g;

  if (!checkProperty(contact.firstName, nameRegExp)) {
    sendErrorRequest(400,'Contact to add has an incorrect first name!');
    return;
  }

  if (!checkProperty(contact.lastName, nameRegExp)) {
    sendErrorRequest(400,'Contact to add has an incorrect last name!');
    return;
  }

  var phoneRegExp = /^\+?[0-9]+/g;

  if (!checkProperty(contact.phone, phoneRegExp)) {
    sendErrorRequest(400,'Contact to add has an incorrect phone number!');
    return;
  }

  var isRepeat = contacts.some(function (c) {
    return c.phone === contact.phone;
  });

  if (isRepeat) {
    sendErrorRequest(409, 'The contact with the same phone number is already exist in the phone book!');
    return;
  }

  contact.id = newContactId;
  newContactId++;

  contacts.push(contact);

  res.send({
    success: true
  })
});

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
